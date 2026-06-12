// Cambia esta fecha por la de su aniversario (Año, Mes - 1, Día, Hora, Minutos)
// Nota: En JavaScript, los meses empiezan en 0 (Enero = 0, Febrero = 1, etc.)
const fechaAniversario = new Date(2025, 4, 31, 0, 0, 0); 

function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaAniversario; // Diferencia en milisegundos

    // Cálculos matemáticos para convertir milisegundos
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    // Pintar los resultados en el HTML
    document.getElementById('dias').innerText = dias;
    document.getElementById('horas').innerText = horas;
    document.getElementById('minutos').innerText = minutos;
    document.getElementById('segundos').innerText = segundos;
}

// Ejecutar la función de inmediato y luego cada 1 segundo
actualizarContador();
setInterval(actualizarContador, 1000);


// LISTA DE CANCIONES
//AGREGAR MAS CANCIONES 
// Añade aquí los archivos .mp3 que vayas a meter en tu carpeta
const playlist = [
    { titulo: "Cien Años", artista: "Tu Novio ❤️", archivo: "cancion1.mp3" },
    { titulo: "Es verdad", artista: "Tu Novio ❤️", archivo: "cancion2.mp3" },
    { titulo: "Enamorado tuyo", artista: "Tu Novio ❤️", archivo: "cancion3.mp3" },
    { titulo: "Frances Limon", artista: "Tu Novio ❤️", archivo: "cancion4.mp3" },
    { titulo: "Beso", artista: "Tu Novio ❤️", archivo: "cancion5.mp3" },
    { titulo: "La Gloria eres tu", artista: "Tu Novio ❤️", archivo: "cancion6.mp3" },
    { titulo: "Hasta donde te quiero", artista: "Tu Novio ❤️", archivo: "cancion7.mp3" },
    { titulo: "Como tu", artista: "Tu Novio ❤️", archivo: "cancion8.mp3" },
    { titulo: "La mujer que bota fuego", artista: "Tu Novio ❤️", archivo: "cancion9.mp3" },
    { titulo: "You rock my world", artista: "Tu Novio ❤️", archivo: "cancion10.mp3" }
];

let indiceActual = 0;

const musica = document.getElementById('musica-fondo');
const botonReproducir = document.getElementById('boton-reproducir');
const btnAnterior = document.getElementById('btn-anterior');
const btnSiguiente = document.getElementById('btn-siguiente');
const txtTitulo = document.getElementById('titulo-cancion');
const txtArtista = document.getElementById('artista-cancion');
const discoIcono = document.querySelector('.disco-icono');

// Función para cargar una canción
function cargarCancion(indice) {
    const cancion = playlist[indice];
    txtTitulo.innerText = cancion.titulo;
    txtArtista.innerText = cancion.artista;
    musica.src = cancion.archivo;
}

// Lógica de Play/Pause
botonReproducir.addEventListener('click', () => {
    if (musica.paused) {
        musica.play();
        botonReproducir.innerText = "⏸️";
        discoIcono.style.animationPlayState = "running";
    } else {
        musica.pause();
        botonReproducir.innerText = "▶️";
        discoIcono.style.animationPlayState = "paused";
    }
});

// Cambiar a la Siguiente Canción
btnSiguiente.addEventListener('click', () => {
    indiceActual = (indiceActual + 1) % playlist.length; // Si llega al final, vuelve a la primera
    cargarCancion(indiceActual);
    musica.play();
    botonReproducir.innerText = "⏸️";
    discoIcono.style.animationPlayState = "running";
});

