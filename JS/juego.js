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

    getName(){
        return `${this.name}`;
    }

    getHealth(){
        return `${this.health}`;
    }
}

const player1 = new Character("Jugador 1", 130, 5);
const player2 = new Character("Jugador 2", 150, 10);

console.log(player1);
console.log(player2);

document.getElementById("nombre-p1").innerHTML = player1.getName();
document.getElementById("nombre-p2").innerHTML = player2.getName();

