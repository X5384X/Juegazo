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

    setX(posX){
        this.x = posX;
    }
    getX(){
        return `${this.x}`;
    }
    setY(posY){
        this.y = posY;
    }
    getY(){
        return `${this.y}`;
    }
}
const player1 = new Player("Jugador 1", 130, 5, Math.floor(Math.random() * 300), Math.floor(Math.random() * 300));
const player2 = new Player("Jugador 2", 150, 10, Math.floor(Math.random() * 300), Math.floor(Math.random() * 300));

document.getElementById("nombre-p1").innerHTML = player1.getName();
document.getElementById("nombre-p2").innerHTML = player2.getName();

console.log(player1);
console.log(player2);

//Logica del juego -- En Progreso

//Fisicas Bala -- Por Hacer
class Bullet{
    constructor(x, y, direction){
        this.x = x;
        this.y = y;
        this.direccion = direccion;
        this.speed = 5;
    }

    mover(){
        this.x = this.speed * this.direccion;
    }

    mostrar(){
        const bala = document.createElement('div');
        bala.classList.add('bala');
        bala.style.left = this.x + 'px';
        bala.style.top = this.y + 'px';
        document.querySelector('.field').appendChild(bala);
        return bala;
    }
}

let balas = [];

function disparo(player, num){
    const bala = new Bullet(player.x, player.y, num);
    const balaDisparada = bala.mostrar();
    balas.push({bala, element: balaDisparada})
}

  //Disparo de Balas

document.addEventListener('keydown', (event) => {
    if (event.code === 'f'){
        disparoP1(player1, 1)
    }
})

document.addEventListener('keydown', (event) => {
    if (event.code === 'h'){
        disparoP1(player2, -1)
    }
})

function actualizarBala(){
    balas.forEach((balaObj,index) => {
        balaObj.bala.mover();
        balaObj.element.style.left = balaObj.bala.x + 'px';

        if (balaObj.bala.x > window.innerWidth || balaObj.bala.x < 0) {
            balaObj.element.remove();
            balas.splice(index, 1);
        }
    });
    requestAnimationFrame(updateBullets);
}
actualizarBala();

//Musica y SFX -- En Progreso

function reproducir() {
    const music = document.getElementById("musica");
    music.play();
}