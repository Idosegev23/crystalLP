
function integrateToMondayAndThanksPage(formData) {
    fetch('https://hook.eu2.make.com/susxntb72mb2lkc42id7my9x0x6smml9', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        window.location.href = 'thanks.html';
      
    })
    

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

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const actionUrl = form.action;
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton ? submitButton.textContent : '';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'שולח...';
        }

        fetch(actionUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json' 
            }
        })
        .then(response => {
            if (response.ok) {
                integrateToMondayAndThanksPage(formData);
            } else {
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
