const API_URL = "https://7c8644f9-f81d-49cd-980b-1883574694b6.fr.bw-cloud-instance.org/ibe46450/tasks";
const START_DATA_URL = "https://7c8644f9-f81d-49cd-980b-1883574694b6.fr.bw-cloud-instance.org/ibe46450/students.json"; // URL zu Students.json

interface Task {
    id: string;
    title: string;
    date: string;
    time: string;
    person: string;
    comment: string;
    inProgress: boolean;
}

let tasks: Task[] = [];

// Startdaten aus students.json laden
function loadInitialTasks(): Promise<void> {
    return fetch(START_DATA_URL)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Fehler beim Laden der Startdaten");
            }
            return response.json();
        })
        .then(function (data: Task[]) {
            tasks = data;
            renderTasks();
        })
        .catch(function (error) {
            console.error("Fehler beim Laden der Startdaten:", error);
        });
}

// Daten von MingiDB laden
function fetchTasks(): Promise<void> {
    return fetch(API_URL)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Fehler beim Abrufen der Aufgaben");
            }
            return response.json();
        })
        .then(function (data: Task[]) {
            tasks = data;
            renderTasks();
        })
        .catch(function (error) {
            console.error("Fehler beim Abrufen der Aufgaben:", error);
        });
}

// Aufgabe hinzufügen
function addTask(task: Task): Promise<void> {
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Fehler beim Hinzufügen der Aufgabe");
            }
            return fetchTasks();
        })
        .catch(function (error) {
            console.error("Fehler beim Hinzufügen der Aufgabe:", error);
        });
}

// Aufgabe löschen
function deleteTask(id: string): Promise<void> {
    return fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Fehler beim Löschen der Aufgabe");
            }
            return fetchTasks();
        })
        .catch(function (error) {
            console.error("Fehler beim Löschen der Aufgabe:", error);
        });
}

// Aufgaben rendern
function renderTasks(): void {
    const taskList = document.getElementById("task-list") as HTMLUListElement;
    taskList.innerHTML = "";
    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.innerHTML = `
            <h2>🔖 ${task.title}</h2>
            <p>📅 Datum: ${task.date}, 🕒 ${task.time} Uhr</p>
            <p>👤 Bearbeiter: ${task.person}</p>
            <p>💬 Kommentar: ${task.comment}</p>
            <button class="delete-btn" data-id="${task.id}">❌ Löschen</button>
            <label>
                <input type="checkbox" class="in-progress" data-id="${task.id}" ${task.inProgress ? "checked" : ""}>
                🔄 In Bearbeitung
            </label>
        `;
        taskList.appendChild(li);
    });
}

// Event Listener einrichten
function setupEventListeners(): void {
    const addTaskBtn = document.getElementById("add-task-btn") as HTMLButtonElement;

    addTaskBtn.addEventListener("click", function () {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title: "🌈 Neue Aufgabe",
            date: new Date().toISOString().split("T")[0],
            time: "18:00",
            person: "Kevin",
            comment: "Details hinzufügen",
            inProgress: false,
        };
        addTask(newTask);
    });

    document.getElementById("task-list")!.addEventListener("click", function (event) {
        const target = event.target as HTMLElement;
        if (target.classList.contains("delete-btn")) {
            const id = target.getAttribute("data-id")!;
            deleteTask(id);
        }
    });

    document.getElementById("task-list")!.addEventListener("change", function (event) {
        const target = event.target as HTMLInputElement;
        if (target.classList.contains("in-progress")) {
            const id = target.getAttribute("data-id")!;
            const task = tasks.find(function (t) { return t.id === id; })!;
            task.inProgress = target.checked;

            fetch(`${API_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error("Fehler beim Aktualisieren der Aufgabe");
                    }
                    return fetchTasks();
                })
                .catch(function (error) {
                    console.error("Fehler beim Aktualisieren:", error);
                });
        }
    });
}

// App-Initialisierung
document.addEventListener("DOMContentLoaded", function () {
    loadInitialTasks()
        .then(function () {
            setupEventListeners();
        });
});