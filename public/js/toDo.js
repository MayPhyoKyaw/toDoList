// Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";
//   }
// }

// Create a new list item when clicking on the "Add" button
// function newElement() {
//   var li = document.createElement("li");
//   var inputValue = document.getElementById("toDo").value;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("toDoList").appendChild(li);
//   }
//   document.getElementById("toDo").value = "";

//   var closeSpan = document.createElement("SPAN");
//   // var txt = document.createTextNode("\u00D7");
//   closeSpan.className = "close";
//   var closeIcon = document.createElement("I");
//   closeIcon.className = "fa fa-close";
//   closeSpan.appendChild(closeIcon);
//   li.appendChild(closeSpan);

//   var editSpan = document.createElement("SPAN");
//   // var txt = document.createTextNode("\u00D7");
//   editSpan.className = "edit";
//   var editIcon = document.createElement("I");
//   editIcon.className = "fa fa-edit";
//   editSpan.appendChild(editIcon);
//   li.appendChild(editSpan);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// }