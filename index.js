// Function to fetch data from an API and populate the content for Harry Potter students
function fetchStudentsAndPopulateContent() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "Loading...";

  fetch("https://hp-api.onrender.com/api/characters/students")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      contentDiv.innerHTML = ""; // Clear the loading message
      // Loop through the student data and create elements for each student
      data.forEach(student => {
        const studentDiv = document.createElement("div");
        studentDiv.className = "student";
        const studentDetailsDiv = document.createElement("div"); // Container for student details
        studentDetailsDiv.style.display = "none"; // Initially hide details
        studentDiv.innerHTML = `
            <h2>${student.name || 'Name not available'}</h2>
        `;

        // Create an image container and set the CSS class
        const imageContainer = document.createElement("div");
        imageContainer.className = "student-image-container";

        // Create the image element and set the src attribute
        const studentImage = document.createElement("img");
        studentImage.src = student.image || 'path_to_default_image.jpg'; // Use a default image for missing URLs
        studentImage.alt = "Student Image";

        // Append the image to the image container
        imageContainer.appendChild(studentImage);

        // Append the image container to the student div
        studentDiv.appendChild(imageContainer);

        // Add click event to show/hide details
        studentDiv.addEventListener("click", () => {
          if (studentDetailsDiv.style.display === "none") {
            studentDetailsDiv.style.display = "block"; // Show details
          } else {
            studentDetailsDiv.style.display = "none"; // Hide details
          }
        });

        // Append student details container to student div
        studentDiv.appendChild(studentDetailsDiv);

        contentDiv.appendChild(studentDiv);

        // Create student details
        const studentDetails = document.createElement("div");
        studentDetails.className = "student-details";
        studentDetails.innerHTML = `
            <p>House: ${student.house || 'House not available'}</p>
            <p>Patronus: ${student.patronus || 'Patronus not available'}</p>
            <p>Species: ${student.species || 'Species not available'}</p>
            <p>Gender: ${student.gender || 'Gender not available'}</p>
            <p>Date of Birth: ${student.dateOfBirth || 'Date of Birth not available'}</p>
            <p>Wizard: ${student.wizard ? 'Yes' : 'No'}</p>
            <p>Ancestry: ${student.ancestry || 'Ancestry not available'}</p>
            <p>Eye Colour: ${student.eyeColour || 'Eye Colour not available'}</p>
            <p>Hair Colour: ${student.hairColour || 'Hair Colour not available'}</p>
            <p>Wand:</p>
            <ul>
              <li>Wood: ${student.wand.wood || 'Wood not available'}</li>
              <li>Core: ${student.wand.core || 'Core not available'}</li>
              <li>Length: ${student.wand.length || 'Length not available'}</li>
            </ul>
        `;

        // Append student details to the details container
        studentDetailsDiv.appendChild(studentDetails);
      });
    })
    .catch(error => {
      console.error("Error fetching student data:", error);
      contentDiv.innerHTML = "Failed to fetch student data.";
    });
}

// Function to fetch data from an API and populate the content for Harry Potter houses
function fetchHousesAndPopulateContent() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "Loading...";

  fetch("https://wizard-world-api.herokuapp.com/houses")
      .then(response => {
          if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          contentDiv.innerHTML = ""; // Clear the loading message

          // Loop through the house data and create elements for each house
          data.forEach(house => {
              const houseDiv = document.createElement("div");
              houseDiv.className = "house";
              houseDiv.innerHTML = `
                  <h2>${house.name || 'Name not available'}</h2>
                  <p>House Colours: ${house.houseColours || 'House Colours not available'}</p>
                  <p>Founder: ${house.founder || 'Founder not available'}</p>
                  <p>Animal: ${house.animal || 'Animal not available'}</p>
                  <p>Element: ${house.element || 'Element not available'}</p>
                  <p>Ghost: ${house.ghost || 'Ghost not available'}</p>
                  <p>Common Room: ${house.commonRoom || 'Common Room not available'}</p>
                  <p>Head of House: ${house.heads.map(head => `${head.firstName} ${head.lastName}`).join(', ') || 'Head of House not available'}</p>
                  <p>Traits: ${house.traits.map(trait => trait.name).join(', ') || 'Traits not available'}</p>
              `;

              contentDiv.appendChild(houseDiv);
          });
      })
      .catch(error => {
          console.error("Error fetching house data:", error);
          contentDiv.innerHTML = "Failed to fetch house data.";
      });
}

// Event listener for fetching and displaying Harry Potter students
document.getElementById("students").addEventListener("click", () => {
  fetchStudentsAndPopulateContent();
});

// Event listener for fetching and displaying Harry Potter houses
document.getElementById("houses").addEventListener("click", () => {
  fetchHousesAndPopulateContent();
});

// Initial content population (populate with Harry Potter students data by default)
fetchStudentsAndPopulateContent();


