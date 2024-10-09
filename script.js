// Smooth Scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark Mode Toggle
const toggle = document.createElement('button');
toggle.textContent = 'Dark Mode';
document.body.appendChild(toggle);

toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

document.body.classList.add('light-mode'); // Initial mode
