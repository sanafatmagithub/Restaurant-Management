let price = document.querySelector("#price");
let dish = document.querySelector("#dish");
let table = document.querySelector("#table");
let btn = document.querySelector("#button");
let table1 = document.querySelector(".table1");
let table2 = document.querySelector(".table2");
let table3 = document.querySelector(".table3");

let maindiv = document.querySelector("#output");

btn.addEventListener("click", placeorder);

function placeorder(e) {
  e.preventDefault();
  let row = document.createElement("tr");
  let pricecell = document.createElement("td");
  let dishcell = document.createElement("td");
  let tablecell = document.createElement("td");
  let delbutton = document.createElement("button");
  let buttoncell = document.createElement("td");

  pricecell.textContent = price.value;
  dishcell.textContent = dish.value;
  tablecell.textContent = table.value;
  delbutton.textContent = "Delete";
  delbutton.classList.add("button1");

  buttoncell.appendChild(delbutton);
  row.appendChild(pricecell);
  row.appendChild(dishcell);
  row.appendChild(tablecell);
  row.appendChild(buttoncell);

  // For Post data in crudcrud
  let obj = {
    price: price.value,
    Dish: dish.value,
    Table_No: table.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/684b8d76fc224fa0a4e12e67be16c6a0/placedOrder",
      obj
    )
    .then((res) => {
      console.log("Order is", res);
    })
    .catch((err) => {
      console.log(err);
    });

  if (table.value === "Table 1") table1.appendChild(row);
  else if (table.value === "Table 2") table2.appendChild(row);
  else table3.appendChild(row);

  //  On Refresh page
  price.value = "";
  dish.value = "";
  table.value = "-- Table --";

  // Add Function On delete Button
  delbutton.addEventListener("click", (event) => {
    let rowdel = event.target.parentElement.parentElement;
    let dish = rowdel.children[1].textContent;
    let table_no = rowdel.children[2].textContent;
    findId().then((res) => {
      const filterdata = res.filter((eachrow) => {
        if(eachrow.Dish === dish && eachrow.Table_No === table_no)
        return eachrow.Dish === dish;
      });
      const id = filterdata[0]._id;
      deleteData(id);
    });
    rowdel.remove();
  });
  // Find Id of particular Row
  function findId() {
    return axios
      .get(
        "https://crudcrud.com/api/684b8d76fc224fa0a4e12e67be16c6a0/placedOrder"
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Delete data from crudcrud
  function deleteData(id) {
    axios
      .delete(
        `https://crudcrud.com/api/684b8d76fc224fa0a4e12e67be16c6a0/placedOrder/${id}`
      )
      .then((res) => {
        console.log("Deleted !!");
      })
  }
}

// Get Data from crudcrud on window loading
window.addEventListener("DOMContentLoaded", getorderdetails);
function getorderdetails() {
  axios
    .get(
      "https://crudcrud.com/api/684b8d76fc224fa0a4e12e67be16c6a0/placedOrder"
    )
    .then((res) => {
      // console.log(res.data);
      for (var i = 0; i < res.data.length; i++) {
        let row = document.createElement("tr");
        let pricecell = document.createElement("td");
        let dishcell = document.createElement("td");
        let delbutton = document.createElement("button");
        let tablecell = document.createElement("td");
        let buttoncell = document.createElement("td");

        pricecell.textContent = res.data[i].price;
        dishcell.textContent = res.data[i].Dish;
        tablecell.textContent = res.data[i].Table_No;
        delbutton.textContent = "Delete";
        delbutton.classList.add("button1");

        buttoncell.appendChild(delbutton);
        row.appendChild(pricecell);
        row.appendChild(dishcell);
        row.appendChild(tablecell);
        row.appendChild(buttoncell);

        if (res.data[i].Table_No === "Table 1") {
          table1.appendChild(row);
        } else if (res.data[i].Table_No === "Table 2") {
          table2.appendChild(row);
        } else {
          table3.appendChild(row);
        }
      }
    });
}

// Add fUnction on Delete button after get data from reload page .so that it delete also from CrudCrud.
function handlebuttonclick(event)
{
  if(event.target.classList.contains("button1"))
  {
    let rowdel = event.target.parentElement.parentElement;
    let dish = rowdel.children[1].textContent;
    let table_no = rowdel.children[2].textContent;
    findId().then((res) => {
      const filterdata = res.filter((eachrow) => {
        if(eachrow.Dish === dish && eachrow.Table_No === table_no)
        return eachrow.Dish === dish;
      });
      const id = filterdata[0]._id;
      deleteData(id);
    });
    rowdel.remove();
  }
}

// Attach to all table handlebuttonclick
table1.addEventListener("click", handlebuttonclick);
table2.addEventListener("click", handlebuttonclick);
table3.addEventListener("click", handlebuttonclick);

// Find Id of particular Row
function findId() {
  return axios
    .get(
      "https://crudcrud.com/api/684b8d76fc224fa0a4e12e67be16c6a0/placedOrder"
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

// Delete data from crudcrud
function deleteData(id) {
  axios
    .delete(
      `https://crudcrud.com/api/684b8d76fc224fa0a4e12e67be16c6a0/placedOrder/${id}`
    )
    .then((res) => {
      console.log("Deleted After Loaded !!");
    })
}