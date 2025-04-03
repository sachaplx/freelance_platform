//This will load on page load
document.addEventListener('DOMContentLoaded', function () {
    // Load elements
    const cards = document.querySelectorAll('.card');
    const cardContainers = document.querySelector('.card-container');
    const forms = document.querySelectorAll('.form-content');
    fetch('/data/missions.json' , {
        method: 'GET'
    }).then(response => response.json()).then(data => {
        console.log(data);
        populateMissions(data);
    }).catch(error => console.error('Error loading JSON:', error));
    
    // Function to handle card flip
    function flipCard(card) {
        const formContainer = card.querySelector('.form-container');
        const formContent = card.querySelector('.form-content');

        card.classList.toggle('flipped');


        // Toggle form visibility based on flipped state
        if (formContainer) {
            setTimeout(() => {
                formContainer.style.opacity = '1';
                formContent.style.display = 'flex';
            }, 300);
        }

        adjustCardHeight(card);
        adjustFormWidth(card);
    }

    // Function to adjust card height dynamically
    function adjustCardHeight(card) {
        const formContent = card.querySelector('.form-content');
        const cardBackMissions = card.querySelector('#cardBackMissions');

        // Adjust FORM cards
        if (card.classList.contains('flipped') && formContent) {
            const formHeight = formContent.offsetHeight;
            const cardHeight = card.offsetHeight;

            if (formHeight > cardHeight) {
                card.style.height = `${formHeight + (cardHeight/2)}px`;
            }
        } else {
            card.style.height= '';
        }

        // Adjust Missions card
        if (card.classList.contains('flipped') && cardBackMissions) {
            const cardBackHeight = cardBackMissions.offsetHeight;
            const cardHeight = card.offsetHeight;

            if(cardBackHeight > cardHeight) {
                card.style.height = `${cardBackHeight}px`
            }
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

    function populateMissions(data) {
        const cardBackMissions = document.querySelector('#cardBackMissions'); // Get the back of the "missions" card

        // Clear any existing content in the back of the card to start fresh
        cardBackMissions.innerHTML = '';
    
        // Create a title for the list of missions
        const title = document.createElement('h3');
        title.textContent = "Liste des missions disponibles";
        cardBackMissions.appendChild(title);
    
        // Create a list to display all the mission data
        const missionList = document.createElement('ul');
    
        // Loop through the data and create a list item for each mission
        data.forEach(mission => {
            const missionItem = document.createElement('li');
            missionItem.innerHTML = `<strong>${mission.id}</strong>: ${mission.title} <br>Compétences requises: ${mission.skills}<br><br>`;
            missionList.appendChild(missionItem);
        });
    
        // Append the list to the back of the "missions" card
        cardBackMissions.appendChild(missionList);
        adjustCardHeight(cardBackMissions);
    }

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.querySelector('#name');
            const email = document.querySelector('#email');
            const missionID = document.querySelector('#missionID');

            const freelanceData = {
                name: name,
                email: email,
                missionID: missionID,
            }

            fetch('data/candidatures.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(freelanceData),
            }).then(response => response.json()).then(data => {
                console.log('Success:', data);
                alert("Votre candidature a bien été enregistrée!");
            }).catch(error => {
                console.log('Error:', error);
                alert("Il y a eu une erreur lors de l'enregistrement de votre candidature.");
            })
        })
    })

    cards.forEach(card => {
        card.addEventListener('click', function (event) {
            if (!event.target.closest('.form-content')) {
                flipCard(card);
            }
        });
    });
    
    window.addEventListener('resize', function () {
        cards.forEach(card => {
            adjustCardHeight(card);
            adjustFormWidth(card);
        })
    })
});
