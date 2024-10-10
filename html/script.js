const imageFiles = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg',
    'images/image5.jpg',
    'images/image6.jpg',
    'images/image8.jpg',
];

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    return imageFiles[randomIndex];
}

function generateCollage() {
    const collageContainer = document.getElementById('collageContainer');
    collageContainer.innerHTML = '';

    const rows = 10; 
    const columns = 10;

    for (let i = 0; i < rows * columns; i++) {
        const imgElement = document.createElement('img');
        imgElement.src = getRandomImage();
        collageContainer.appendChild(imgElement);
    }
}
document.getElementById('generateButton').addEventListener('click', generateCollage);


generateCollage();