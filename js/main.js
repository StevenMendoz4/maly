// --- CONFIGURACIÓN BÁSICA DE THREE.JS ---
const container = document.getElementById('canvas-container');
const tooltip = document.getElementById('tooltip');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x010204); 

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimización de pixeles
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 3.1;
controls.maxDistance = 8;

// --- LUCES DE ALTO CONTRASTE ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.08); // Espacio oscuro profundo
scene.add(ambientLight);

// El Sol ahora se gestionará dinámicamente con la hora del sistema
const sunLight = new THREE.DirectionalLight(0xffffff, 2.2); 
scene.add(sunLight);

// --- CREACIÓN DEL PLANETA CON PROFUNDIDAD REAL (DISPLACEMENT) ---
const earthRadius = 2;

// CRUCIAL: Segmentos a 128 para deformación física de montañas tridimensionales.
const geometry = new THREE.SphereGeometry(earthRadius, 128, 128); 

const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('assets/earth_map.jpg');
const bumpTexture = textureLoader.load('assets/earth_bump.png');
const specularTexture = textureLoader.load('assets/especular.png');

const material = new THREE.MeshStandardMaterial({
    map: earthTexture,
    
    // SISTEMA DE PROFUNDIDAD REAL:
    displacementMap: bumpTexture,      // Usa el mapa de relieve para DEFORMAR la geometría
    displacementScale: 0.06,           // Qué tanto van a sobresalir físicamente las montañas hacia afuera
    displacementBias: 0.0,
    
    bumpMap: bumpTexture,              // Mantenemos el bump secundario para micro-detalles de la superficie
    bumpScale: 0.02,
    
    specularMap: specularTexture,
    roughness: 0.45,
    metalness: 0.1
});

const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// --- CAPA 3D DE NUBES CON PROFUNDIDAD FLOTANTE ---
const cloudsGeometry = new THREE.SphereGeometry(earthRadius + 0.08, 64, 64); 
const cloudsTexture = textureLoader.load('assets/nubes.png');

const cloudsMaterial = new THREE.MeshStandardMaterial({
    map: cloudsTexture,
    transparent: true,
    opacity: 0.8,
    blending: THREE.NormalBlending
});

const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
earth.add(clouds); 

// --- ATMÓSFERA CON EFECTO DE GLOW (PROXIMIDAD PROFUNDA) ---
const atmosGeom = new THREE.SphereGeometry(earthRadius + 0.12, 128, 128);
const atmosMat = new THREE.MeshBasicMaterial({
    color: 0x00bcff,
    transparent: true,
    opacity: 0.18,
    side: THREE.BackSide
});
const atmosphere = new THREE.Mesh(atmosGeom, atmosMat);
earth.add(atmosphere);

// --- FONDO DE ESTRELLAS ---
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 2500;
const starPositions = new Float32Array(starsCount * 3);

for(let i = 0; i < starsCount * 3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 160;
}
starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.025, transparent: true, opacity: 0.9 });
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

camera.position.set(0, 1.2, 5.2);

// --- COORDENADAS MATEMÁTICAS ---
function latLongToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.sin(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.cos(theta)
    );
}

// Pines interactivos del Reino Unido flotando sobre el relieve real
const countries = [
    { name: "Moises", lat: 52.3, lon: -1.1, url: "naciones.html?nacion=inglaterra", color: 0x00f3ff },
    { name: "Jeremias", lat: 56.4, lon: -4.2, url: "naciones.html?nacion=escocia", color: 0xff007f },
    { name: "Elias", lat: 52.1, lon: -3.7, url: "naciones.html?nacion=gales", color: 0x00ff66 },
    { name: "Job", lat: 54.7, lon: -6.4, url: "naciones.html?nacion=irlanda", color: 0xffaa00 }
];

const pinObjects = [];

