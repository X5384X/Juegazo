let juego = true;

const musica = new Audio("../audio/Heaven Pierce Her - Versus.mp3");
musica.currentTime = 0;
musica.volume = 0.7;
musica.play();

//Objeto Jugador -- Listo
class Player {
  constructor(name, health, damage, posX, posY) {
    this.name = name;
    this.health = health;
    this.maxhealth = health;
    this.damage = damage;
    this.x = posX;
    this.y = posY;
  }

  //Verifica si el personaje esta vivo
  isAlive() {
    return this.health > 0;
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

  setX(posX) {
    this.x = posX;
  }
  getX() {
    return `${this.x}`;
  }
  setY(posY) {
    this.y = posY;
  }
  getY() {
    return `${this.y}`;
  }
}
const area = document.getElementById("area");
console.log(document.getElementById("area").offsetWidth);
const player1 = new Player(
  "Jugador 1",
  150,
  5,
  100,
  320
);
const player2 = new Player(
  "Jugador 2",
  150,
  5,
  1300,
  320
);

//Fisicas Bala -- Listo

class Bullet {
  constructor(x, y, direccion, sprite) {
    this.x = x;
    this.y = y;
    this.direccion = direccion;
    this.speed = 12;
    this.sprite = sprite;
  }

  mover() {
    this.x += this.speed * this.direccion;
  }

