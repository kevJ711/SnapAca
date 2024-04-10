let closePlayer = document.querySelector('#close-player');
let musicPlayer = document.querySelector('.music-player');
let boxContainer = document.querySelector('.container .box-container');

// Event delegation for box clicks
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

// Toggle music player visibility
closePlayer.onclick = () => {
    closePlayer.classList.toggle('fa-times');
    musicPlayer.classList.toggle('active');
    boxContainer.classList.toggle('active');
};
