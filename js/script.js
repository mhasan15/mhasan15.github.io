// Smooth Scrolling for Navbar Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Modal Functionality for Projects
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');

function openModal(project) {
    modal.style.display = 'block';
    
    if (project === 'hostel') {
        modalTitle.innerText = 'Hostel Management System';
        modalDescription.innerText = 'Manage hostel rooms and tenants efficiently.';
    } else if (project === 'survey') {
        modalTitle.innerText = 'Survey Website';
        modalDescription.innerText = 'A real-time survey platform with analytics.';
    } else if (project === 'compiler') {
        modalTitle.innerText = 'Compiler Construction Application';
        modalDescription.innerText = 'A tool for constructing compilers.';
    }
}

function closeModal() {
    modal.style.display = 'none';
}

// Close Modal on clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
