// First, add EmailJS CDN to your HTML file
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Initialize EmailJS with your public key
(function() {
    emailjs.init("hY7oKvUkvoGPSURXP"); // Replace with your actual EmailJS public key
})();

// Get the form element
const contactForm = document.getElementById('contact-form');
const submitButton = contactForm.querySelector('button[type="submit"]');

// Create toast notification elements
const toastContainer = document.createElement('div');
toastContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    min-width: 250px;
    padding: 15px 20px;
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
`;
document.body.appendChild(toastContainer);

// Show toast notification function
function showToast(message, isError = false) {
    toastContainer.style.backgroundColor = isError ? '#ff4444' : '#00C851';
    toastContainer.style.color = 'white';
    toastContainer.textContent = message;
    toastContainer.style.opacity = '1';
    toastContainer.style.visibility = 'visible';

    setTimeout(() => {
        toastContainer.style.opacity = '0';
        toastContainer.style.visibility = 'hidden';
    }, 3000);
}

// Form submission handler
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Disable submit button and show loading state
    submitButton.disabled = true;
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="btn-caption">Sending...</span><i class="ph-bold ph-spinner-gap"></i>';

    // Get form data
    const formData = {
        from_name: this.name.value,
        reply_to: this.email.value,
        from_email: this.email.value,
        subject: this.subject.value || 'No Subject',
        phone: this.phone.value,
        message: this.message.value,
        to_email: 'mhasan15@gmail.com'
    };

    // Send email using EmailJS
    emailjs.send('service_xgv0jcr', 'template_ud099jv', formData)
        .then(function() {
            showToast('Message sent successfully!');
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('Email sending failed:', error);
            showToast('Error sending message. Please try again.', true);
        })
        .finally(function() {
            // Re-enable submit button and restore original text
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });
});

// Add form validation
function validateForm() {
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }

        // Email validation
        if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }

        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phonePattern = /^\+?[\d\s-]{8,}$/;
            if (!phonePattern.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }   
    });

    return isValid;
}

// Add CSS for validation
const style = document.createElement('style');
style.textContent = `
    .form__item input.error,
    .form__item textarea.error {
        border-color: #ff4444;
    }

    .ph-spinner-gap {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);s