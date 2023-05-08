$(function() {
// Find & display time
var timeNow = new Date().toLocaleString();
var sitesEl = document.querySelector("#currentDay");
sitesEl.textContent = timeNow;

// Set start and end times of workday
var dayStart = 8;
var dayEnd = 18;

// To be defined further and read directly from Date
var hourNow = new Date().getHours();

// How do we get this to update automatically when the time crosses an hour mark?
setInterval(function () {
  var newHour = new Date().getHours();
  if (newHour !== hourNow) {
    hourNow = newHour;
    init();
  }
}, 60000); // check every minute

var siteEl2 = document.querySelector(".container-lg");

// Generate the days
for (let i= 0; i<dayEnd-dayStart; i++) {

  var divKey = document.createElement("div");
  var divKey2 = document.createElement("div");
  var textArea = document.createElement("textarea");
  var buttonKey = document.createElement("button");
  var iKey = document.createElement("i");

  // Add unique id to the textarea
  textArea.id = "textarea-" + i;

  divKey2.setAttribute("class", "col-2 col-md-1 hour text-center py-3");
  textArea.setAttribute("class", "col-8 col-md-10 description");
  textArea.setAttribute("rows", "3");
  buttonKey.setAttribute("class", "btn saveBtn col-2 col-md-1");
  buttonKey.setAttribute("aria-label", "save");
  buttonKey.setAttribute("data-index", i)
  iKey.setAttribute("class","fas fa-save");
  iKey.setAttribute("aria-hidden", "true");

  if (i + dayStart == 12) {
    divKey2.textContent = "12PM";
  } else if (i + dayStart > 12) {
    divKey2.textContent = (i + dayStart - 12)+ "PM";
  } else {
    divKey2.textContent = (i + dayStart) + "AM";
  }

  if (i + dayStart == hourNow) {
    divKey.setAttribute("class", "row time-block present");
  } else if (i + dayStart> hourNow) {
    divKey.setAttribute("class", "row time-block future");
  } else {
    divKey.setAttribute("class", "row time-block past");
  }
  
  buttonKey.addEventListener("click", saveFunction);
  
  siteEl2.appendChild(divKey);
  divKey.appendChild(divKey2);
  divKey.appendChild(textArea);
  divKey.appendChild(buttonKey);
  buttonKey.appendChild(iKey);
}

let hours = [];

function init() {
  var storedHours = JSON.parse(localStorage.getItem("hours"));

  if (storedHours !== null) {
    hours = storedHours;
  } else {
    blankHours();
  }

  for (let i = 0; i < dayEnd - dayStart; i++) {
    renderTodos(i);
  }
}

function blankHours() {
    hours = [];
    for (let i = dayStart; i < dayEnd; i++) {
      hours.push([]);
    }
  }

function renderTodos(todoRef) {
  var todoList = document.querySelector("#textarea-" + todoRef);
  var todoString = '';

  for (var k = 0; k < hours[todoRef].length; k++) {
    var todo = hours[todoRef][k];
    todoString += todo + '\n';
  }

  todoList.value = todoString;
}


function storeHours() {
  localStorage.setItem("hours", JSON.stringify(hours));
}
  
function saveFunction() {

  var refClick = this;
  var todoRef = refClick.getAttribute("data-index");
  var todoText = document.querySelector("#textarea-" + todoRef).value;

  if (todoText === "") {
    return;
  }

  // if (!Array.isArray(hours[todoRef])) {
  hours[todoRef] = [];
  // }  

  hours[todoRef].push(todoText);
  // Add new todoText to particular hour array, clear the input
  todoText.value = "";
  
  console.log(hours)
  // Store updated todos in localStorage, re-render the list
  storeHours();
  renderTodos(todoRef);
};


// init()
var clearButton = document.createElement("button");
clearButton.textContent = "Clear Hours";
clearButton.addEventListener("click", function() {
  clearHours();
});
document.body.appendChild(clearButton);

function clearHours() {
  blankHours();
  localStorage.setItem("hours", JSON.stringify(hours));
  init();
  console.log(hours)
}


})

