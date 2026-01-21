// Function to display the popup
function showPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.style.display = 'flex';
    }
}

// Function to close the popup
function closePopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

// Wait for DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm') || document.querySelector('.contact-form');
    
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }

    // Event Listener for the form submission
    contactForm.addEventListener('submit', function(event) {
        // 1. Prevent the default form submission (which causes a page reload/redirect)
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const actionUrl = form.action;

        // Show loading state
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton ? submitButton.textContent : '';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'שולח...';
        }

        // 2. Send the form data using the Fetch API (AJAX)
        fetch(actionUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json' // Essential header for FormSubmit AJAX
            }
        })
        .then(response => {
            if (response.ok) {
                // 3. If submission is successful, show the custom popup
                showPopup();
                form.reset(); // Clear the form fields if needed
            } else {
                // Handle errors (e.g., show an error message)
                alert('אירעה שגיאה בעת שליחת הטופס. אנא נסה שוב.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('שגיאת רשת. אנא ודא שאתה מחובר לאינטרנט.');
        })
        .finally(() => {
            // Reset button state
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    });
});
