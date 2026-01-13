const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const listEl = document.getElementById("list");
const form = document.getElementById("transaction-form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
  listEl.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.classList.add(t.type);

    li.innerHTML = `
      ${t.text} <span>PKR ${t.amount}</span>
      <button class="delete-btn" onclick="removeTransaction(${index})">✖</button>
    `;

    listEl.appendChild(li);

    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  balanceEl.innerText = `PKR ${income - expense}`;
  incomeEl.innerText = `PKR ${income}`;
  expenseEl.innerText = `PKR ${expense}`;

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    text: textInput.value,
    amount: +amountInput.value,
    type: typeInput.value
  };

  transactions.push(transaction);
  updateUI();

  textInput.value = "";
  amountInput.value = "";
}

function removeTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

form.addEventListener("submit", addTransaction);

updateUI();