// Cambiar a la Canción Anterior
btnAnterior.addEventListener('click', () => {
    indiceActual = (indiceActual - 1 + playlist.length) % playlist.length; // Si retrocede de la primera, va a la última
    cargarCancion(indiceActual);
    musica.play();
    botonReproducir.innerText = "⏸️";
    discoIcono.style.animationPlayState = "running";
});
// Cargar la primera canción automáticamente al abrir la página
cargarCancion(indiceActual);
// LÓGICA DEL FRASCO DE CUPONES
// Escribe aquí los cupones que quieras regalarle
const listaCupones = [
    "¡Vale por una cena romántica donde tú elijas! 🍕",
    "¡Vale por una tarde de películas y tus snacks favoritos! 🍿",
    "¡Vale por un helado gigante gigante! 🍦",
    "¡Vale por un masaje relajante de 15 minutos! 💆‍♀️",
    "¡Vale por un abrazo infinito que cure cualquier mal día! ❤️",
    "¡Vale por ir a comprarte ropa donde tu quieras! 👑"
];

const frasco = document.getElementById('frasco');
const cuponPantalla = document.getElementById('cupon-pantalla');
const textoCupon = document.getElementById('texto-cupon');
const btnCerrar = document.getElementById('btn-cerrar');
const btnCanjear = document.getElementById('btn-canjear');

// Tu número de teléfono para WhatsApp (Incluye el código de tu país sin el "+")
// Ejemplo: 521234567890 (52 es México, 504 Honduras, etc.)
const tuTelefono = "50492287992"; 

// Al tocar el frasco, saca un cupón al azar
frasco.addEventListener('click', () => {

    // Pon esto en la primera línea de la función que abre el frasco
alert("🔒 ¡Frasco bloqueado por ahora! Este frasco solo se podrá abrir cuando por fin estemos juntos y nos veamos en persona. 🥰 ¡Falta muy poco, mi amor!");
return; // Esto detiene el código por completo y no deja que salga ningún cupón

    const indiceAzar = Math.floor(Math.random() * listaCupones.length);
    const cuponElegido = listaCupones[indiceAzar];
    
    textoCupon.innerText = cuponElegido;
    cuponPantalla.classList.remove('oculto'); // Muestra el cupón

    // Configurar el botón de WhatsApp con el mensaje personalizado
    const mensajeOk = encodeURIComponent(`¡Hola mi amor! Quiero canjear este cupón que saqué de mi página: "${cuponElegido}"`);
    btnCanjear.onclick = () => {
        window.open(`https://wa.me/${tuTelefono}?text=${mensajeOk}`, '_blank');
    };
});

// Cerrar el cupón
btnCerrar.addEventListener('click', () => {
    cuponPantalla.classList.add('oculto');
});

// LÓGICA DE FORMSUBMIT SILENCIOSO (GMAIL)
const formulario = document.getElementById('formulario-contacto');
const mensajeCorreo = document.getElementById('mensaje-correo');
const btnEnviarCorreo = document.getElementById('btn-enviar-correo');
const mensajeExito = document.getElementById('mensaje-exito');

formulario.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue o se vaya a otra web
    
    btnEnviarCorreo.innerText = "⏳ Enviando...";
    btnEnviarCorreo.disabled = true;

    // Enviamos los datos mediante Fetch (en segundo plano)
    fetch(formulario.action, {
        method: 'POST',
        body: new FormData(formulario),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        btnEnviarCorreo.innerText = "🚀 Enviar a mi novio";
        btnEnviarCorreo.disabled = false;
        mensajeCorreo.value = ""; // Limpiamos su cuadro de texto
        
        // Mostrar mensaje lindo de éxito
        mensajeExito.classList.remove('oculto');
        
        // Ocultar el aviso de éxito automáticamente a los 5 segundos
        setTimeout(() => {
            mensajeExito.classList.add('oculto');
        }, 5000);
    })
    .catch(error => {
        console.error("Error al enviar:", error);
        btnEnviarCorreo.innerText = "🚀 Enviar a mi novio";
        btnEnviarCorreo.disabled = false;
        alert("Hubo un pequeño problema al enviar. ¡Inténtalo de nuevo, mi amor!");
    });
});


