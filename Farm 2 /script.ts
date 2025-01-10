// Abstrakte Basisklasse Animal
abstract class Animal {
    name: string;
    species: string;
    sound: string;
    foodType: string;
    foodAmount: number;

    constructor(name: string, species: string, sound: string, foodType: string, foodAmount: number) {
        if (!name || !species || !sound || !foodType || foodAmount <= 0) {
            throw new Error("Alle Tierinformationen müssen korrekt angegeben werden!");
        }
        this.name = name;
        this.species = species;
        this.sound = sound;
        this.foodType = foodType;
        this.foodAmount = foodAmount;
    }

    sing(): string {
        return `Old MacDonald hat 'ne Farm, E-I-E-I-O und auf der Farm hat er ein ${this.species}, ${this.sound} ${this.sound}!`;
    }

    eat(foodStorage: Record<string, number>): string {
        if (foodStorage[this.foodType] >= this.foodAmount) {
            foodStorage[this.foodType] -= this.foodAmount;
            return `${this.name} hat ${this.foodAmount} Einheiten ${this.foodType} gefressen.`;
        } else {
            return `⚠️ Nicht genug ${this.foodType} für ${this.name}!`;
        }
    }

    // Abstrakte Methode, die von Subklassen implementiert werden muss
    abstract doSpecialAction(): string;
}

// Spezialisierte Subklassen
class Cow extends Animal {
    constructor(name: string) {
        super(name, "Kuh", "Muuuh", "Grass", 10);
    }

    doSpecialAction(): string {
        return `${this.name} hat heute frische Milch produziert! 🥛`;
    }
}

class Chicken extends Animal {
    constructor(name: string) {
        super(name, "Huhn", "Gack Gack", "Grains", 5);
    }

    doSpecialAction(): string {
        return `${this.name} hat heute ein Ei gelegt! 🥚`;
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name, "Hund", "Wuff", "Meat", 3);
    }

    doSpecialAction(): string {
        return `${this.name} hat den Hof bewacht! 🐕`;
    }
}

class Horse extends Animal {
    constructor(name: string) {
        super(name, "Pferd", "Wieher", "Grass", 15);
    }

    doSpecialAction(): string {
        return `${this.name} hat den Wagen gezogen! 🐴`;
    }
}

class Pig extends Animal {
    constructor(name: string) {
        super(name, "Schwein", "Oink", "Vegetables", 8);
    }

    doSpecialAction(): string {
        return `${this.name} hat sich im Schlamm gewälzt! 🐖`;
    }
}
let foodStorage: Record<string, number> = {
    "Grass": 50,
    "Grains": 30,
    "Meat": 20,
    "Vegetables": 40
};

let animals: Animal[] = [
    new Cow("Berta"),
    new Chicken("Henriette"),
    new Dog("Rex"),
    new Horse("Elsa"),
    new Pig("Fred")
];

let currentDay = 1;

function updateFoodSupplyUI(): void {
    const supplyList = document.getElementById('supply-list')!;
    supplyList.innerHTML = '';
    for (let [foodType, amount] of Object.entries(foodStorage)) {
        const li = document.createElement('li');
        li.textContent = `${foodType}: ${amount} Einheiten übrig`;
        li.className = 'supply-list-item';
        supplyList.appendChild(li);
    }
}

function displayAnimalSongs(): void {
    const animalSongsContainer = document.getElementById('animal-songs')!;
    animalSongsContainer.innerHTML = '<h2>Tiere singen</h2>';
    animals.forEach(animal => {
        const div = document.createElement('div');
        div.className = 'animal-song';
        div.innerHTML = `<h3>${animal.name} (${animal.species})</h3><p>${animal.sing()}</p><p> ${animal.doSpecialAction()}`;
        animalSongsContainer.appendChild(div);
    });
}





function simulateDay(): void {
    console.log(`Start von Tag ${currentDay}`);
    const specialActions: string[] = [];
    animals.forEach(animal => {
        console.log(animal.eat(foodStorage));
        specialActions.push(animal.doSpecialAction());
    });

    displayAnimalSongs();
    updateFoodSupplyUI();
    document.getElementById('day-counter')!.textContent = `Tag: ${currentDay}`;

    const specialActionsContainer = document.getElementById('special-actions')!;
    specialActionsContainer.innerHTML = `<h2>Besondere Aktionen</h2>${specialActions.map(action => `<p>${action}</p>`).join('')}`;

    currentDay++;
}

// Event-Listener für den Button
document.getElementById('next-day-button')!.addEventListener('click', () => {
    simulateDay();
});

// Initialisieren
updateFoodSupplyUI();
simulateDay();