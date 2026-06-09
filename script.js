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
    { titulo: "La que me recuerda a ti", artista: "Tu Novio ❤️", archivo: "cancion2.mp3" },
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
    "¡Vale por tener la razón en una discusión completa! 👑"
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