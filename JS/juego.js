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

//Movimiento

const playerSpeed = 5;
const player1 = document.getElementById("player-1");
const player2 = document.getElementById("player-2");

let player1Pos = { x: 100, y: 320 };
let player2Pos = { x: 1300, y: 320 };

// Handlers

const keys = {};

function update() {
  if (keys["w"] && player1Pos.y > 0) {
    player1Pos.y -= playerSpeed;
  }
  if (keys["s"] && player1Pos.y < 700) {
    player1Pos.y += playerSpeed;
  }
  if (keys["a"] && player1Pos.x > 0) {
    player1Pos.x -= playerSpeed;
  }
  if (keys["d"] && player1Pos.x < 1450) {
    player1Pos.x += playerSpeed;
  }
  if (keys["f"]) {
    bulletShot();
  }

  if (keys["i"] && player2Pos.y > 0) {
    player2Pos.y -= playerSpeed;
  }
  if (keys["k"] && player2Pos.y < 700) {
    player2Pos.y += playerSpeed;
  }
  if (keys["j"] && player2Pos.x > 0) {
    player2Pos.x -= playerSpeed;
  }
  if (keys["l"] && player2Pos.x < 1450) {
    player2Pos.x += playerSpeed;
  }
  if (keys["h"]) {
    bulletShot();
  }
  player1.style.left = `${player1Pos.x}px`;
  player1.style.top = `${player1Pos.y}px`;

  player2.style.left = `${player2Pos.x}px`;
  player2.style.top = `${player2Pos.y}px`;

  requestAnimationFrame(update);
}

window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});
//Fisicas Bala -- Por Hacer

/*const player1 = new Character("Jugador 1", 130, 5);
const player2 = new Character("Jugador 2", 150, 10); */

console.log(player1);
console.log(player2);

update();

/*document.getElementById("nombre-p1").innerHTML = player1.getName();
document.getElementById("nombre-p2").innerHTML = player2.getName(); */
