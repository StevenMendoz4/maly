const datosNaciones = {
    inglaterra: {
        titulo: "👑 Moises Con el Pueblo",
        imperdibles: [
            { 
                nombre: "El clamor de Moisés (Números 11:10-15)", 
                img: "./assets/moises.png", 
                desc: `NÚMEROS 11:10-15 RVR1960
10 y oyó Moisés al pueblo, que lloraba por sus familias, cada uno a la puerta de su tienda; y la ira de Jehová se encendió en gran manera; también le pareció mal a Moisés. 11 Y dijo Moisés a Jehová, ¿Por qué has hecho mal a tu siervo? ¿y por qué no he hallado gracia en tus ojos, que has puesto la carga de todo este pueblo sobre mí? 12 ¿Concebí yo a todo este pueblo? ¿Lo engendré yo, para que me digas: Llévalo en tu seno, como lleva la que cría al que mama, a la tierra de la cual juraste a sus padres? 13 ¿De dónde conseguiré yo carne para dar a todo este pueblo? Porque lloran a mí, diciendo: Danos carne que comamos. 14 No puedo yo solo soportar a todo este pueblo, que me es pesado en demasía. 15 y si así lo haces tú conmigo, yo te ruego que me des muerte, si he hallado gracia en tus ojos; y que yo no vea mi mal.
//-----------------------------------------------------------------------------------------------------------------------------//Aqui vemos como moises clama al señor por respuestas, tiene un pueblo que iba a sacar de egipto pero el no soportaba, que el pueblo estuviera quejandose, y diciendole ayudanos, tenemos hambre, pues todas las quejas eran dirigidas a moises, y el cansado le dice al señor, Porq me haces esto señor, por que me tratas tan mal, por que pones la carga de este pueblo sobre mi, acaso son mis hijos decia moises, el sentia injusto y demasiado para el, como alimentare a todo este pueblo señor. Te ruego señor que me quites la vida, yo pienso y me imagino lo presionado que se sentia, la angustia, que tenia que pese aq se mantenia firme al señor, el pedia que le quite la vida. Y cuantas veces sentimos nosotros que nuestras cargas suelen ser muy pesadas, sentimos que no soportamos, que ya no queremos seguir con esto. Pero Dios tiene el control, de todo, mas adelante vemos:` 
            },
            { 
                nombre: "La Respuesta Sobrenatural (Números 11:19-23)", 
                img: "./assets/jehova.png", 
                desc: `NÚMEROS 11:19-21 RVR1960
[19] No comeréis un día, ni dos días, ni cinco días, ni diez días, ni veinte días, [20] sino hasta un mes entero, hasta que os salga por las narices, y la aborrezcáis, por cuanto menospreciasteis a Jehová que está en medio de vosotros, y llorasteis delante de él, diciendo: ¿Para qué salimos acá de Egipto? [21] Entonces dijo Moisés: Seiscientos mil de a pie es el pueblo en medio del cual yo estoy; ¡y tú dices: Les daré carne, y comerán un mes entero!,
//--------------------------------------------------------------------------------------------------------------------------------//
 Entendemos que el señor, esta con Nosotros y nos no ah abandonado, el dijo sacio las necesidades de mas de 600,000 mil, no es una cantidad pequeña, y np solo por un dia, Por un mes entero, les dio hasta saciarse. Nosotros aveces no entendemos cuando las pruebas son dificiles, eh incluso pensamos en renunciar a todo de una vez, pero el señorr esta presente y en su momento llenara de bendicion nuestras vidas, y no solo lo necesario, si no que el da hasta saciarnos.
 Y yo amorr quiero que leas esta historia y medites en ella, Estas cumpliendo un estudio De odontologia, y se que aveces pensaras Señor pero ahora que voy hacer eh perdido esto, como cubrire los gastos, que voy hacer ahora, ya no hay nadie conmigo, Pero recuerda, que hay alguien que escucha nuestras suplicas, y cubre de bendicion nuestras vidas. Por que Dios tiene el control,` 
            }
        ]
    },
    escocia: {
        titulo: "Jeremias Cansado",
        imperdibles: [
            { 
                nombre: "El fuego interno (Jeremías 20:7-10)", 
                img: "assets/jeremias.png", 
                desc: "Aislado, azotado en el cepo y traicionado por sus amigos, Jeremías intentó renunciar. Sin embargo, confiesa que la palabra divina era en su interior como un fuego ardiente metido en sus huesos que no podía contener." 
            }
        ]
    },
    gales: {
        titulo: "Elias con Miedo",
        imperdibles: [
            { 
                nombre: "huyendo desesperado (1 Reyes 19:1-10)", 
                img: "assets/elias.png", 
                desc: "Exhausto tras amenazas de muerte, Elías huye al desierto y pide morir creyendo falsamente estar solo. Dios, con ternura infinita, atiende primero su salud física con descanso y pan cocido en ascuas." 
            }
        ]
    },
    irlanda: {
        titulo: "Job con Dolor Insoportable",
        imperdibles: [
            { 
                nombre: "El Misterio del Dolor (Job 3:1-26)", 
                img: "assets/job.png", 
                desc: "Tras perder riquezas, hijos y salud con una sarna maligna, Job rompe el silencio maldiciendo su día de nacimiento. Anhela el sepulcro como refugio de descanso, validando que la fe no anula las crisis emocionales." 
            }
        ]
    }
};

const paneles = document.querySelectorAll('.nacion-panel');
const modal = document.getElementById('modalIdentidad');
const btnCerrar = document.getElementById('btnCerrarModal');
const modalContenido = document.getElementById('modalContenido');

paneles.forEach(panel => {
    const btnIdentidad = panel.querySelector('.btn-identidad');
    const idNacion = panel.getAttribute('data-nacion');

    btnIdentidad.addEventListener('click', (e) => {
       e.stopPropagation();
    
    // REPRODUCIR MÚSICA AL ABRIR EL MODAL
    const audio = document.getElementById('musica-nacion');
    if (audio) {
        audio.play().catch(err => console.log("Audio bloqueado:", err));
    }

    const info = datosNaciones[idNacion];
    if(!info) return;
        
        let html = `<h3 class="modal-info-title">${info.titulo}</h3>`;
        html += `<div class="modal-lista-visual">`;
        
        info.imperdibles.forEach((item, index) => {
            html += `
                <div class="imperdible-item">
                    <div class="imperdible-numero">${index + 1}</div>
                    <div class="imperdible-img">
                        <img src="${item.img}" alt="${item.nombre}">
                    </div>
                    <div class="imperdible-info">
                        <h4>${item.nombre}</h4>
                        <p>${item.desc}</p>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
        modalContenido.innerHTML = html;
        modal.classList.add('open');
    });
});

btnCerrar.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const nacionQuery = params.get('nacion');

    if (nacionQuery && datosNaciones[nacionQuery]) {
        const panelObjetivo = document.querySelector(`.nacion-panel[data-nacion="${nacionQuery}"]`);
        if (panelObjetivo) {
            const btn = panelObjetivo.querySelector('.btn-identidad');
            if (btn) btn.click();
        }
    }
});