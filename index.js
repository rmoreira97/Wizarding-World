const galleryDiv = document.getElementById("student-gallery");
const detailsContainer = document.getElementById("student-details-container");
const studentName = document.getElementById("student-name");
const studentGender = document.getElementById("student-gender");
const studentHouse = document.getElementById("student-house");
const studentDateOfBirth = document.getElementById("student-dateofbirth");
const pics = document.querySelector("#student-pic");
const form = document.querySelector("#new-form");
const newName = document.querySelector("#name");
const newGender = document.querySelector("#gender");
const newHouse = document.querySelector("#house");
const newDob = document.querySelector("#dob");
const newImage = document.querySelector("#image-input");

// function for confetti animation and colors
const jsConfetti = new JSConfetti();

function triggerConfetti() {
  jsConfetti.addConfetti({
    confettiColors: getConfettiColors(newHouse.value), // Get the confetti colors based on the house
  });
}

// Function to get the confetti colors based on the house
// uses a switch statement to determine the house and
// returns the colors for that house

function getConfettiColors(house) {
  switch (house.toLowerCase()) {
    case "gryffindor":
      console.log("Selected house: Gryffindor");
      return ["#FF0000", "#FFD700"]; // Red and Gold
    case "slytherin":
      console.log("Selected house: Slytherin");
      return ["#228B22", "#000000"]; // Green and Black
    case "hufflepuff":
      console.log("Selected house: Hufflepuff");
      return ["#0000FF", "#FFD700"]; // Blue and Gold
    case "ravenclaw":
      console.log("Selected house: Ravenclaw");
      return ["#0000FF", "#000000"]; // Blue and Black
    default:
      console.log("Selected house: Default");
      return ["#FFFFFF", "#FFFFFF"]; // Default to white
  }
}

// fetches the data from the API

fetch("http://localhost:3000/characters")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((student) => {
      const studentImage = document.createElement("img");
      studentImage.src = student.image;
      studentImage.id = "sImage";
      galleryDiv.appendChild(studentImage);

      studentImage.addEventListener("click", (e) => {
        addStudents(student);
      });
    });
    addStudents(data[0]);
  });

function addStudents(student) {
  pics.src = student.image;
  studentName.textContent = student.name;
  studentGender.textContent = student.gender;
  studentHouse.textContent = student.house;
  studentDateOfBirth.textContent = student.dateOfBirth;
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent reload

  if (
    // prevent user from leaving form blank
    newName.value.trim() === "" ||
    newGender.value.trim() === "" ||
    newHouse.value.trim() === "" ||
    newDob.value.trim() === "" ||
    newImage.value.trim() === ""
  ) {
    alert("Please fill out all fields before adding a new student.");
    return;
  }

  // create new image element and append to gallery

  const imgTwo = document.createElement("img");
  imgTwo.src = newImage.value;
  imgTwo.id = "sImage";
  galleryDiv.append(imgTwo);

  imgTwo.addEventListener("click", (e) => {
    addStudents(newStudent);
  });

  const newStudent = {};
  newStudent["name"] = newName.value;
  newStudent["gender"] = newGender.value;
  newStudent["house"] = newHouse.value;
  newStudent["dateOfBirth"] = newDob.value;
  newStudent["image"] = newImage.value;

  addStudents(newStudent);

  // Trigger the confetti animation with the selected house color
  triggerConfetti();
});

// Function to capitalize words
function capitalizeWords(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Get references to the iframe and the "house" input field
const wheelIframe = document.getElementById("wheel-iframe");
const houseInput = document.getElementById("house");

window.addEventListener("message", (event) => {
  // Check if the message is from the Wheel Decide iframe
  if (event.source === wheelIframe.contentWindow) {
    console.log("Received data:", event.data);

    // Extract and display the selected value
    const selectedValue = event.data.split("-")[1].trim().toLowerCase();
    console.log("Extracted value:", selectedValue);

    // Capitalize the selected value and set it in the "house" input field
    houseInput.value = capitalizeWords(selectedValue);
  }
});

function triggerConfetti() {
  jsConfetti.addConfetti({
    confettiColors: getConfettiColors(newHouse.value), // Get the confetti colors based on the house
  });
}

// Clear the form
form.reset();

// Completed code
