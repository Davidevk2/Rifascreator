let crossOutNumbers = [];
const btnCrossNumber = document.getElementById("btn-cross-number");

btnCrossNumber.addEventListener("click", function () {
  let number = parseInt(prompt("Ingrese el numero que quiere tachar: "));
  if (isNaN(number) || number < 0 || number > 100) {
    alert("Ingrese un número entre N y N");
    return;
  }
  if (crossOutNumbers.includes(number)) {
    alert("El numero ya se encuentra tachado");
    return;
  }

  if (confirm(`Seguro que quieres tachar el numero ${number}`)) {
    const td = document.querySelectorAll(`td`);

    td.forEach((item) => {
      if (parseInt(item.textContent) === number) {
        item.classList.add("selected");
      }
    });

    // td.classList.add("selected");
    crossOutNumbers.push(number);

    // Guardar en local storage
    localStorage.setItem("crossOutNumbers", JSON.stringify(crossOutNumbers));
    // refreshCrossOutNumbers();
  }
});
document.addEventListener("DOMContentLoaded", function () {
  refreshCrossOutNumbers();
  const form = document.querySelector("form");
  const tableContainer = document.querySelector(".wrap-table");
  const mainContainer = document.querySelectorAll(".wrap-info");

//   mainContainer.forEach((div) => {
//     div.contentEditable = "true";
//   });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const totalNumbers = parseInt(
      document.querySelector(
        "input[placeholder='cantidad de numeros a generar']"
      ).value,
      10
    );

    if (isNaN(totalNumbers) || totalNumbers <= 0) {
      alert("Ingrese un número válido");
      return;
    }

    // generateTable(totalNumbers);
});
generateTable(100);

  function generateTable(n) {
    tableContainer.innerHTML = "";

    const columns = Math.ceil(Math.sqrt(n));
    const rows = Math.ceil(n / columns);

    const table = document.createElement("table");
    for (let r = 0; r < rows; r++) {
      const tr = document.createElement("tr");
      for (let c = 0; c < columns; c++) {
        const index = r * columns + c;
        const td = document.createElement("td");
        crossOutNumbers.includes(index)
          ? td.classList.add("selected")
          : td.classList.remove("selected");
        if (index < n) {
          td.textContent = index < 10 ? "0" + index : index;
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    tableContainer.appendChild(table);
  }
});

refreshCrossOutNumbers = () => {
  const storedCrossOutNumbers = JSON.parse(
    localStorage.getItem("crossOutNumbers")
  );
  if (storedCrossOutNumbers) {
    crossOutNumbers = storedCrossOutNumbers;
  }
};
