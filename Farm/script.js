"use strict";
// 🐄 🐔 🐕 🐖 🐎 🐓 Klassen-Definition der Tiere
class Animal {
    constructor(name, species, sound, foodType, foodAmount) {
        if (!name || !species || !sound || !foodType || foodAmount <= 0) {
            throw new Error("Alle Tierinformationen müssen korrekt angegeben werden!");
        }
        this.name = name;
        this.species = species;
        this.sound = sound;
        this.foodType = foodType;
        this.foodAmount = foodAmount;
    }
    sing() {
        return `Old MacDonald hat 'ne Farm, E-I-E-I-O und auf der Farm hat er ein ${this.species}, ${this.sound} ${this.sound}!`;
    }
    eat(foodStorage) {
        if (foodStorage[this.foodType] >= this.foodAmount) {
            foodStorage[this.foodType] -= this.foodAmount;
        }
        else {
            console.log(`Nicht genug ${this.foodType} für ${this.name}`);
        }
    }
}
// 🥦🍎🐟🐖 Definition der Vorräte
let foodStorage = {
    "Grass": 50,
    "Grains": 30,
    "Meat": 20,
    "Vegetables": 40
};
// 🐄 Tiere der Farm initialisieren
let animals = [
    new Animal("Berta", "Kuh", "Muuuh", "Grass", 10),
    new Animal("Henriette", "Huhn", "Gack Gack", "Grains", 5),
    new Animal("Rex", "Hund", "Wuff", "Meat", 3),
    new Animal("Elsa", "Pferd", "Wieher", "Grass", 15),
    new Animal("Fred", "Schwein", "Oink", "Vegetables", 8)
];
// 🕰️ Zähler für Tage
let currentDay = 1;
// 🖥️ Funktionen zur Aktualisierung der UI
function updateFoodSupplyUI() {
    const supplyList = document.getElementById('supply-list');
    supplyList.innerHTML = '';
    for (let [foodType, amount] of Object.entries(foodStorage)) {
        const li = document.createElement('li');
        li.textContent = `${foodType}: ${amount} Einheiten übrig`;
        li.className = 'supply-list-item';
        supplyList.appendChild(li);
    }
}
function displayAnimalSongs() {
    const animalSongsContainer = document.getElementById('animal-songs');
    animalSongsContainer.innerHTML = '<h2>Tiere singen</h2>';
    animals.forEach(animal => {
        const div = document.createElement('div');
        div.className = 'animal-song';
        div.innerHTML = `<h3>${animal.name} (${animal.species})</h3><p>${animal.sing()}</p>`;
        animalSongsContainer.appendChild(div);
    });
}
function simulateDay() {
    console.log(`Start von Tag ${currentDay}`);
    animals.forEach(animal => {
        animal.eat(foodStorage);
    });
    displayAnimalSongs();
    updateFoodSupplyUI();
    document.getElementById('day-counter').textContent = `Tag: ${currentDay}`;
    currentDay++;
}
// 🎉 Event-Listener für den "Nächster Tag" Button
document.getElementById('next-day-button').addEventListener('click', () => {
    simulateDay();
});
// 🏁 Initialer Start
updateFoodSupplyUI();
simulateDay();
//# sourceMappingURL=script.js.map