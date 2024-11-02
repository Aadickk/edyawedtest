// Set the date for the wedding
const weddingDate = new Date("December 14, 2024 18:00:00").getTime();

// Update the countdown every second
const countdown = setInterval(function() {
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display the result in the appropriate elements
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    // If the countdown is over, display a message
    if (timeLeft < 0) {
        clearInterval(countdown);
        document.getElementById("countdown-timer").innerHTML = "<p>The big day has arrived!</p>";
    }
}, 1000);

// RSVP Form Script for Conditional Display
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('rsvpForm');
    form.addEventListener('change', function() {
        const pairOption = document.querySelector('input[name="attendance"][value="comingWithPair"]');
        const pairNameField = document.getElementById('pairNameField');

        if (pairOption.checked) {
            pairNameField.style.display = 'block'; // Show the name input field
        } else {
            pairNameField.style.display = 'none'; // Hide the name input field
        }
    });
});

// Intersection Observer for fade-in-up animations
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after the animation
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    // Apply the observer to all elements with the fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });
} else {
    console.warn('Intersection Observer API not supported in this browser');
}


// Show pair name field conditionally based on attendance choice
const attendanceOptions = document.querySelectorAll('input[name="attendance"]');
attendanceOptions.forEach(option => {
    option.addEventListener('change', function () {
        const pairNameField = document.getElementById('pairNameField');
        if (this.value === 'comingWithPair') {
            pairNameField.style.display = 'block';
        } else {
            pairNameField.style.display = 'none';
        }
    });
});

const scriptURL = 'https://script.google.com/macros/s/AKfycbyw20o12sP2a9fG6NYFnNxb24d0Ok4A0bmb_g9sJGTScXEYmpdjtVsQYrmv3GqwueMP3g/exec'


const form = document.forms['rsvpForm']


form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Жауабыңызға рахмет!" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');

    audio.play().catch(error => {
        console.error('Ошибка воспроизведения:', error);
    });
});
const playButton = document.getElementById('playButton');
    const audio = document.getElementById('audio');

    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                playButton.innerHTML = '&#10074;&#10074;'; // Символ паузы
            }).catch(error => {
                console.error('Ошибка воспроизведения:', error);
                playButton.innerHTML = '&#9658;'; // Возвращаем символ Play
            });
        } else {
            audio.pause();
            playButton.innerHTML = '&#9658;'; // Символ Play
        }
    });

    audio.addEventListener('ended', () => {
        playButton.innerHTML = '&#9658;'; // Возвращаем символ Play по окончании музыки
    });