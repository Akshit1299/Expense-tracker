let expenses = [];
let budget = 0;

const ctx = document.getElementById("chart").getContext("2d");

const chart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  }
});

function getColors(n) {
  const colors = [
    "#3b82f6","#ef4444","#22c55e",
    "#f59e0b","#a855f7","#06b6d4","#84cc16"
  ];
  return colors.slice(0, n);
}

document.getElementById("budget").addEventListener("change", function () {
  budget = +this.value;
  update();
});

function addExpense() {
  const name = document.getElementById("name").value;
  const amount = +document.getElementById("amount").value;

  if (!name || !amount) return;

  expenses.push({ name, amount });

  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";

  update();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  update();
}

function update() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let total = 0;

  expenses.forEach((e, i) => {
    total += e.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${e.name} ₹${e.amount}
      <button class="delete" onclick="deleteExpense(${i})">X</button>
    `;
    list.appendChild(li);
  });

  document.getElementById("budgetValue").innerText = budget;
  document.getElementById("totalBudget").innerText = budget;
  document.getElementById("left").innerText = budget - total;

  chart.data.labels = expenses.map(e => e.name);
  chart.data.datasets[0].data = expenses.map(e => e.amount);
  chart.data.datasets[0].backgroundColor = getColors(expenses.length);

  chart.update();
}