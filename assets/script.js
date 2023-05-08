// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements

// Find & display time
var timeNow = new Date().toLocaleString();
var sitesEl = document.querySelector("#currentDay");
sitesEl.textContent = timeNow;
// Need to find a nicer way to display this date

// Set start and end times of workday
var dayStart = 8;
var dayEnd = 18;
// To be defined further and read directly from Date
var hourNow = 14;
// How do we get this to update automatically when the time crosses an hour mark?

var siteEl2 = document.querySelector(".container-lg")


// Generate the days
for (let i= dayStart; i<dayEnd; i++) {

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

  if (i == 12) {
    divKey2.textContent = "12PM"
  } else if (i > 12) {
    divKey2.textContent = (i-12) + "PM";
  } else {
    divKey2.textContent = i + "AM"
  }

  if (i == hourNow) {
    divKey.setAttribute("class", "row time-block present");
  } else if (i > hourNow) {
    divKey.setAttribute("class", "row time-block future");
  } else {
    divKey.setAttribute("class", "row time-block past");
  }
  
  buttonKey.addEventListener("click", saveFunction)
  
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
  }
  
  for (let i= 0; i<dayEnd-dayStart; i++) {
    // renderTodos(i);
  }
}

// function renderTodos(hourRef) {
//   todoList.innerHTML = "";
//   todoCountSpan.textContent = hours[hourRef].length;

//   for (var k = 0; k < hours[hourRef].length; k++){
//     var todo = hours[houRef][k];

//     var li = document.createElement("li");
//     li.textContent = todo;
//     li.setAttribute("data-index", i);

//     todoList.appendChild(i);
//   }

// }

function storeHours() {
  localStorage.setItem("hours", JSON.stringify(hours));
}
  
function saveFunction() {

  var refClick = this;
  var todoRef = refClick.getAttribute("data-index");
  var todoText = document.querySelector("#textarea-" + todoRef).value;
  console.log(todoText)

  // Return from function early if submitted todoText is blank
  if (todoText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  todos.push(todoText);
  todoInput.value = "";

  // Store updated todos in localStorage, re-render the list
  storeTodos();
  renderTodos();
};

init()