// LÓGICA DEL BUZÓN DE CARTAS (LOCALSTORAGE)
const txtCartaLocal = document.getElementById('texto-carta-local');
const btnGuardarCarta = document.getElementById('btn-guardar-carta');
const galeriaCartas = document.getElementById('galeria-cartas');

function mostrarCartas() {
    galeriaCartas.innerHTML = "";
    let cartas = JSON.parse(localStorage.getItem('cartasAmor')) || [];

    cartas.forEach((carta, indice) => {
        const divNota = document.createElement('div');
        divNota.classList.add('nota-carta');
        divNota.innerHTML = `
            <span class="fecha-nota">📅 ${carta.fecha}</span>
            <p style="margin:0;">${carta.texto}</p>
            <span class="btn-borrar-nota" onclick="borrarCarta(${indice})">❌</span>
        `;
        galeriaCartas.appendChild(divNota);
    });
}

btnGuardarCarta.addEventListener('click', () => {
    const texto = txtCartaLocal.value.trim();
    if (texto === "") return;

    let cartas = JSON.parse(localStorage.getItem('cartasAmor')) || [];
    const opciones = { year: 'numeric', month: 'short', day: 'numeric' };
    const hoy = new Date().toLocaleDateString('es-ES', opciones);

    cartas.unshift({ texto: texto, fecha: hoy });
    localStorage.setItem('cartasAmor', JSON.stringify(cartas));
    
    txtCartaLocal.value = "";
    mostrarCartas();
});

window.borrarCarta = function(indice) {
    let cartas = JSON.parse(localStorage.getItem('cartasAmor')) || [];
    cartas.splice(indice, 1);
    localStorage.setItem('cartasAmor', JSON.stringify(cartas));
    mostrarCartas();
};

// Iniciar cargando las cartas locales al cargar
mostrarCartas();

function toggleMenu() {
    var menu = document.getElementById("menuLateral");
    
    // Si está cerrado, lo abre dándole 250px de ancho. Si está abierto, lo vuelve a ocultar (0).
    if (menu.style.width === "250px") {
        menu.style.width = "0";
    } else {
        menu.style.width = "250px";
    }
}

//AQUI EMPIEZA LA RULETA
const opcionesRuleta = [
    { texto: "Musica", emoji: "🎵" },
    { texto: "Película", emoji: "🎬" },
    { texto: "Serie", emoji: "📺" },
    { texto: "(VLL)Perreito", emoji: "🔥" },
    { texto: "PedirComida", emoji: "🍔" },
    { texto: "Dibujar", emoji: "🎨" },
    { texto: "Jugar Juntos", emoji: "🎮" },
    { texto: "(VLL)llamada", emoji: "📞" },
    { texto: "Cartitas", emoji: "💌" },
    { texto: "Sorpresa", emoji: "🎁🔥" }
];
const canvas = document.getElementById("canvas-ruleta");
const ctx = canvas.getContext("2d");
const totalOpciones = opcionesRuleta.length;
const arco = (2 * Math.PI) / totalOpciones;
let anguloActual = 0;
let puedeGirar = true;

// Función para dibujar la ruleta en el Canvas
function dibujarRuleta() {
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    const radio = centroX - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < totalOpciones; i++) {
        const anguloInicio = i * arco;
        const anguloFin = anguloInicio + arco;

        // Colores de fondo intercalados oscuros
        ctx.fillStyle = (i % 2 === 0) ? "#1f242d" : "#151921";
        
        ctx.beginPath();
        ctx.moveTo(centroX, centroY);
        ctx.arc(centroX, centroY, radio, anguloInicio, anguloFin);
        ctx.lineTo(centroX, centroY);
        ctx.fill();

        // Líneas divisorias Neón
        ctx.strokeStyle = "#ff4da6";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#ff4da6";
        ctx.stroke();
        
        // Reset de sombras para que no afecte al texto
        ctx.shadowBlur = 0;

        // Dibujar el Texto y Emoji perfectamente alineados al centro
        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 13px sans-serif";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        
        // Mover el origen al centro y rotar hacia el sector
        ctx.translate(centroX, centroY);
        ctx.rotate(anguloInicio + arco / 2);
        
        // Posicionar el texto dentro del sector hacia afuera
        ctx.fillText(`${opcionesRuleta[i].emoji} ${opcionesRuleta[i].texto}`, radio - 20, 0);
        ctx.restore();
    }

    // Círculo central decorativo neón
    ctx.beginPath();
    ctx.arc(centroX, centroY, 25, 0, 2 * Math.PI);
    ctx.fillStyle = "#12161a";
    ctx.strokeStyle = "#00f3ff";
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00f3ff";
    ctx.fill();
    ctx.stroke();
}

