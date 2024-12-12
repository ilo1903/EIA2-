"use strict";
class Animal {
    constructor(name, species, foodType, dailyFoodAmount, sound) {
        if (!name || !species || !foodType || !sound) {
            throw new Error("All animals must have a name, species, food type, and sound!");
        }
        this.name = name;
        this.species = species;
        this.foodType = foodType;
        this.dailyFoodAmount = dailyFoodAmount;
        this.sound = sound;
    }
    singSong() {
        return `
            <strong>${this.name}'s Song</strong>
            Old MacDonald had a farm, E-I-E-I-O!<br>
            And on that farm, he had a ${this.species}, E-I-E-I-O!<br>
            With a ${this.sound} ${this.sound} here and a ${this.sound} ${this.sound} there!<br>
            Here a ${this.sound}, there a ${this.sound}, everywhere a ${this.sound} ${this.sound}!<br>
            Old MacDonald had a farm, E-I-E-I-O!
        `;
    }
    eatFood(foodStock) {
        if (foodStock[this.foodType] >= this.dailyFoodAmount) {
            foodStock[this.foodType] -= this.dailyFoodAmount;
            return `${this.name} the ${this.species} ate ${this.dailyFoodAmount} units of ${this.foodType}. Remaining: ${foodStock[this.foodType]} units.`;
        }
        else {
            return `⚠️ Not enough ${this.foodType} for ${this.name} the ${this.species}.`;
        }
    }
}
class Farm {
    constructor() {
        this.animals = [];
        this.foodStock = {
            'Grass': 50,
            'Grains': 30,
            'Meat': 20,
            'Junk': 10
        };
    }
    addAnimal(animal) {
        this.animals.push(animal);
    }
    simulateDay() {
        const logElement = document.getElementById('log');
        logElement.innerHTML = `<h2>Farm Log</h2>`;
        for (const [foodType, amount] of Object.entries(this.foodStock)) {
            logElement.innerHTML += `<div class="log-entry">Food: ${foodType}, Amount: ${amount}</div>`;
        }
        this.animals.forEach(animal => {
            logElement.innerHTML += `<div class="log-entry">${animal.singSong()}<br>${animal.eatFood(this.foodStock)}</div>`;
        });
        this.updateFoodStockDisplay();
    }
    updateFoodStockDisplay() {
        const foodStockElement = document.getElementById('food-stock');
        foodStockElement.innerHTML = '';
        for (const [foodType, amount] of Object.entries(this.foodStock)) {
            foodStockElement.innerHTML += `<li>${foodType}: ${amount} units</li>`;
        }
    }
}
const farm = new Farm();
farm.addAnimal(new Animal("Bessie", "Cow", "Grass", 5, "Moo"));
farm.addAnimal(new Animal("Clucky", "Chicken", "Grains", 2, "Cluck"));
const simulateDayButton = document.getElementById('simulate-day-btn');
simulateDayButton.addEventListener('click', () => farm.simulateDay());
//# sourceMappingURL=script.js.map