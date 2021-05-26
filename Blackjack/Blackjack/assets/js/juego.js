let deck = [];
const tipos = ["C","D","H","S"];
const especiales = ["A","J","Q","K"];
//referencias al Html
const btnPedir = document.querySelector("#btnPedir");
const btnNuevo = document.querySelector("#btnNuevo");
const btnParar = document.querySelector("#btnParar");
const small = document.querySelectorAll("small");
let puntosJugador = 0;
let puntosComputadora = 0;
let hayAs = false;
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // Mientras queden elementos a mezclar...
    while (0 !== currentIndex) {
  
      // Seleccionar un elemento sin mezclar...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // E intercambiarlo con el elemento actual
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
const crearDeck= ()=> {
    for (let i = 2; i <= 10; i++){
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
       
    }
    for (let tipo of tipos) {
        for(let esp of especiales) {
            deck.push(esp+tipo);
        }
    }
    deck =shuffle(deck);
    console.log(deck);
    return deck;
}
crearDeck();
const pedirCarta = ()=> {
    if (deck.length=== 0) {
        throw "no hay mas cartas en el deck";
    }
    carta = deck.pop()
    return carta;
}
const valorCarta = (carta)=> {
    const valor = carta.substring(0, carta.length -1);
    return (isNaN(valor))?
    (valor === "A")? hayAs =true:10
    : valor * 1;
}
const turnoComputadora = (puntosMinimos) => {
    do {
        
    const carta = pedirCarta()
    let puntos = valorCarta(carta);
    if(hayAs === true) {
        ( puntosComputadora<= 10 )? puntos = 11 : puntos = 1;
        hayAs = false;
    }
    puntosComputadora = puntosComputadora + puntos;
    small[1].innerText = puntosComputadora;
    const  crearCarta = document.createElement("img");
    crearCarta.src = `assets/cartas/${carta}.png`
    crearCarta.classList.add("carta");
    divCartasComputadora.append(crearCarta)
}while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
setTimeout(() => {
    if (puntosComputadora > puntosMinimos && puntosComputadora <= 21){
        alert('computadora gana')
    }else if (puntosComputadora> 21&& puntosMinimos <= 21 ) {
        alert('Tu ganas')
    }else  if (puntosMinimos === puntosComputadora){alert('Nadie Gana')}
    else if (puntosMinimos> 21) {
        alert('computadora gana')
    }
}, 100);
}

btnPedir.addEventListener("click",()=> {
    const carta = pedirCarta()
    let puntos = valorCarta(carta);
    if(hayAs === true) {
        ( puntosJugador<= 10 )? puntos = 11 : puntos = 1;
        hayAs = false;
    }
    puntosJugador = puntosJugador + puntos;
    small[0].innerText = puntosJugador;
    const  crearCarta = document.createElement("img");
    crearCarta.src = `assets/cartas/${carta}.png`
    crearCarta.classList.add("carta");
    divCartasJugador.append(crearCarta)
    console.log (puntos);
    if (puntosJugador > 21) {
        console.warn('perdiste')
        turnoComputadora(puntosJugador)
        btnPedir.disabled = true ;
        btnParar.disabled = true;
    }else if (puntosJugador === 21){
        console.warn('!21, genial')
        turnoComputadora(puntosJugador)
        btnPedir.disabled = true ;
        btnParar.disabled = true;
    }
})
btnParar.addEventListener('click' , ()=>{
    btnPedir.disabled = true;
    btnParar.disabled = true;
    turnoComputadora(puntosJugador);
})
btnNuevo.addEventListener('click',()=> {
    console.clear()
    deck = [];
    deck = crearDeck()
    puntosJugador = 0
    puntosComputadora = 0
    small[0].innerText = 0
    small[1].innerText = 0
    divCartasComputadora.innerHTML = ''
    divCartasJugador.innerHTML = ''
    btnPedir.disabled = false ;
    btnParar.disabled = false;
})