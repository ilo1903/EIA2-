// Event-Listener für das Laden der Seite
window.addEventListener('load', handleLoad);

function handleLoad() {
    // Fügt Event-Listener für Mausbewegung, Klick und Tastendrücke hinzu
    document.addEventListener('mousemove', setInfoBox);
    document.addEventListener('click', logInfo);
    document.addEventListener('keyup', logInfo);

    const button = document.getElementById('customButton');
    button.addEventListener('click', triggerCustomEvent);
}

// Funktion, die das Info-Span an die Mausposition anpasst
function setInfoBox(event) {
    const infoSpan = document.getElementById('infoSpan');
    infoSpan.style.left = event.pageX + 15 + 'px';
    infoSpan.style.top = event.pageY + 15 + 'px';
    infoSpan.innerText = `Mausposition: (${event.pageX}, ${event.pageY})`;
    //infoSpan.style.display = 'block';
}

// Protokolliert Event-Informationen in der Konsole
function logInfo(event) {
    console.log('Event-Typ:', event.type);
    console.log('Ziel:', event.target);
    console.log('Aktuelles Ziel:', event.currentTarget);
}

// Löst ein benutzerdefiniertes Event aus, wenn der Button geklickt wird
function triggerCustomEvent(event) {
    const customEvent = new CustomEvent('customEvent', {
        bubbles: true,
        detail: { message: 'Button wurde geklickt' }
    });
    event.target.dispatchEvent(customEvent);
}

// Fangt das benutzerdefinierte Event auf Dokumentebene ab
document.addEventListener('customEvent', function(event) {
    console.log('Benutzerdefiniertes Event im Dokument abgefangen:', event.detail.message);
});