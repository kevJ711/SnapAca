let closePlayer = document.querySelector('#close-player');
let musicPlayer = document.querySelector('.music-player');
let boxContainer = document.querySelector('.container .box-container');

// Function to toggle music player visibility
function toggleMusicPlayer() {
    closePlayer.classList.toggle('fa-times');
    musicPlayer.classList.toggle('active');
    boxContainer.classList.toggle('active');
}
// Define an array to store music tracks
let musicTracks = [
    {
        name: "Any Colour You Like - Pink Floyd",
        src: "images/music-1.mp3",
        albumImage: "images/album-1.png"
    },
    {
        name: "And I Love Her - The Beatles",
        src: "images/music-2.mp3",
        albumImage: "images/album-2.png"
    },
    {
        name: "Snooze - SZA",
        src: "images/music-3.mp3",
        albumImage: "images/album-3.png"
    },
    {
        name: "Wildest Dreams - Taylor Swift",
        src: "images/music-4.mp3",
        albumImage: "images/album-4.png"
    },
    {
        name: "505 - ArcticMonkeys",
        src: "images/music-5.mp3",
        albumImage: "images/album-5.png"
    },
    {
        name: "Good Morning - Kanye West",
        src: "images/music-6.mp3",
        albumImage: "images/album-6.png"
    },
    
];


// Function to toggle music player visibility
function toggleMusicPlayer() {
    closePlayer.classList.toggle('fa-times');
    musicPlayer.classList.toggle('active');
    boxContainer.classList.toggle('active');
}


function populateBoxContainer() {
    let html = '';
    musicTracks.forEach(track => {
        html += `
            <div class="box" data-src="${track.src}">
                <div class="image">
                    <div class="play">
                        <i class="fas fa-play"></i>
                    </div>
                    <img src="${track.albumImage}" alt="">
                </div>
                <div class="content">
                    <h3>${track.name}</h3>
                </div>
                <button class="delete-button">Delete</button>
            </div>
        `;
    });
    boxContainer.innerHTML = html;
}


populateBoxContainer();



boxContainer.addEventListener('click', function(event) {
    let targetBox = event.target.closest('.box');
    if (targetBox) {
        let src = targetBox.getAttribute('data-src');
        let text = targetBox.querySelector('.content h3').innerText;
        closePlayer.classList.add('fa-times');
        musicPlayer.classList.add('active');
        boxContainer.classList.add('active');
        musicPlayer.querySelector('h3').innerText = text;
        musicPlayer.querySelector('audio').src = src;
        musicPlayer.querySelector('audio').play();
    }
});


closePlayer.onclick = toggleMusicPlayer;

// Add Your Own Music functionality
document.getElementById('addMusicButton').addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        const audioRecorder = new MediaRecorder(stream);
        
        // Start recording audio
        audioRecorder.start();

        // Event listener for when audio recording is finished
        audioRecorder.addEventListener('dataavailable', async (event) => {
            const audioBlob = event.data;
            // Save or upload the audioBlob
        });

        // Access webcam and display feed
        const videoElement = document.createElement('video');
        document.body.appendChild(videoElement);
        videoElement.srcObject = stream;
        videoElement.play();

        // Capture picture from webcam
        const canvasElement = document.createElement('canvas');
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        const canvasContext = canvasElement.getContext('2d');
        canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        const imageBlob = await new Promise((resolve) => canvasElement.toBlob(resolve, 'image/png'));
        
        // Save or upload the imageBlob

        // Clean up
        stream.getTracks().forEach(track => track.stop());
        document.body.removeChild(videoElement);
        
        // Toggle music player visibility after adding music
        toggleMusicPlayer();
    } catch (error) {
        console.error('Error accessing microphone or webcam:', error);
    }
});

// Delete Song functionality
document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function() {
        const box = this.closest('.box');
        box.remove();
    });
});