  mostrar() {
    const bala = document.createElement("img");
    bala.src = this.sprite;
    bala.classList.add("bala");
    bala.style.left = this.x + "px";
    bala.style.top = this.y + "px";
    document.querySelector(".game").appendChild(bala);
    return bala;
  }
}

function actualizarHUD(player, healthBarId, healthTextId) {
  const healthBar = document.getElementById(healthBarId);
  const healthText = document.getElementById(healthTextId);

  // Calcula el porcentaje de vida restante
  const healthPercentage = (player.health / player.maxhealth) * 100;

  // Actualiza el ancho de la barra de vida
  healthBar.style.width = healthPercentage + "%";

  // Actualiza el texto de vida
  healthText.innerHTML = `${player.health}/${player.maxhealth}`;
}

//Mecanica de Disparo -- En Progreso

let balas = [];
const shotCooldown = 333; //cuanto tiempo en milisegundos pasa para que se muestre otra bala
let ultimoDisparoP1 = 0;
let ultimoDisparoP2 = 0;

const disparoSFX = new Audio("../audio/disparo.ogg");

function disparo(player, direccion, sprite, ultimoDisparo) {
  const tiempoActual = Date.now();

  if (tiempoActual - ultimoDisparo >= shotCooldown) {
    // Ajusta las coordenadas para que la bala salga del centro del jugador
    const xBala = player.x + (direccion === 1 ? 50 : -10); // Ajustar dependiendo del tamaño del sprite
    const yBala = player.y + 20; // Ajustar dependiendo de dónde quieres que salga la bala
    const bala = new Bullet(xBala, yBala, direccion, sprite);
    const balaDisparada = bala.mostrar();
    disparoSFX.currentTime = 0;
    disparoSFX.volume = 0.5;
    disparoSFX.play();
    balas.push({ bala, element: balaDisparada });

    // Actualizar el tiempo del último disparo
    return tiempoActual; 
  }

  // Si no dispara, mantener el tiempo de último disparo sin cambios
  return ultimoDisparo;
}

function verificarColision(bala, jugador) {
  const jugadorWidth = 50;
  const jugadorHeight = 50;

  return (
    bala.x < jugador.x + jugadorWidth &&
    bala.x + 12 > jugador.x &&
    bala.y < jugador.y + jugadorHeight &&
    bala.y + 5 > jugador.y
  );
}

const explosionSFX = new Audio("../audio/explosion.ogg")

function mostrarExplosion(posX, posY) {
  const explosion = document.createElement("img");
  explosion.src = "../img/explosion.gif";
  explosion.classList.add("explosion");
  explosion.style.position = "absolute";
  explosion.style.left = posX + "px";
  explosion.style.top = posY + "px";
  document.querySelector(".game-area").appendChild(explosion);

  explosionSFX.currentTime = 0;
  explosionSFX.play();

  setTimeout(() => {
    explosion.remove();
  }, 1700);
}

function limpiarBalas() {
  balas.forEach((balaObj) => {
    balaObj.element.remove(); // Elimina el elemento del DOM
  });
  balas = []; // Reinicia el array de balas
}

function verificarSiJugadorMuere(jugador) {
  if (!jugador.isAlive()) {
    juego = false;
    limpiarBalas()
    console.log(`${jugador.getName()} ha sido eliminado.`);
    mostrarExplosion(`${jugador.getX()}`, `${jugador.getY()}`);
    setTimeout(() => {
      alert(`${jugador.getName()} Ha Muerto.`);
      window.location.href = "../index.html";
    }, 1750);
  }
}

const impactoSFX = new Audio("../audio/impacto.ogg");

function actualizarBala() {
  balas.forEach((balaObj, index) => {
    balaObj.bala.mover();
    balaObj.element.style.left = balaObj.bala.x + "px";

    // Verificar colisión con el jugador 1 (con la posición actual)
    if (verificarColision(balaObj.bala, player1Pos)) {
      balaObj.element.remove();
      balas.splice(index, 1);
      player1.health -= player2.damage; // Usar el daño del jugador 2
      actualizarHUD(player1, "p1-health-bar", "p1-health-value");
      impactoSFX.currentTime = 0;
      impactoSFX.play();
      console.log(`¡${player1.getName()} recibió un disparo! HP restante: ${player1.health}`);
      verificarSiJugadorMuere(player1); // Verificar si el jugador 1 ha muerto
    }

    // Verificar colisión con el jugador 2 (con la posición actual)
    if (verificarColision(balaObj.bala, player2Pos)) {
      balaObj.element.remove();
      balas.splice(index, 1);
      player2.health -= player1.damage; // Usar el daño del jugador 1
      actualizarHUD(player2, "p2-health-bar", "p2-health-value");
      impactoSFX.currentTime = 0;
      impactoSFX.play();
      console.log(`¡${player2.getName()} recibió un disparo! HP restante: ${player2.health}`);
      verificarSiJugadorMuere(player2); // Verificar si el jugador 2 ha muerto
    }

    // Elimina la bala si sale del área de juego
    if (balaObj.bala.x > window.innerWidth || balaObj.bala.x < 0) {
      balaObj.element.remove();
      balas.splice(index, 1);
    }
  });
  requestAnimationFrame(actualizarBala);
}
actualizarBala();

const playerSpeed = 5;
const player_1 = document.getElementById("player-1");
const player_2 = document.getElementById("player-2");

let player1Pos = { x: `${player1.getX()}`, y: `${player1.getY()}` };
let player2Pos = { x: `${player2.getX()}`, y: `${player2.getY()}` };

// Handlers
const keys = {};

function update() {
  if (!juego) return;

  if (keys["w"] && player1Pos.y > 0) {
    player1Pos.y -= playerSpeed;
  }
  if (keys["s"] && player1Pos.y < (document.getElementById("area").offsetHeight - 52)) {
    console.log(`${player1.getY()}`);
    player1Pos.y += playerSpeed;
  }
  if (keys["a"] && player1Pos.x > 0) {
    player1Pos.x -= playerSpeed;
  }
  if (keys["d"] && player1Pos.x < ((document.getElementById("area").offsetWidth/2)-60)) {
    player1Pos.x += playerSpeed;
  }
  if (keys["f"]) {
    player1.setX(player1Pos.x);
    player1.setY(player1Pos.y);
    // Aquí actualizamos el tiempo de disparo del jugador 1
    ultimoDisparoP1 = disparo(player1, 1, "../img/BulletP1.png", ultimoDisparoP1);
  }

  if (keys["i"] && player2Pos.y > 0) {
    player2Pos.y -= playerSpeed;
  }
  if (keys["k"] && player2Pos.y < (document.getElementById("area").offsetHeight - 52)) {
    player2Pos.y += playerSpeed;
  }
  if (keys["j"] && player2Pos.x > ((document.getElementById("area").offsetWidth/2)+10)) {
    player2Pos.x -= playerSpeed;
  }
  if (keys["l"] && player2Pos.x < (document.getElementById("area").offsetWidth - 52)) {
    player2Pos.x += playerSpeed;
  }
  if (keys["h"]) {
    player2.setX(player2Pos.x);
    player2.setY(player2Pos.y);
    // Aquí actualizamos el tiempo de disparo del jugador 2
    ultimoDisparoP2 = disparo(player2, -1, "../img/BulletP2.png", ultimoDisparoP2);
  }

  player_1.style.left = `${player1Pos.x}px`;
  player_1.style.top = `${player1Pos.y}px`;

  player_2.style.left = `${player2Pos.x}px`;
  player_2.style.top = `${player2Pos.y}px`;

  requestAnimationFrame(update);
}

window.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

update();

console.log(player1);
console.log(player2);

//Musica y SFX -- En Progreso

function reproducir() {
  const music = document.getElementById("musica");
  music.play();
}
/*document.getElementById("nombre-p1").innerHTML = player1.getName();
document.getElementById("nombre-p2").innerHTML = player2.getName(); */