countries.forEach(country => {
    const pinGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.18, 8);
    pinGeo.rotateX(Math.PI / 2);
    const pinMat = new THREE.MeshBasicMaterial({ color: country.color });
    const pinMesh = new THREE.Mesh(pinGeo, pinMat);
    
    const pos = latLongToVector3(country.lat, country.lon, earthRadius + 0.1); 
    pinMesh.position.copy(pos);
    pinMesh.lookAt(new THREE.Vector3(0,0,0));
    
    pinMesh.userData = { name: country.name, url: country.url };
    
    pinObjects.push(pinMesh);
    earth.add(pinMesh); 
});

// --- INTERACCIÓN UNIFICADA (MOUSE Y TOUCH DEL TELÉFONO) ---
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function procesarInteraccion(clientX, clientY, esClick = false) {
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(pinObjects);

    if (intersects.length > 0) {
        const hoveredPin = intersects[0].object;
        document.body.style.cursor = 'pointer';
        
        tooltip.style.display = 'block';
        tooltip.style.left = `${clientX}px`;
        tooltip.style.top = `${clientY - 20}px`; // Un poco más arriba para que el dedo no tape el texto
        tooltip.innerHTML = `<strong>${hoveredPin.userData.name.toUpperCase()}</strong><br><span style="font-size:10px; color:#00f3ff;">Toca para explorar</span>`;
        
        pinObjects.forEach(p => p.scale.set(1, 1, 1)); // Reset general
        hoveredPin.scale.set(1.8, 1.8, 1.8); // Agranda el pin activo

        if (esClick) {
           // Buscar el elemento de audio e iniciar la música
    const audio = document.getElementById('musica-fondo');
    if (audio) {
        audio.play().catch(error => console.log("El navegador bloqueó el audio temporalmente:", error));
    }

    tooltip.innerHTML = "Estableciendo conexión cósmica...";
    setTimeout(() => {
        window.location.href = hoveredPin.userData.url;
    }, 1000); // Subimos a 1 segundo para que se alcance a escuchar el inicio de la música antes de irse
        }
    } else {
        if (!esClick) {
            document.body.style.cursor = 'default';
            tooltip.style.display = 'none';
            pinObjects.forEach(p => p.scale.set(1, 1, 1));
        }
    }
}

// Evento para computadoras
window.addEventListener('mousemove', (e) => procesarInteraccion(e.clientX, e.clientY, false));
window.addEventListener('click', (e) => procesarInteraccion(e.clientX, e.clientY, true));

// Soporte nativo para Teléfonos Inteligentes (Touch)
window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
        // Evita falsos disparos si tocan el botón de regreso
        if (e.target.closest('#ui-overlay')) return; 
        
        const touch = e.touches[0];
        procesarInteraccion(touch.clientX, touch.clientY, true);
    }
}, { passive: true });

// --- NUEVA FUNCIÓN: POSICIÓN DE LA LUZ SOLAR SEGÚN LA HORA REAL ---
function updateSunPosition() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Calculamos el tiempo total transcurrido del día en formato decimal
    const decimalTime = hours + minutes / 60;
    
    // Traducimos el ciclo de 24h a radianes de una circunferencia (360 grados)
    // El "- 12" es para centrar el pico de luz directa exactamente al mediodía local
    const sunAngle = ((decimalTime - 12) / 24) * Math.PI * 2;
    
    const orbitalRadius = 7; // Distancia fija de la fuente de luz
    sunLight.position.x = orbitalRadius * Math.sin(sunAngle);
    sunLight.position.z = orbitalRadius * Math.cos(sunAngle);
    sunLight.position.y = 2.5; // Elevación cenital constante para un modelado de relieve óptimo
}

// --- BUCLE DE ANIMACIÓN ---
function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.0004; // Rotación planetaria elegante
    clouds.rotation.y += 0.00025; // Las nubes viajan de forma independiente

    // Llamamos la función para actualizar dinámicamente las sombras del Sol
    updateSunPosition();

    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();