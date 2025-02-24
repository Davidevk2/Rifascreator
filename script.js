let crossOutNumbers = [];
const btnCrossNumber = document.getElementById("btn-cross-number");
const btnEnableNumber = document.getElementById("btn-enable-number");
const btnRebootTable = document.getElementById("btn-reboot-table");
const textTotalAvailable = document.getElementById("total-available");
const textTotalSold = document.getElementById("total-sold");

btnEnableNumber.addEventListener("click", function () {
  let number = parseInt(prompt("Ingrese el número que quiere hababilitar: "));
  if (isNaN(number) || number < 0 || number > 100) {
    alert("Ingrese un número entre 0 y 100");
    return;
  }

  if (!crossOutNumbers.includes(number)) {
    alert(`El número ${number} no está tachado`);
    return;
  }

  if (confirm(`Seguro que deseas habilitar el número ${number} ?`)) {
     const td = document.querySelector(`td[data-number="${number}"]`);

     if (td) {
       td.classList.remove("selected");
     }

    let indexNumber = crossOutNumbers.indexOf(number);
    if (indexNumber > -1) {
      crossOutNumbers.splice(indexNumber, 1);
    }

    // Guardar en local storage
    setCrossOutNumbers(crossOutNumbers);
  }
});

btnCrossNumber.addEventListener("click", function () {
  let number = parseInt(prompt("Ingrese el número que quiere tachar: "));
  if (isNaN(number) || number < 0 || number > 100) {
    alert("Ingrese un número entre 0 y 100");
    return;
  }
  if (crossOutNumbers.includes(number)) {
    alert("El número ya se encuentra tachado");
    return;
  }

  if (confirm(`Seguro que quieres tachar el número ${number} ?`)) {
    const td = document.querySelector(`td[data-number="${number}"]`);

    if(td){
      td.classList.add("selected");
    }

    crossOutNumbers.push(number);

    // Guardar en local storage
    setCrossOutNumbers(crossOutNumbers);
  }
});

btnRebootTable.addEventListener("click", function () {
  if (confirm("Seguro que deseas reiniciar la tabla y limpiar los tachados?")) {
    const td = document.querySelectorAll(`td`);
    td.forEach((item) => {
      item.classList.remove("selected");
    });
    crossOutNumbers = [];
    // Guardar en local storage
    setCrossOutNumbers(crossOutNumbers);
    setTotalNumbers();
  }
});
document.addEventListener("DOMContentLoaded", function () {
  refreshCrossOutNumbers();
  setTotalNumbers();
  const form = document.querySelector("form");
  const tableContainer = document.querySelector(".wrap-table");
  const mainContainer = document.querySelectorAll(".wrap-info");

  mainContainer.forEach((div) => {
    div.contentEditable = "false";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const totalNumbers = parseInt(
      document.querySelector(
        "input[placeholder='cantidad de números a generar']"
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
          td.setAttribute("data-number", index);
          td.textContent = index < 10 ? "0" + index : index;
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  
    tableContainer.appendChild(table);
  }
});

const refreshCrossOutNumbers = () => {
  const storedCrossOutNumbers = JSON.parse(localStorage.getItem("crossOutNumbers"));

  crossOutNumbers = storedCrossOutNumbers || [];

  // if (storedCrossOutNumbers) {
  //   crossOutNumbers = storedCrossOutNumbers;
  // }
  // setTotalNumbers();
};

const setCrossOutNumbers = (numbers) => {
  localStorage.setItem("crossOutNumbers", JSON.stringify(numbers));
  setTotalNumbers();
};


const setTotalNumbers =()=>{
  let totalCrossedOutNumber =crossOutNumbers.length;
  let totalAvailableNumbers = 100 - totalCrossedOutNumber;

  textTotalAvailable.innerText = totalAvailableNumbers;
  textTotalSold.innerText = totalCrossedOutNumber;
}