const btnCrossNumber = document.getElementById("btn-cross-number");
const btnEnableNumber = document.getElementById("btn-enable-number");
const btnRebootTable = document.getElementById("btn-reboot-table");
const textTotalAvailable = document.getElementById("total-available");
const textTotalSold = document.getElementById("total-sold");
const form = document.querySelector("#form");
const tableContainer = document.querySelector(".wrap-table");
const mainContainer = document.querySelectorAll(".wrap-info");

let currentInfo = null;

document.addEventListener("DOMContentLoaded", function () {
  refreshCrossOutNumbers();
  setTotalNumbers();
  setCurrentData();

  mainContainer.forEach((div) => {
    div.contentEditable = "false";
  });

  // generateTable(100);
});

btnEnableNumber.addEventListener("click", function () {
  let currentInfo = getCurrentInfo();
  let crossOutNumbers = currentInfo.crossOutNumbers;
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
  let currentInfo = getCurrentInfo();
  
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

    currentInfo.crossOutNumbers.push(number);

    // Guardar en local storage
    setCrossOutNumbers(currentInfo.crossOutNumbers);
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

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var formData = new FormData(form);
  const title = formData.get("title");
  const description = formData.get("description");
  const totalNumbers = formData.get("total-numbers");
  const ticketValue = formData.get("ticket-value");
  const prize = formData.get("prize");
  const date = formData.get("date");

  console.log(description, totalNumbers
, ticketValue);
  
  if (title === "" || description === "" || totalNumbers === "" || ticketValue === "" || prize === "" || date === "") {
    alert("Todos los campos son obligatorios");
    return;
  }

  if (isNaN(totalNumbers
) || totalNumbers
 <= 0) {
      alert("Ingrese una cantidad válida de números");
      return;
  }

  if(isNaN(ticketValue) || ticketValue <= 0) {
    alert("Ingrese un valor válido para el valor del boleto");
    return;
  }


  const info = {
    title,
    description,
    totalNumbers,
    ticketValue,
    prize,
    date,
    startFromZero: true,
    crossOutNumbers: [],
    
  };
  localStorage.setItem("info", JSON.stringify(info));
  setCurrentData();
  cleanFormData();
  formData.forEach((item) => {
    item.valueOf = "";
  });

});
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

const refreshCrossOutNumbers = () => {
  let currentInfo = getCurrentInfo();
  crossOutNumbers = currentInfo?.crossOutNumbers || [];
};

const setCrossOutNumbers = (numbers) => {

  let currentInfo = getCurrentInfo();
  if(currentInfo){
    currentInfo.crossOutNumbers = numbers;
    localStorage.setItem('info', JSON.stringify(currentInfo));
  }
  // setCrossOutNumbers(numbers);
  // localStorage.setItem("crossOutNumbers", JSON.stringify(numbers));
  setTotalNumbers();
};


const setCurrentData = () => {

  const storedInfo = getCurrentInfo();
  if(storedInfo){
    const { title, description, totalNumbers, ticketValue, prize, date } = storedInfo;
    const containersForInfo = document.querySelectorAll(".current-info");
    containersForInfo[0].innerText = title;
    containersForInfo[1].innerHTML = description;
    containersForInfo[2].innerText = `Fecha de cierre: ${date}`;
    containersForInfo[3].innerText = `Premio: ${prize}`;
    // containersForInfo[3].innerText = `Valor del boleto: $${ticketValue}`;
    // containersForInfo[2].innerText = `Total números: ${totalNumbers}`;
    generateTable(totalNumbers);
    setTotalNumbers();
  }
}

const setTotalNumbers =()=>{
  let currentInfo = getCurrentInfo();
  let totalCrossedOutNumber = currentInfo.crossOutNumbers.length;
  let totalAvailableNumbers = 100 - totalCrossedOutNumber;
  
  // let totalCrossedOutNumber =crossOutNumbers.length;
  // let totalAvailableNumbers = 100 - totalCrossedOutNumber;

  textTotalAvailable.innerText = totalAvailableNumbers;
  textTotalSold.innerText = totalCrossedOutNumber;
}

const cleanFormData =()=>{
  formData.forEach(item=>{
    item.value = "";
  })
}

const getCurrentInfo = ()=>{
  if(!currentInfo){
    cachedInfo = JSON.parse(localStorage.getItem("info"));
  }
  return cachedInfo;
}

const updateLocalStorage = (info)=>{
  cachedInfo = info;
  localStorage.setItem("info", JSON.stringify(info));
}