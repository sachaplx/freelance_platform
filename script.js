//This will load on page load
document.addEventListener('DOMContentLoaded', function () {
    // Select all cards
    const cards = document.querySelectorAll('.card');

    // Function to close all cards except the clicked one
    function closeOtherCards(exceptCard) {
        cards.forEach(card => {
            if (card !== exceptCard) {
                card.classList.remove('flipped');
                card.style.height = "200px"; // Default height of card
                const formContainer = card.querySelector('.form-container');
                if (formContainer) {
                    formContainer.style.opacity = '0'; // Hide form
                }
            }
        });
    } 
        
    // Function to adjust card height
    function adjustCardHeight(card) {
        const form = card.querySelector('form');
        if (form) {
            setTimeout(() => {
                const formHeight = form.scrollHeight + 40;
                card.style.height = `${formHeight}px`;
            }, 500);
        } else {
            card.style.height = "200px";
        }
    }
    
    // Function to adjust from elements
    function adjustFormWidth(card) {
        const form = card.querySelector('.form-content');
        if (form) {
            const cardBackWidth = card.querySelector('.card-back').offsetWidth;
            form.style.width = `${cardBackWidth}px`;
        }
    }
        
    cards.forEach(card => {
        card.addEventListener('click', function (event) {
            if (event.target.closest('form')) {
                event.stopPropagation();
                return;
            }

            const isFlipped = card.classList.contains('flipped');

            closeOtherCards(card);

            if(!isFlipped) {
                card.classList.add('flipped');

                const formContainer = card.querySelector('.form-container');

                if (formContainer) {
                    formContainer.style.opacity = '1';
                }

                adjustFormWidth(card);

                adjustCardHeight(card);
            }
        });
    });    
});
