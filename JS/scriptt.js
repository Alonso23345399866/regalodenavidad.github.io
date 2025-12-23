const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createSnow() {
    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3 + 1,
            d: Math.random() + 1
        });
    }
}

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();

    for (let p of particles) {
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    }

    ctx.fill();
    updateSnow();
}

let angle = 0;

function updateSnow() {
    angle += 0.01;

    for (let p of particles) {
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 0.5;

        if (p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }
    }
}

setInterval(drawSnow, 25);
createSnow();

function mostrarRegistro() {
    document.getElementById("registro").style.display = "block";
}

function guardarNombre() {
    const nombre = document.getElementById("nombreInput").value;
    const mensaje = document.getElementById("mensajeFinal");

    if (nombre.trim() === "") {
        mensaje.textContent = "Por favor, escribe tu nombre 🩷";
    } else {
        mensaje.textContent = "¡Gracias " + nombre + "! 🎁✨";
    }
}

function mostrarRegistro() {
    document.getElementById("registro").style.display = "block";
}

function guardarNombre() {
    const nombre = document.getElementById("nombreInput").value;

    if (nombre.trim() === "") {
        document.getElementById("mensajeFinal").textContent = "Por favor, escribe tu nombre";
        return;
    }

    // Ocultar COMPLETAMENTE las secciones (sin dejar espacio)
    const secciones = document.querySelectorAll(
        "header, .card, .gallery, .surprise-section"
    );

    // Ocultar la primera pantalla
    document.body.innerHTML = document.body.innerHTML; // kill events (opcional)

    document.querySelector(".surprise-section").style.display = "none";
    document.querySelector(".gallery").style.display = "none";
    document.querySelector(".card").style.display = "none";
    document.querySelector("header").style.display = "none";

    // Mostrar la pantalla del corazón
    const pantalla = document.getElementById("pantallaCorazon");
    pantalla.style.display = "block";

    document.getElementById("tituloCorazon").textContent =
        "Para ti, " + nombre ;

    generarCorazon();
}

// Matriz del corazón
const heartMap = [
    [0,0,1,1,0,1,1,0,0],
    [0,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,0,0,0],
    [0,0,0,0,1,0,0,0,0]
];

// Imágenes de Sana para el corazón
const imagenesSana = ["Imagenes/Imagen_Sana.jpg"];

function generarCorazon() {
    const contenedor = document.querySelector(".corazon-grid");

    heartMap.forEach(fila => {
        fila.forEach(celda => {
            if (celda === 1) {
                // Crear imagen
                const img = document.createElement("img");
                img.src = imagenesSana[Math.floor(Math.random() * imagenesSana.length)];
                contenedor.appendChild(img);
            } else {
                // Crear espacio vacío
                const espacio = document.createElement("div");
                contenedor.appendChild(espacio);
            }
        });
    });
}