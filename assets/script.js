$(function() {
  // --- Find current time, set time guide for scheduler and automatically update ---
  // Find & display time
  var timeNow = new Date().toLocaleString();
  var sitesEl = document.querySelector("#currentDay");
  sitesEl.textContent = timeNow;
  
  // Set start and end times of workday
  var dayStart = 8;
  var dayEnd = 18;
  var hourNow = new Date().getHours();
  
  // Creating check to update automatically when the time crosses an hour mark
  setInterval(function () {
    var newHour = new Date().getHours();
    if (newHour !== hourNow) {
      hourNow = newHour;
      init();
    }
  }, 60000); // check every minute
  
  // ------------------------------------------------------------------------------------------
  // --- Create Daily Schedule ---
  var siteEl2 = document.querySelector(".container-lg");
  
  // For each hour of the workday, create & render
  for (let i= 0; i<dayEnd-dayStart; i++) {
    // Identify existing document elements
    var divKey = document.createElement("div");
    var divKey2 = document.createElement("div");
    var textArea = document.createElement("textarea");
    var buttonKey = document.createElement("button");
    var iKey = document.createElement("i");
    
    // Add unique id to the textarea
    textArea.id = "textarea-" + i;
    
    // Set attributes to elements 
    divKey2.setAttribute("class", "col-2 col-md-1 hour text-center py-3");
    textArea.setAttribute("class", "col-8 col-md-10 description");
    textArea.setAttribute("rows", "3");
    buttonKey.setAttribute("class", "btn saveBtn col-2 col-md-1");
    buttonKey.setAttribute("aria-label", "save");
    buttonKey.setAttribute("data-index", i)
    iKey.setAttribute("class","fas fa-save");
    iKey.setAttribute("aria-hidden", "true");
    
    // Add textContent to each hour
    if (i + dayStart == 12) {
      divKey2.textContent = "12PM";
    } else if (i + dayStart > 12) {
      divKey2.textContent = (i + dayStart - 12)+ "PM";
    } else {
      divKey2.textContent = (i + dayStart) + "AM";
    }
    
    // Set conditional coloring of hours depending on comparison to current time
    if (i + dayStart == hourNow) {
      divKey.setAttribute("class", "row time-block present");
    } else if (i + dayStart> hourNow) {
      divKey.setAttribute("class", "row time-block future");
    } else {
      divKey.setAttribute("class", "row time-block past");
    }
    
    // Add eventlistener even to save button at each hour block
    buttonKey.addEventListener("click", saveFunction);
    
    // Render elements for each hour to page
    siteEl2.appendChild(divKey);
    divKey.appendChild(divKey2);
    divKey.appendChild(textArea);
    divKey.appendChild(buttonKey);
    buttonKey.appendChild(iKey);
  }
  
  // Create Clear Button
  var clearButton = document.createElement("button");
  clearButton.textContent = "Clear Schedule";
  clearButton.classList.add("clear-button");
  document.body.appendChild(clearButton);
  
  // ------------------------------------------------------------------------------------------
  // --- Series of functions to create functionality of page ---
  
  let hours = [];
  
  // Initial init function - pulling from local storage & calling render function
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

  // Create function that adds an array within each hour to store values
  function blankHours() {
      hours = [];
      for (let i = dayStart; i < dayEnd; i++) {
        hours.push([]);
      }
    }

  // Rendering the existing stored values to the page
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

    hours[todoRef] = [];
    hours[todoRef].push(todoText);
    todoText.value = "";
    
    // Store updated todos in localStorage, re-render the list
    storeHours();
    renderTodos(todoRef);
  };

  clearButton.addEventListener("click", function() {
    blankHours();
    localStorage.setItem("hours", JSON.stringify(hours));
    init();
  });

  init()

})

