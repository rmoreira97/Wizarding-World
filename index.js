// Define the API URL
const apiUrl = "https://wizard-world-api.herokuapp.com/Houses";

// Function to fetch data from the API and append it to the page
function fetchDataAndAppend() {
  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => {
      // Check if the response is ok (i.e., status code is in the 200-299 range)
      if (!response.ok) {
        // If the response is not ok, throw an error
        throw new Error(`Network response was not ok (${response.status})`);
      }
      // If the response is ok, parse the JSON data
      return response.json();
    })
    .then((data) => {
      // Access and process the data as needed
      const houses = data; // Assuming the response contains an array of houses

      // Log the fetched data to the console (for debugging purposes)
      console.log(houses);

      // Get the HTML element where you want to append the data
      const elementToAppend = document.getElementById("houseList"); // Replace with the actual ID

      // Create a navigation bar element
      const navBar = document.createElement("nav");
      navBar.style.display = "flex";
      navBar.style.justifyContent = "space-between";
      elementToAppend.appendChild(navBar);

      // Iterate through the houses and create HTML elements for each
      houses.forEach((house) => {
        // Define variables for house properties that might be undefined
        const headOfHouse = house.heads
          ? house.heads[0].firstName + " " + house.heads[0].lastName
          : "No head of house found";
        const school = house.commonRoom ? house.commonRoom : "No school found";
        const mascot = house.element ? house.element : "No mascot found";

        // Create a new div element for the house
        const houseElement = document.createElement("div");
        houseElement.innerHTML = `
          <h2 class="house-name">${house.name}</h2>
          <div class="house-details" style="display: none;">
            <p>House Founder: ${house.founder}</p>
            <p>House Animal: ${house.animal}</p>
            <p>House Ghost: ${house.ghost}</p>
            <p>House Colors: ${house.houseColours}</p>
            <p>House Head of House: ${headOfHouse}</p>
            <p>House School: ${school}</p>
            <p>House Values: ${house.traits
              .map((trait) => trait.name)
              .join(", ")}</p>
            <p>House Mascot: ${mascot}</p>
          </div>
        `;

        // Append the house element to the navigation bar
        navBar.appendChild(houseElement);
      });

      // Add click event listeners to the house names
      document.querySelectorAll(".house-name").forEach((element) => {
        element.addEventListener("click", (event) => {
          // Get the details element for the clicked house name
          const detailsElement = event.target.nextElementSibling;
          // Toggle the display property of the details element
          if (detailsElement.style.display === "none") {
            detailsElement.style.display = "block";
          } else {
            detailsElement.style.display = "none";
          }
        });
      });
    })
    .catch((error) => {
      // Log any errors that occur during the fetch operation to the console
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Call the function to fetch data from the API and append it to the page
fetchDataAndAppend();