// Ejecutar dibujo al cargar
dibujarRuleta();

// ==========================================
// VARIABLES GLOBALES (Ponlas arriba en tu script)
// ==========================================
let codigoRealOculto = ""; // El número base al azar que espera la web
const LIMITE_PASES = 5;    // Máximo de pases VIP por día

// ==========================================
// MOTOR DE LA RULETA Y BLOQUEOS
// ==========================================
function girarRuleta() {
    if (!puedeGirar) return;

    const hoy = new Date().toDateString(); // "Thu Jun 11 2026"
    const ultimoGiro = localStorage.getItem("ultimoGiroRuleta");

    // --- ENTRADA AL SISTEMA VIP SI YA GIRÓ HOY ---
    if (ultimoGiro === hoy) {
        // Revisamos cuántos pases lleva hoy
        let pasesUsadosHoy = parseInt(localStorage.getItem("pasesUsados_" + hoy)) || 0;
        let pasesRestantes = LIMITE_PASES - pasesUsadosHoy;

        // Actualizar contador visual en la tarjeta
        document.getElementById("contador-pases-texto").innerText = `Pases VIP disponibles hoy: ${pasesRestantes} de ${LIMITE_PASES}`;

        // Si ya usó los 5, bloqueo total inmediato
        if (pasesUsadosHoy >= LIMITE_PASES) {
            document.getElementById("texto-resultado").innerText = "❌ ¡Se acabaron los pases! ❌";
            document.getElementById("contador-pases-texto").innerText = "Ya usaste tus 5 pases VIP de hoy, mi amor. ¡Mañana tienes 5 más! ❤️";
            document.getElementById("btn-whatsapp-ruleta").style.display = "none";
            document.getElementById("btn-pedir-codigo").style.display = "none";
            document.getElementById("resultado-pantalla").classList.remove("oculto-ruleta");
            return; 
        }

        // Si tiene pases disponibles, generamos la clave matemática al azar
        const numeroBase = Math.floor(10 + Math.random() * 80); 
        codigoRealOculto = numeroBase.toString(); // El número real que desbloquea (Ej: 20)

        const numeroEncriptado = numeroBase + 33; // La trampa para el mensaje (Ej: 20 + 33 = 53)

        // Preparamos el diseño del modal para pedir código
        document.getElementById("texto-resultado").innerText = "⚠️ Giro diario completado ⚠️";
        document.getElementById("btn-whatsapp-ruleta").style.display = "none"; // Ocultamos reclamar premio
        document.getElementById("btn-pedir-codigo").style.display = "block"; // Mostramos pedir pase

        // Activamos el botón de WhatsApp pasándole el número encriptado (+33)
        configurarBotonPedirCodigo(numeroEncriptado, hoy);

        document.getElementById("resultado-pantalla").classList.remove("oculto-ruleta");
        return; 
    }
    // ---------------------------------------------

    // --- GIRO NORMAL SINO HA JUGADO HOY ---
    puedeGirar = false;
    const ruletaVisual = document.getElementById("canvas-ruleta");
    
    const giros = Math.floor(Math.random() * 5) + 6; 
    const gradosAleatorios = Math.floor(Math.random() * 360);
    const totalGrados = (giros * 360) + gradosAleatorios;

    ruletaVisual.style.transform = `rotate(${totalGrados}deg)`;

    setTimeout(() => {
        const anguloRealEfectivo = (totalGrados % 360);
        const indiceGanador = Math.floor((totalOpciones - (anguloRealEfectivo / 36)) % totalOpciones);
        const ganador = opcionesRuleta[indiceGanador];

        // Guardamos que ya hizo su tiro diario legal
        localStorage.setItem("ultimoGiroRuleta", hoy);

        // Mostrar resultado en el modal
        document.getElementById("texto-resultado").innerText = `${ganador.texto} ${ganador.emoji}`;
        
        // Aseguramos que se vea el botón verde de reclamar premio y se oculte el de pedir VIP
        document.getElementById("btn-whatsapp-ruleta").style.display = "block";
        if(document.getElementById("bloque-reinicio")) {
            // Escondemos el panel del código cuando gana legalmente para no confundirla
            document.getElementById("btn-pedir-codigo").style.display = "none";
        }

        // WhatsApp para reclamar el premio ganado
        const tuNumero = "50492287992"; 
        const mensajeWhatsApp = encodeURIComponent(`¡Mi amor! Giré la ruleta del destino y nos tocó el plan: ${ganador.texto} ${ganador.emoji} 🥰 ¿Cuándo lo hacemos realidad?`);
        
        document.getElementById("btn-whatsapp-ruleta").onclick = function() {
            window.open(`https://wa.me/${tuNumero}?text=${mensajeWhatsApp}`, '_blank');
        };

        document.getElementById("resultado-pantalla").classList.remove("oculto-ruleta");
        puedeGirar = true;
    }, 4000);
}

