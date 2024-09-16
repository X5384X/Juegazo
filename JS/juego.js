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


  //Movimiento -- En Progreso
function movement(dir){
    onkeydown = (key) =>{
        
    } 
}

  //Disparo -- Por Hacer



//Fisicas Bala -- Por Hacer
