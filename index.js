const cartas = document.querySelectorAll(".memo-card");
const button = document.querySelector(".btn");
const movimientos = document.querySelector(".movimientos");
const $aciertos = document.querySelector(".contador");
let cantidadMovimientos = Number(12);
let aciertos = Number(0);
let tableroBloqueado = false;
let arrancaste = false;
let primeraCarta, segundaCarta;
movimientos.innerHTML = cantidadMovimientos
$aciertos.innerHTML = aciertos


function girar() {
    if (tableroBloqueado) return;
    if (this === primeraCarta) return;
    this.classList.add("girar");
    if (!arrancaste) {
        arrancaste = true;
        primeraCarta = this;
    return;
    }
    arrancaste = false;
    segundaCarta = this;

    comprobarCoincidencia();
}
function resetearVariables() {
    primeraCarta = null;
    segundaCarta = null;
}

function comprobarCoincidencia() {
    let coincidencia = primeraCarta.dataset.poke === segundaCarta.dataset.poke;

    coincidencia ? deshabilitarCartas() : devolverCartas();
}

function deshabilitarCartas() {
    primeraCarta.removeEventListener("click", girar);
    segundaCarta.removeEventListener("click", girar);
    $aciertos.innerHTML = Number($aciertos.innerHTML) + 1;
    resetearVariables();
    if (Number($aciertos.innerHTML) === Number(6)) {
        setTimeout(() => {
            ganaste();
        }, 300);
    }
}

function devolverCartas() {
    tableroBloqueado = true;
    setTimeout(() => {
            primeraCarta.classList.remove("girar");
            segundaCarta.classList.remove("girar");
            tableroBloqueado = false;
            resetearVariables();
            restarMov();
        }, 700);

}

function cartasClick() {
    cartas.forEach((carta) => carta.addEventListener("click", girar));
    mezclarCartas();
}

cartasClick();

function mezclarCartas() {
    cartas.forEach((carta) => {
        let cartasRandom = Math.floor(Math.random() * 12);
        carta.style.order = cartasRandom;
    })
}

button.addEventListener("click", reset);

function reset() {
    movimientos.innerHTML = cantidadMovimientos
    $aciertos.innerHTML = aciertos
    cartas.forEach((carta) => carta.classList.remove("girar"))
    cartasClick();
}

function restarMov() {
    movimientos.innerHTML = Number(movimientos.innerHTML) - 1;
    if (Number(movimientos.innerHTML) === 0) {
        setTimeout(() => {
            alert("Perdiste :(");
            reset();
        }, 300);
    }
}

function ganaste() {
    alert("GANASTE!");
    reset();
}

