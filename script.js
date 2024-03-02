const cardNumber = document.querySelector(".card-number");
const cardholderName = document.querySelector(".cardholder-name");
const expDate = document.querySelector(".exp-date");
const cvc = document.querySelector(".cvc");
const form = document.querySelector(".form");
const submit = document.querySelector(".submit");

const cardholderInput = document.getElementById("cardholder");
const numberInput = document.getElementById("number");
const monthInput = document.querySelector(".month");
const yearInput = document.querySelector(".year");
const cvcInput = document.getElementById("cvc-numbers");

const button = document.querySelector(".confirm-button");

const inputs = [
  document.getElementById("cardholder"),
  document.getElementById("number"),
  document.querySelector(".month"),
  document.querySelector(".year"),
  document.getElementById("cvc-numbers"),
];

cardholderInput.addEventListener("input", () => {
  cardholderName.textContent = cardholderInput.value;
});

numberInput.addEventListener("input", () => {
  if (numberInput.value.length > 16) {
    numberInput.value = numberInput.value.slice(0, 16);
  }
  // Check if the input value contains any non-digit characters
  if (/\D/.test(numberInput.value)) {
    // If it does, change the border of the input to red and make the p tag visible
    numberInput.style.border = "1px solid red";
    numberInput.nextElementSibling.style.visibility = "visible";
  } else {
    // If it doesn't, remove the red border from the input and hide the p tag
    numberInput.style.border = "";
    numberInput.nextElementSibling.style.visibility = "hidden";
  }
  cardNumber.textContent = formatCardNumber(numberInput.value);
});

function formatCardNumber(number) {
  return number.replace(/(\d{4})(?=\d)/g, "$& ");
}

monthInput.addEventListener("input", updateExpDate);
yearInput.addEventListener("input", updateExpDate);

cvcInput.addEventListener("input", function () {
  if (cvcInput.value.length > 3) {
    cvcInput.value = cvcInput.value.slice(0, 3);
  }
  cvc.textContent = cvcInput.value;
});

function updateExpDate() {
  if (monthInput.value.length > 2 || yearInput.value.length) {
    monthInput.value = monthInput.value.slice(0, 2);
    yearInput.value = yearInput.value.slice(0, 2);
  }
  const month = monthInput.value.padStart(2, "0");
  const year = yearInput.value.slice(-2);
  expDate.textContent = `${month}/${year}`;
}

inputs.forEach((input) => {
  input.addEventListener("blur", () => {
    if (input.classList.contains("month") || input.classList.contains("year")) {
      if (monthInput.value === "" || yearInput.value === "") {
        input.parentElement.querySelector("p").style.visibility = "visible";
        input.style.border = "1px solid red";
      } else {
        input.parentElement.querySelector("p").style.visibility = "hidden";
        input.style.border = "1px solid gray";
      }
    } else {
      if (input.value === "") {
        input.nextElementSibling.style.visibility = "visible";
        input.style.border = "1px solid red";
      } else {
        input.nextElementSibling.style.visibility = "hidden";
        input.style.border = "1px solid gray";
      }
    }
  });
});

button.addEventListener("click", (event) => {
  event.preventDefault();
  const isValid = inputs.every(
    (input) => input.value !== "" && input.style.border !== "1px solid red"
  );
  if (isValid) {
    form.style.display = "none";
    submit.style.display = "flex";
  } else {
    button.disabled = true;
    alert("Please fill in all the inputs properly.");
    button.disabled = false;
  }
});
