// Create some constants and variables that we will use later
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

// The sheets we want to filter
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// To make our job easier going forward, we are going to log all the information about the workbook
// Let's make a function that allows us to do this.
function logWorkbookInformation() {
  // Get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is: "${workbook.name}"`);

  // Get the array of dashboards and stand-alone sheets
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index [${index}] is: "${element.name}"`);
  });

  // We are normally only interested in interacting with the active sheet (tab), so lets get that
  vizActiveSheet = workbook.activeSheet;
  listSheets = vizActiveSheet.worksheets;
  console.log(`The active sheet is "${vizActiveSheet.name}"`);

  // List all of the worksheets within the active sheet
  listSheets.forEach((element) => {
    index = element.index;
    worksheetName = element.name;
    console.log(`The worksheet with index [${index}] is: "${worksheetName}"`);
  });

  // Assign constants to the sheets
  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");

  //Set the active sheet to overview
  dashboard = workbook.activateSheetAsync("Overview");
}

// Log the workbook information once the viz has become interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);

// LETS DO STUFF WITH BUTTONS

// Tell JS which button to look for
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

// What to do when button is clicked
oregonWashingtonButton.addEventListener("click", function oregonWashFunction(e) {
  //Log what's pressed
  console.log(e.target.value);

  //Apply the filter to all of the sheets
  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
});

clearFilterButton.addEventListener("click", function clearState(e) {
  //Log what's pressed
  console.log(e.target.value);

  //Apply the filter to all of the sheets
  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
});

undoButton.addEventListener("click", function unDo() {
  let viz = document.getElementById("tableauViz");
  viz.undoAsync();
});