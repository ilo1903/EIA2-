document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Globale Aufgabenliste
    let tasks = [];

    // Funktion, um Daten asynchron zu laden
    async function loadInitialTasks() {
        try {
            const response = await fetch('https://your-github-page-url/tasks.json'); // Hier URL Ihrer JSON-Datei einsetzen
            if (response.ok) {
                tasks = await response.json();
                renderTasks();
            } else {
                console.error('Fehler beim Laden der Startdaten:', response.status);
            }
        } catch (error) {
            console.error('Netzwerkfehler:', error);
        }
    }

    // Funktion zum Rendern der Aufgaben
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
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
            li.dataset.index = index; // Setzen Sie das Datenattribut für den Index
            taskList.appendChild(li);
        });
    }

    // Aufgaben beim Laden der Seite initialisieren
    loadInitialTasks();

    // Funktion zur Anzeige der Ladeanzeige
    function showLoadingIndicator(element) {
        element.querySelector('.loading-indicator').style.display = 'inline';
    }

    function hideLoadingIndicator(element) {
        element.querySelector('.loading-indicator').style.display = 'none';
    }

    // Event Listener für das Hinzufügen einer neuen Aufgabe
    addTaskBtn.addEventListener('click', () => {
        const newTask = {
            title: "Neue Aufgabe",
            date: "2023-11-01",
            time: "18:00",
            person: "Kevin",
            comment: "Details hinzufügen",
            inProgress: false
        };
        tasks.push(newTask);
        renderTasks();
        console.log("Neue Aufgabe hinzugefügt");
        sendDataToServer(newTask); // Senden Sie neue Aufgabe asynchron
    });

    // Event Listener für die Bearbeitung und das Löschen von Aufgaben
    taskList.addEventListener('click', (event) => {
        const target = event.target;
        const li = target.closest('li');
        const index = parseInt(li.dataset.index);

        if (target.classList.contains('edit-btn')) {
            console.log("Aufgabe bearbeiten");
            // Bearbeitungslogik hier hinzufügen...
            sendDataToServer(tasks[index]); // Änderungen senden
        } else if (target.classList.contains('delete-btn')) {
            tasks.splice(index, 1);
            renderTasks();
            console.log("Aufgabe gelöscht");
            sendDataToServer({ action: 'delete', index }); // Daten mit Löschaktion senden
        }
    });

    // Event Listener für "In Bearbeitung"-Checkbox
    taskList.addEventListener('change', (event) => {
        const target = event.target;
        if (target.classList.contains('in-progress')) {
            const li = target.closest('li');
            const index = parseInt(li.dataset.index);
            tasks[index].inProgress = target.checked;
            console.log("Aufgabe ist in Bearbeitung:", target.checked);
            showLoadingIndicator(li);
            sendDataToServer(tasks[index]).finally(() => hideLoadingIndicator(li)); // Daten senden und dann Ladeanzeige verstecken
        }
    });

    // Funktion zum asynchronen Senden von Daten (nur Client-seitig simuliert)
    async function sendDataToServer(data) {
        console.log("Senden von Daten an den Server (simuliert):", data);
        // Simulieren Sie das asynchrone Senden (hier mit einem Timer)
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
});