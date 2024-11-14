document.addEventListener('DOMContentLoaded', () => {
    // Referenz auf den Button zum Hinzufügen neuer Aufgaben und die Liste aller Aufgaben
    const addTaskBtn = document.getElementById('add-task-btn') as HTMLButtonElement;
    const taskList = document.getElementById('task-list') as HTMLUListElement;

    // Typdefinition für eine Aufgabe
    interface Task {
        title: string;
        date: string;
        time: string;
        person: string;
        comment: string;
        inProgress: boolean;
    }

    // Globale Aufgabenliste
    let tasks: Task[] = [];

    // Funktion, um die Startdaten asynchron aus einer JSON-Datei zu laden
    async function loadInitialTasks(): Promise<void> {
        try {
            // URL zu Ihrer JSON-Datei anpassen
            const response = await fetch('https://your-website-url/tasks.json');
            if (response.ok) {
                // Startdaten werden in die globale `tasks`-Liste geladen
                tasks = await response.json();
                renderTasks(); // Aufgaben in der Benutzeroberfläche darstellen
            } else {
                console.error('Fehler beim Laden der Startdaten:', response.status);
            }
        } catch (error) {
            console.error('Netzwerkfehler beim Laden der Startdaten:', error);
        }
    }

    // Funktion zum Rendern der Aufgaben in der Benutzeroberfläche
    function renderTasks(): void {
        taskList.innerHTML = ''; // Liste zurücksetzen
        tasks.forEach((task, index) => {
            // Erstellen eines Listenelements für jede Aufgabe
            const li = document.createElement('li');
            li.innerHTML = `
                <h2>${task.title}</h2>
                <p>Datum: ${task.date}, ${task.time} Uhr</p>
                <p>Bearbeiter: ${task.person}</p>
                <p>Kommentar: ${task.comment}</p>
                <button class="edit-btn">Bearbeiten</button>
                <button class="delete-btn">Löschen</button>
                <label><input type="checkbox" class="in-progress" ${task.inProgress ? 'checked' : ''}> In Bearbeitung</label>
                <div class="loading-indicator" style="display: none;">⏳ Speichern...</div>
            `;
            li.dataset.index = index.toString(); // Index der Aufgabe als Datenattribut speichern
            taskList.appendChild(li); // Listenelement zur Liste hinzufügen
        });
    }

    // Initiales Laden der Aufgaben beim Laden der Seite
    loadInitialTasks();

    // Funktion zur Anzeige eines Ladeindikators während einer asynchronen Operation
    function showLoadingIndicator(element: HTMLElement): void {
        const indicator = element.querySelector('.loading-indicator') as HTMLElement;
        if (indicator) {
            indicator.style.display = 'inline'; // Ladeindikator sichtbar machen
        }
    }

    // Funktion zum Verbergen des Ladeindikators nach einer asynchronen Operation
    function hideLoadingIndicator(element: HTMLElement): void {
        const indicator = element.querySelector('.loading-indicator') as HTMLElement;
        if (indicator) {
            indicator.style.display = 'none'; // Ladeindikator ausblenden
        }
    }

    // Funktion zum asynchronen Senden von Daten an einen Server (hier simuliert)
    async function sendDataToServer(data: any): Promise<void> {
        console.log("Senden von Daten an den Server (simuliert):", data);
        // Simuliertes asynchrones Senden mit einer Verzögerung von 1 Sekunde
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Daten erfolgreich gesendet");
    }

    // Event Listener für das Hinzufügen einer neuen Aufgabe
    addTaskBtn.addEventListener('click', async () => {
        // Neue Aufgabe erstellen und zur Liste hinzufügen
        const newTask: Task = {
            title: "Neue Aufgabe",
            date: "2023-11-01",
            time: "18:00",
            person: "Kevin",
            comment: "Details hinzufügen",
            inProgress: false
        };
        tasks.push(newTask); // Neue Aufgabe zur Aufgabenliste hinzufügen
        renderTasks(); // Aufgabenliste aktualisieren
        console.log("Neue Aufgabe hinzugefügt");

        // Ladeindikator während der Datenübertragung anzeigen
        const li = taskList.lastChild as HTMLElement;
        showLoadingIndicator(li);
        await sendDataToServer(newTask); // Daten an den Server senden
        hideLoadingIndicator(li); // Ladeindikator ausblenden
    });

    // Event Listener für die Bearbeitung und das Löschen von Aufgaben
    taskList.addEventListener('click', async (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const li = target.closest('li') as HTMLElement;
        const index = parseInt(li.dataset.index ?? '-1'); // Index der Aufgabe aus dem Datenattribut auslesen

        if (target.classList.contains('edit-btn')) {
            console.log("Aufgabe bearbeiten");
            showLoadingIndicator(li); // Ladeindikator anzeigen
            // Logik zur Bearbeitung der Aufgabe kann hier hinzugefügt werden
            await sendDataToServer(tasks[index]); // Änderungen an den Server senden
            hideLoadingIndicator(li); // Ladeindikator ausblenden
        } else if (target.classList.contains('delete-btn')) {
            tasks.splice(index, 1); // Aufgabe aus der Liste entfernen
            renderTasks(); // Aufgabenliste aktualisieren
            console.log("Aufgabe gelöscht");
            showLoadingIndicator(li);
            await sendDataToServer({ action: 'delete', index }); // Daten mit Löschaktion an den Server senden
            hideLoadingIndicator(li);
        }
    });

    // Event Listener für die Änderung des Status "In Bearbeitung"
    taskList.addEventListener('change', async (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.classList.contains('in-progress')) {
            const li = target.closest('li') as HTMLElement;
            const index = parseInt(li.dataset.index ?? '-1');
            tasks[index].inProgress = target.checked; // Status der Aufgabe aktualisieren
            console.log("Aufgabe ist in Bearbeitung:", target.checked);
            showLoadingIndicator(li); // Ladeindikator anzeigen
            await sendDataToServer(tasks[index]); // Änderungen an den Server senden
            hideLoadingIndicator(li); // Ladeindikator ausblenden
        }
    });
});