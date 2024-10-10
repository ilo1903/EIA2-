// Namespace verwenden, um den Code strukturiert zu halten
namespace RandomPoem {

    // Arrays mit Subjekten, Prädikaten und Objekten
    let subjects: string[] = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let predicates: string[] = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let objects: string[] = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];

    // Funktion, die einen zufälligen Vers generiert
    function getVerse(_subjects: string[], _predicates: string[], _objects: string[]): string {
        let verse: string = "";

        // Zufälliges Subjekt auswählen
        let randomIndex: number = Math.floor(Math.random() * _subjects.length);
        verse += _subjects.splice(randomIndex, 1)[0] + " ";

        // Zufälliges Prädikat auswählen
        randomIndex = Math.floor(Math.random() * _predicates.length);
        verse += _predicates.splice(randomIndex, 1)[0] + " ";

        // Zufälliges Objekt auswählen
        randomIndex = Math.floor(Math.random() * _objects.length);
        verse += _objects.splice(randomIndex, 1)[0];

        return verse;
    }

    // Funktion, um das Gedicht zu erstellen und in der Konsole auszugeben
    function createPoem(): void {
        for (let i: number = subjects.length; i > 0; i--) {
            console.log(getVerse(subjects, predicates, objects));
        }
    }

    // Gedicht erstellen
    createPoem();
}
