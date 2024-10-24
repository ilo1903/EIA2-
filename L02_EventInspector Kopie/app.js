"use strict";
// Event-Listener für das Laden der Seite
window.addEventListener('load', handleLoad);
function handleLoad() {
    // Fügt Event-Listener für Mausbewegung hinzu
    document.addEventListener('mousemove', setInfoBox);
    // Fügt Event-Listener für Klick und Tastendrücke auf Dokument, Body und alle Divs hinzu
    const elements = [document, document.body, ...Array.from(document.querySelectorAll('div'))];
    elements.forEach((element) => {
        element.addEventListener('click', logInfo);
        element.addEventListener('keyup', logInfo);
    });
    const button = document.getElementById('customButton');
    if (button) {
        button.addEventListener('click', triggerCustomEvent);
    }
}
// Funktion, die das Info-Span an die Mausposition anpasst
function setInfoBox(event) {
    const infoSpan = document.getElementById('infoSpan');
    if (infoSpan) {
        infoSpan.style.left = `${event.pageX + 15}px`;
        infoSpan.style.top = `${event.pageY + 15}px`;
        infoSpan.innerText = `Mausposition: (${event.pageX}, ${event.pageY}), Ziel: ${event.target}`;
    }
}
// Protokolliert Event-Informationen in der Konsole
function logInfo(event) {
    console.log('Event-Typ:', event.type);
    console.log('Ziel:', event.target);
    console.log('Aktuelles Ziel:', event.currentTarget);
    console.log('Ganzes Event:', event);
}
// Löst ein benutzerdefiniertes Event aus, wenn der Button geklickt wird
function triggerCustomEvent(event) {
    const customEvent = new CustomEvent('customEvent', {
        bubbles: true,
        detail: { message: 'Button wurde geklickt' }
    });
    event.target?.dispatchEvent(customEvent);
}
// Fangt das benutzerdefinierte Event auf Dokumentebene ab
document.addEventListener('customEvent', (event) => {
    console.log('Benutzerdefiniertes Event im Dokument abgefangen:', event);
});
//# sourceMappingURL=app.js.map