function addTask(): void {
    console.log("Neue Aufgabe wurde hinzugefügt.");
}

function editTask(taskId: string): void {
    console.log(`Aufgabe ${taskId} wird bearbeitet.`);
}

function markInProgress(taskId: string): void {
    console.log(`Aufgabe ${taskId} ist jetzt in Bearbeitung.`);
}

function deleteTask(taskId: string): void {
    console.log(`Aufgabe ${taskId} wurde gelöscht.`);
}