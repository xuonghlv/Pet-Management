"use strict";
// Selecting elements
const inputID = document.getElementById("input-id");
// inputID.value = 12;
// console.log(inputID.value);
const inputName = document.getElementById("input-name");
const inputAge = document.getElementById("input-age");
const inputType = document.getElementById("input-type");
const inputWeight = document.getElementById("input-weight");
const inputLength = document.getElementById("input-length");
const inputColor = document.getElementById("input-color-1");
const inputBreed = document.getElementById("input-breed");
const vaccinatedLabel = document.getElementById("input-vaccinated");
const dewormedLabel = document.getElementById("input-dewormed");
const sterilizedLabel = document.getElementById("input-sterilized");
const submitBtn = document.getElementById("submit-btn");
const showHealthyBtn = document.getElementById("healthy-btn");
const deleteBtn = document.getElementsByClassName("btn-danger");
const tableBodyEl = document.getElementById("tbody");

const data = [];
const ids = [];
let showHealthy = false;

let date;
let day;
let month;
let year;

function renderTableData(data) {
  const row = document.createElement("tr");
  let i = data.length - 1;
  row.innerHTML = `<th scope="row">${data[i].id}</th>
  <td>${data[i].petName}</td>
  <td>${data[i].age}</td>
  <td>${data[i].type}</td>
  <td>${data[i].weight} kg</td>
  <td>${data[i].petLength} cm</td>
  <td>${data[i].breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${data[i].color}"></i>
  </td>
  <td><i class="bi ${
    data[i].vaccinated === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    data[i].dewormed === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class="bi ${
    data[i].sterilized === true ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td>${data[i].bmi}</td>
  <td>${day}/${month}/${year}</td>
  <td><button id="delete-${i}" type="button" class="btn btn-danger">Delete</button>
  </td>`;
  tableBodyEl.appendChild(row);
  row.classList.add(`row-${i}`);
}

// Check input
submitBtn.addEventListener("click", function () {
  for (let i = 0; i < data.length; i++) {
    ids[i] = data[i].id;
  }
  date = new Date();
  day = date.getDate();
  month = date.getMonth() + 1;
  year = date.getFullYear();

  if (!inputID.value) {
    alert("PLease input for ID");
  } else if (ids.includes(inputID.value)) {
    alert("ID must be unique!");
  } else if (inputAge.value < 1 || inputAge.value > 15) {
    alert("Age must be between 1 and 15!");
  } else if (inputWeight.value < 1 || inputWeight.value > 15) {
    alert("Weight must be between 1 and 15!");
  } else if (inputLength.value < 1 || inputLength.value > 100) {
    alert("Length must be between 1 and 100!");
  } else if (inputType.value === "Select Type") {
    alert("Please select Type!");
  } else if (inputBreed.value === "Select Breed") {
    alert("Please select Breed!");
  } else {
    // calcBMI
    let bmi =
      inputType.value === "Dog"
        ? (inputWeight.value * 703) / inputLength.value ** 2
        : (inputWeight.value * 886) / inputLength.value ** 2;
    // Get value
    const pet = {
      id: inputID.value,
      petName: inputName.value,
      age: inputAge.value,
      type: inputType.value,
      weight: inputWeight.value,
      petLength: inputLength.value,
      color: inputColor.value,
      breed: inputBreed.value,
      vaccinated: vaccinatedLabel.checked,
      dewormed: dewormedLabel.checked,
      sterilized: sterilizedLabel.checked,
      bmi: bmi.toFixed(2),
    };
    console.log("pet: ", pet);
    data.push(pet);
    console.log("data: ", data);

    // reset input value
    inputID.value = "";
    inputName.value = "";
    inputAge.value = "";
    inputType.value = "Select Type";
    inputWeight.value = "";
    inputLength.value = "";
    inputColor.value = "#000000";
    inputBreed.value = "Select Breed";
    vaccinatedLabel.checked = false;
    dewormedLabel.checked = false;
    sterilizedLabel.checked = false;
    // Render new pet to table
    renderTableData(data);
    // Add event for delete Button
    let deleteID = data.length - 1;
    document
      .getElementById(`delete-${deleteID}`)
      .addEventListener("click", function () {
        let delrow = document.querySelector(`.row-${deleteID}`);
        tableBodyEl.removeChild(delrow);
        data.splice(deleteID, 1);
        ids.splice(deleteID, 1);
      });
  }
});

showHealthyBtn.addEventListener("click", function () {
  if (showHealthy === false) {
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].vaccinated === false ||
        data[i].dewormed === false ||
        data[i].sterilized === false
      ) {
        document.querySelector(`.row-${i}`).classList.add("hidden");
        showHealthyBtn.textContent = "Show All Pet";
        showHealthy = true;
      }
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      document.querySelector(`.row-${i}`).classList.remove("hidden");
      showHealthyBtn.textContent = "Show Healthy Pet";
      showHealthy = false;
    }
  }
});
