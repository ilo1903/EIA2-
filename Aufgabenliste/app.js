"use strict";
// Beispielhafte Aufgabenliste direkt in TypeScript
const tasks = [
    {
        title: "🧹 Kloputzen",
        date: "2023-10-31",
        time: "20:00",
        person: "Lydia",
        comment: "die große Bürste benutzen",
        inProgress: false
    }
];
document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    // Funktion zum Rendern der Aufgaben
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h2>🔖 ${task.title}</h2>
                <p>📅 Datum: ${task.date}, 🕒 ${task.time} Uhr</p>
                <p>👤 Bearbeiter: ${task.person}</p>
                <p>💬 Kommentar: ${task.comment}</p>
                <button class="edit-btn">✏️ Bearbeiten</button>
                <button class="delete-btn">❌ Löschen</button>
                <label><input type="checkbox" class="in-progress" ${task.inProgress ? 'checked' : ''}> 🔄 In Bearbeitung</label>
            `;
            taskList.appendChild(li);
        });
    }
    // Aufgaben beim Laden der Seite rendern
    renderTasks();
    // Event Listener für das Hinzufügen einer neuen Aufgabe
    addTaskBtn.addEventListener('click', () => {
        const newTask = {
            title: "🌈 Neue Aufgabe",
            date: "2023-11-01",
            time: "18:00",
            person: "Kevin",
            comment: "Details hinzufügen",
            inProgress: false
        };
        tasks.push(newTask);
        renderTasks();
        console.log("Neue Aufgabe hinzugefügt");
    });
    // Event Listener für die Bearbeitung und das Löschen von Aufgaben
    taskList.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('edit-btn')) {
            console.log("Aufgabe bearbeiten");
        }
        else if (target.classList.contains('delete-btn')) {
            const li = target.closest('li');
            const index = Array.from(taskList.children).indexOf(li);
            tasks.splice(index, 1);
            renderTasks();
            console.log("Aufgabe gelöscht");
        }
    });
    // Event Listener für "In Bearbeitung"-Checkbox
    taskList.addEventListener('change', (event) => {
        const target = event.target;
        if (target.classList.contains('in-progress')) {
            const li = target.closest('li');
            const index = Array.from(taskList.children).indexOf(li);
            tasks[index].inProgress = target.checked;
            console.log("Aufgabe ist in Bearbeitung:", target.checked);
        }
    });
});
//# sourceMappingURL=app.js.map