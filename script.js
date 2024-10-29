const videoContainer = document.getElementById('video-container');
const slides = Array.from(document.querySelectorAll('.video-slide'));
let currentIndex = 0;

// Show the current slide and manage video playback
function showSlide(index) {
    slides.forEach((slide, idx) => {
        const video = slide.querySelector('video');
        if (idx === index) {
            video.play().catch(error => {
                console.error("Playback error:", error);
            });
            slide.style.transform = `translateY(0)`; // Move the current slide into view
        } else {
            video.pause();
            slide.style.transform = `translateY(${(idx - index) * 100}%)`; // Position other slides out of view
        }
    });
}

// Function to handle video end event
function handleVideoEnd() {
    currentIndex = (currentIndex + 1) % slides.length; // Move to the next index
    showSlide(currentIndex); // Show the next slide
}

// Add event listeners to each video for the 'ended' event
slides.forEach((slide) => {
    const video = slide.querySelector('video');
    video.addEventListener('ended', handleVideoEnd); // Call handleVideoEnd when the video ends
});

// Swipe navigation for videos
let startY = 0;
let endY = 0;

videoContainer.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
});

videoContainer.addEventListener('touchend', (event) => {
    endY = event.changedTouches[0].clientY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;

    if (startY - endY > swipeThreshold) {
        currentIndex = (currentIndex + 1) % slides.length; // Swipe up
    } else if (endY - startY > swipeThreshold) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Swipe down
    }

    showSlide(currentIndex);
}

// Show the first slide initially
showSlide(currentIndex);