// ==========================================
// FUNCIONES DE CONTROL VIP (NUEVAS)
// ==========================================
function configurarBotonPedirCodigo(numeroMensaje, fechaHoy) {
    const tuNumero = "50492287992"; 
    const mensajePedir = encodeURIComponent(`¡Mi amor! Ya usé mi giro de hoy, pero quiero otra oportunidad... 🥺 ¿Me das el código VIP? El número de mi sesión es: ${numeroMensaje} ❤️`);
    
    document.getElementById("btn-pedir-codigo").onclick = function() {
        // Sumar un intento al contador en el teléfono
        let pasesUsadosHoy = parseInt(localStorage.getItem("pasesUsados_" + fechaHoy)) || 0;
        localStorage.setItem("pasesUsados_" + fechaHoy, pasesUsadosHoy + 1);

        // Abrir WhatsApp
        window.open(`https://wa.me/${tuNumero}?text=${mensajePedir}`, '_blank');
        
        // Actualizar visualmente los pases restantes de inmediato
        let nuevosRestantes = LIMITE_PASES - (pasesUsadosHoy + 1);
        document.getElementById("contador-pases-texto").innerText = `Pases VIP disponibles hoy: ${nuevosRestantes} de ${LIMITE_PASES}`;
    };
}

function verificarCodigoReinicio() {
    const codigoIngresado = document.getElementById("codigo-reinicio-input").value.trim();

    // Comparamos lo que ella escribió con la clave original secreta sin sumar
    if (codigoIngresado === codigoRealOculto && codigoRealOculto !== "") {
        // Rompemos el candado del día temporalmente
        localStorage.removeItem("ultimoGiroRuleta");
        alert("🔓 ¡Código VIP Aceptado! Se te ha concedido un giro extra, mi amor. ¡Suerte! 🌀");
        
        codigoRealOculto = ""; // Quemamos el código para que no sirva otra vez
        cerrarResultado();
        document.getElementById("codigo-reinicio-input").value = ""; 
    } else {
        alert("❌ Código inválido. Pídele a tu novio el número correcto que corresponde a tu sesión. 👀");
    }
}

function cerrarResultado() {
    document.getElementById("resultado-pantalla").classList.add("oculto-ruleta");
}