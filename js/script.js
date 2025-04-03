//This will load on page load
document.addEventListener("DOMContentLoaded", function () {
  // Load elements
  const cards = document.querySelectorAll(".card");
  const forms = document.querySelectorAll(".form-content");
  const freelanceForm = document.getElementById("freelanceForm");
  // GET request to fetch all missions in JSON
  fetch("http://localhost:2777/missions")
    .then((response) => response.json())
    .then((data) => {
      populateMissions(data);
      selectMissions(data);
    })
    .catch((error) => console.error("Error loading JSON:", error));

  // Function to handle card flip
  function flipCard(card) {
    const formContainer = card.querySelector(".form-container");
    const formContent = card.querySelector(".form-content");

    card.classList.toggle("flipped");

    // Toggle form visibility based on flipped state
    if (formContainer) {
      setTimeout(() => {
        formContainer.style.opacity = "1";
        formContent.style.display = "flex";
      }, 300);
    }

    adjustCardHeight(card);
    adjustFormWidth(card);
  }

  // Function to fill forms Missions
  function selectMissions(missions) {
    const missionIDs = document.getElementById("missionID");
    missionIDs.innerHTML = "";

    missions.forEach((mission) => {
      const id = document.createElement("option");
      id.value = mission.id;
      id.innerHTML = `<strong>${mission.id}. </strong>` + mission.title;
      missionIDs.appendChild(id);
    });
  }

  // Function to adjust card height dynamically
  function adjustCardHeight(card) {
    const formContent = card.querySelector(".form-content");
    const cardBackMissions = card.querySelector("#cardBackMissions");

    // Adjust FORM cards
    if (card.classList.contains("flipped") && formContent) {
      const formHeight = formContent.offsetHeight;
      const cardHeight = card.offsetHeight;

      if (formHeight > cardHeight) {
        card.style.height = `${formHeight + cardHeight / 2}px`;
      }
    } else {
      card.style.height = "";
    }

    // Adjust Missions card
    if (card.classList.contains("flipped") && cardBackMissions) {
      const cardBackHeight = cardBackMissions.offsetHeight;
      const cardHeight = card.offsetHeight;

      if (cardBackHeight > cardHeight) {
        card.style.height = `${cardBackHeight}px`;
      }
    }
  }

  // Function to adjust form elements to fit the size of the card
  function adjustFormWidth(card) {
    const form = card.querySelector(".form-content");
    if (form) {
      const cardBackWidth = card.querySelector(".card-back").offsetWidth;
      form.style.width = `${cardBackWidth}px`;
    }
  }

  // Show missions on the back of the Missions card
  function populateMissions(data) {
    const cardBackMissions = document.querySelector("#cardBackMissions"); // Get the back of the "missions" card

    // Clear any existing content in the back of the card to start fresh
    cardBackMissions.innerHTML = "";

    // Create a title for the list of missions
    const title = document.createElement("h3");
    title.textContent = "Liste des missions disponibles";
    cardBackMissions.appendChild(title);

    // Create a list to display all the mission data
    const missionList = document.createElement("ul");

    // Loop through the data and create a list item for each mission
    data.forEach((mission) => {
      const missionItem = document.createElement("li");
      missionItem.innerHTML = `<strong>${mission.id}</strong>: ${mission.title} <br>Compétences requises: ${mission.skills}<br><br>`;
      missionList.appendChild(missionItem);
    });

    // Append the list to the back of the "missions" card
    cardBackMissions.appendChild(missionList);
    adjustCardHeight(cardBackMissions);
  }

  // Load candidatures on back of the dashboard card
  function loadCandidatures() {
    const cardBackDashboard = document.querySelector("#cardBackDashboard");

    // Same logic as populateMissions() function
    cardBackDashboard.innerHTML = "";

    const title = document.createElement("h3");
    title.innerHTML = `Dashboard<br><br>`;
    cardBackDashboard.appendChild(title);

    const dashboardList = document.createElement("ul");

    // GET request to fetch candidatures from JSON
    fetch("http://localhost:2777/candidatures")
      .then((response) => response.json())
      .then((candidatures) => {
        // Loop through the data and create a list item for each mission
        candidatures.forEach((candidature) => {
          const dashboardItem = document.createElement("li");
          dashboardItem.innerHTML = `<strong>${candidature.name}</strong>`;

          // GET request to fetch mission data based on missionID from candidature
          fetch(`http://localhost:2777/missions/${candidature.missionID}`)
            .then((response) => response.json())
            .then((mission) => {
              // Create a list with Name and title of mission and a delete button
              const missionData = document.createElement("li");
              missionData.innerHTML = `${mission.title}`;
              dashboardList.appendChild(dashboardItem);
              dashboardList.appendChild(missionData);
              const delLign = document.createElement("li");
              const delButton = document.createElement("button");
              delButton.textContent = "Supprimer";
              // Prevent the click from flipping the card instead of clicking the button
              delButton.addEventListener('click', function(event) {
                event.stopPropagation();
                deleteCandidature(candidature.id);
              });
              delLign.appendChild(delButton);
              dashboardList.appendChild(delLign);
              const carriageReturn = document.createElement("li");
              carriageReturn.innerHTML = "<br><br>";
              dashboardList.appendChild(carriageReturn);
            }).catch(error => console.error('Error loading mission data:', error));

        });
      }).catch(error => console.error('Error loading candidatures:', error));

      cardBackDashboard.appendChild(dashboardList);
      adjustCardHeight(cardBackDashboard);
  }

  // DELETE request to remove candidature in JSON
  function deleteCandidature(id) {
    fetch(`http://localhost:2777/candidatures/${id}`, {
        method: 'DELETE',
    }).then(() => {
      alert("Candidature supprimée");
      loadCandidatures();
      window.location.reload();
    }).catch(error => console.error("Erreur lors de la suppression:", error));
  }

  // Adding eventListener to submit candidature
  freelanceForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const missionID = document.querySelector("#missionID").value;

    const candidature = {
      name: name,
      email: email,
      missionID: missionID,
    };

    // POST request to write data in JSON
    if (candidature.missionID) {
      fetch("http://localhost:2777/candidatures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(candidature),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          alert("Votre candidature a bien été enregistrée!");
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error:", error);
          alert(
            "Il y a eu une erreur lors de l'enregistrement de votre candidature."
          );
        });
    }
  });

  // Loop to prevent clicking near the form flipping the card
  cards.forEach((card) => {
    card.addEventListener("click", function (event) {
      if (!event.target.closest(".form-content")) {
        flipCard(card);
      }
    });
  });

  // Making the design responsive
  window.addEventListener("resize", function () {
    cards.forEach((card) => {
      adjustCardHeight(card);
      adjustFormWidth(card);
    });
  });
  loadCandidatures();
});
