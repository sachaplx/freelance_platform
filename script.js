//This will load on page load
document.addEventListener('DOMContentLoaded', function () {
    // Load elements
    const cards = document.querySelectorAll('.card');
    const cardContainers = document.querySelector('.card-container');
    const forms = document.querySelectorAll('.form-content');
    
    // Function to handle card flip
    function flipCard(card) {
        const formContainer = document.querySelector('.form-container');
        const formContent = document.querySelector('.form-content');

        card.classList.toggle('flipped');

        // Toggle form visibility based on flipped state
        if (formContainer) {
            setTimeout(() => {
                formContainer.style.opacity = '1';
                formContent.style.display = 'flex';
            }, 300);
        } else {
            formContainer.style.opacity = '0';
            formContent.style.display = 'flex';
        }
        
        adjustCardHeight(card);
        adjustFormWidth(card);
    }

    // Function to adjust card height dynamically
    function adjustCardHeight(card) {
        const formContent = card.querySelector('.form-content');

        if (card.classList.contains('flipped') && formContent) {
            const formHeight = formContent.offsetHeight;
            card.style.height = `${formHeight}px`;
        } else {
            card.style.height= '';
        }
    }
    
    // Function to adjust form elements to fit the size of the card
    function adjustFormWidth(card) {
        const form = card.querySelector('.form-content');
        if (form) {
            const cardBackWidth = card.querySelector('.card-back').offsetWidth;
            form.style.width = `${cardBackWidth}px`;
        }
    }

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

             // Check if there is already a message
            let existingMessage = form.querySelector('.confirmation-message');
            if (existingMessage) {
                existingMessage.remove();
            }

            // Create message box
            const messageBox = document.createElement('div');
            messageBox.classList.add('confirmation-message');
            messageBox.textContent = "Votre message a bien été envoyé !";
        
            // Box style (in case CSS fails to load)
            Object.assign(messageBox.style, {
                color: "green",
                background: "#dff0d8",
                border: "1px solid #3c763d",
                padding: "10px",
                marginTop: "10px",
                borderRadius: "5px",
                fontWeight: "bold",
                transition: "opacity 0.5s ease-in-out",
            });

            // Add message under form
            form.appendChild(messageBox);

            // Dispappear after 3000 ms
            setTimeout(() => {
                messageBox.classList.add('fade-out');
                setTimeout(() => messageBox.remove(), 500);
            }, 3000);
        })
    })
        
    cards.forEach(card => {
        card.addEventListener('click', function () {
            flipCard(card);
        });
    });
    
    window.addEventListener('resize', function () {
        cards.forEach(card => {
            adjustCardHeight(card);
            adjustFormWidth(card);
        })
    })
});
