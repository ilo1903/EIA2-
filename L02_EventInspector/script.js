const button = document.getElementById('customButton');

// Add event listener to the button
button.addEventListener('click', function () {
    // Create a custom event
    const customEvent = new CustomEvent('customEventTriggered', {
        detail: { message: 'Button was clicked!' },
        bubbles: true,
        cancelable: true
    });

    // Dispatch the custom event
    button.dispatchEvent(customEvent);
});

// Listen for the custom event on the document
document.addEventListener('customEventTriggered', function (event) {
    console.log('Custom Event Caught at Document Level:', event.detail.message);
});