const inicio = document.getElementById("inicio");
const comenzar = document.getElementById("comenzar");

const musica = document.getElementById("musica");
const musicaBtn = document.getElementById("musicaBtn");

const regalos = [
    document.getElementById("regalo1"),
    document.getElementById("regalo2"),
    document.getElementById("regalo3")
];

const numero = document.getElementById("numero");
const indicador = document.getElementById("indicador");

const final = document.getElementById("final");
const universoFinal = document.getElementById("universoFinal");

const botones = document.querySelectorAll(".siguiente");

let musicaActiva = false;


/* =========================
   COMENZAR
========================= */

comenzar.addEventListener("click", () => {

    inicio.classList.add("ocultar");

    reproducirMusica();

    setTimeout(() => {

        mostrarRegalo(0);

    }, 1000);

});


/* =========================
   MUSICA
========================= */

function reproducirMusica() {

    musica.play()
        .then(() => {

            musicaActiva = true;

            musicaBtn.textContent = "⏸️";

        })
        .catch(() => {

            musicaBtn.textContent = "🎵";

        });

}


musicaBtn.addEventListener("click", () => {

    if (musicaActiva) {

        musica.pause();

        musicaActiva = false;

        musicaBtn.textContent = "🎵";

    } else {

        musica.play()
            .then(() => {

                musicaActiva = true;

                musicaBtn.textContent = "⏸️";

            });

    }

});


/* =========================
   MOSTRAR REGALOS
========================= */

function mostrarRegalo(numeroRegalo) {

    if (numeroRegalo > 2) {

        mostrarFinal();

        return;

    }

    regalos[numeroRegalo].classList.add("visible");

    numero.textContent =
        `${numeroRegalo + 1} / 3`;


    if (numeroRegalo === 0) {

        indicador.textContent =
            "Primero... algo pequeño que me hizo pensar en ti 🐱";

    }

    if (numeroRegalo === 1) {

        indicador.textContent =
            "Y todavía falta otro... 🚗";

    }

    if (numeroRegalo === 2) {

        indicador.textContent =
            "Ahora sí... el último regalo ⚽";

    }


    setTimeout(() => {

        regalos[numeroRegalo].scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 300);

}


/* =========================
   BOTONES
========================= */

botones.forEach((boton) => {

    boton.addEventListener("click", () => {

        const siguiente =
            boton.dataset.regalo;

        if (siguiente === "2") {

            mostrarRegalo(1);

        }

        if (siguiente === "3") {

            mostrarRegalo(2);

        }

        if (siguiente === "final") {

            mostrarFinal();

        }

    });

});


/* =========================
   FINAL DE REGALOS
========================= */

function mostrarFinal() {

    numero.textContent = "❤️";

    indicador.textContent =
        "Y ahora los tres están juntos.";

    final.classList.add("visible");

    setTimeout(() => {

        final.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 300);

}


/* =========================
   UNIVERSO FINAL
========================= */

document
    .getElementById("irUniverso")
    .addEventListener("click", () => {

        universoFinal.classList.add("mostrar");

        setTimeout(() => {

            universoFinal.scrollIntoView({
                behavior: "smooth"
            });

        }, 200);

        crearEstrellasExtra();

    });


/* =========================
   ESTRELLAS EXTRA
========================= */

function crearEstrellasExtra() {

    for (let i = 0; i < 35; i++) {

        const estrella =
            document.createElement("div");

        estrella.style.position = "absolute";

        estrella.style.width =
            Math.random() * 3 + "px";

        estrella.style.height =
            estrella.style.width;

        estrella.style.background =
            "white";

        estrella.style.borderRadius =
            "50%";

        estrella.style.left =
            Math.random() * 100 + "%";

        estrella.style.top =
            Math.random() * 100 + "%";

        estrella.style.boxShadow =
            "0 0 8px #fff";

        estrella.style.opacity =
            Math.random();

        estrella.style.animation =
            `brillar ${Math.random() * 3 + 2}s infinite alternate`;

        universoFinal.appendChild(estrella);

    }

}


/* =========================
   OBSERVAR REGALOS
========================= */

const observador =
    new IntersectionObserver(
        (entradas) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visible");

                }

            });

        },
        {
            threshold: .25
        }
    );


regalos.forEach((regalo) => {

    observador.observe(regalo);

});