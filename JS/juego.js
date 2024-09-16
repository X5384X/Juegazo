//Logica del juego

//Constructor de los Jugadores
class Character {
  constructor(name, health, damage) {
    //Atributos
    this.name = name;
    this.health = health;
    this.maxhealth = health;
    this.damage = damage;
  }
  //Verifica si el personaje esta vivo
  isAlive() {
    return this.health > 0;
  }

  //Ataca a otro personaje seleccionado
  attack(target) {
    console.log(`${this.name} inflige ${this.damage} de daño a ${target.name}`);
    target.health -= this.damage;
  }

  //Retorna la información actual del personaje
  status() {
    return `${this.name} - HP ${this.health}/${this.maxhealth}`;
  }

  getName() {
    return `${this.name}`;
  }

  getHealth() {
    return `${this.health}`;
  }
}

//Movimiento -- Por Hacer

const pantalla = document.getElementById("pantallaJuego");
const pantallaxt = pantalla.getContext("pantalla");
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

//Movimiento Player 1

let player1Up = false;
let player1Left = false;
let player1Right = false;
let player1Down = false;

//Movimiento Player 2

let player2Up = false;
let player2Left = false;
let player2Right = false;
let player2Down = false;

// Handlers

function keyDown(e) {
  if (e.code == "KeyW") player1Up = true;
  if (e.code == "KeyA") player1Left = true;
  if (e.code == "KeyD") player1Right = true;
  if (e.code == "KeyS") player1Down = true;
  if (e.code == "KeyI") player2Up = true;
  if (e.code == "KeyJ") player2Left = true;
  if (e.code == "KeyL") player2Right = true;
  if (e.code == "KeyK") player2Down = true;
}

function keyUp(e) {
  if (e.code == "KeyW") player1Up = false;
  if (e.code == "KeyA") player1Left = false;
  if (e.code == "KeyD") player1Right = false;
  if (e.code == "KeyS") player1Down = false;
  if (e.code == "KeyI") player2Up = false;
  if (e.code == "KeyJ") player2Left = false;
  if (e.code == "KeyL") player2Right = false;
  if (e.code == "KeyK") player2Down = false;
}

function drawPlayer1() {
  pantallaxt.clearRect(0, 0, pantalla.width, pantalla.height);
  if (player1Up) {
    player1Y += 5;
  } else if (player1Down) {
    player1Y -= 5;
  }
  if (player1Right) {
    player1X += 5;
  } else if (player1Left) {
    player1X -= 5;
  }

  pantallaxt.drawImage(img1, player1X, player1Y);
  requestAnimationFrame(draw);
}

function drawPlayer2() {
  pantallaxt.clearRect(0, 0, pantalla.width, pantalla.height);
  if (player2Up) {
    player2Y += 5;
  } else if (player2Down) {
    player2Y -= 5;
  }
  if (player2Right) {
    player2X += 5;
  } else if (player2Left) {
    player2X -= 5;
  }

  pantallaxt.drawImage(img2, player2X, player2Y);
  requestAnimationFrame(draw);
}

//Fisicas Bala -- Por Hacer

const player1 = new Character("Jugador 1", 130, 5);
const player2 = new Character("Jugador 2", 150, 10);

console.log(player1);
console.log(player2);

document.getElementById("nombre-p1").innerHTML = player1.getName();
document.getElementById("nombre-p2").innerHTML = player2.getName();
