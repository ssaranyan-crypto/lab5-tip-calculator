const form = document.getElementById("tipForm");

const billTotal = document.getElementById("billTotal");
const billWithTax = document.getElementById("billWithTax");
const currency = document.getElementById("currency");
const tipRange = document.getElementById("tipRange");
const tipPercentage = document.getElementById("tipPercentage");
const tipAmount = document.getElementById("tipAmount");
const billWithTip = document.getElementById("billWithTip");
const billWithTipAndTax = document.getElementById("billWithTipAndTax");
const taxExempt = document.getElementById("taxExempt");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("input", calculate);

function calculate() {
  let bill = parseFloat(billTotal.value);

  if (billTotal.value.trim() === "") {
    reset();
    errorMessage.textContent = "";
    return;
  }

  if (isNaN(bill) || bill < 0) {
    errorMessage.textContent = "Enter a valid positive number";
    reset();
    return;
  }

  errorMessage.textContent = "";

  let tipPercent = parseFloat(tipRange.value);
  tipPercentage.value = tipPercent + "%";

  let tip = bill * (tipPercent / 100);

  let tax = taxExempt.checked ? 0 : bill * 0.11;

  let totalWithTax = bill + tax;
  let totalWithTip = bill + tip;
  let finalTotal = bill + tip + tax;

  // Currency conversion
  let rate = 1;
  if (currency.value === "EUR") rate = 0.95;
  if (currency.value === "INR") rate = 85;

  tipAmount.value = (tip * rate).toFixed(2);
  billWithTax.value = (totalWithTax * rate).toFixed(2);
  billWithTip.value = (totalWithTip * rate).toFixed(2);
  billWithTipAndTax.value = (finalTotal * rate).toFixed(2);
}

function reset() {
  tipPercentage.value = "";
  tipAmount.value = "";
  billWithTax.value = "";
  billWithTip.value = "";
  billWithTipAndTax.value = "";
}