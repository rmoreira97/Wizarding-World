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

fetch("http://localhost:3000/students")
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
  e.preventDefault();

  const imgTwo = document.createElement("img");
  imgTwo.src = newImage.value;
  imgTwo.id = "imgTwo";
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
});

// Get references to the iframe and the "house" input field
const wheelIframe = document.getElementById("wheel-iframe");
const houseInput = document.getElementById("house");

window.addEventListener("message", (event) => {
  // Check if the message is from the Wheel Decide iframe
  if (event.source === wheelIframe.contentWindow) {
    console.log("Received data:", event.data);
    
    // Extract and display the selected value
    const selectedValue = event.data.split('-')[1];
    console.log("Extracted value:", selectedValue);

    // Set the selected value in the "house" input field
    houseInput.value = selectedValue;
  }
});
  

