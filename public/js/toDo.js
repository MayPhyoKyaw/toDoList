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

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  // if (ev.target.tagName === 'LI') {
  //   ev.target.classList.toggle('checked');
  //   console.log(ev.target.childNodes[1].textContent);
  // }
  var itemId = ev.target.childNodes[1].textContent;
  fetch('/MakeStatus', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      itemID: itemId,
    })
  })
    .then(function (response) {
      console.log(response)
      if (response.ok) {
        console.log('clicked!!');
        return;
      }
      throw new Error('Failed!!');
    })
    .catch(function (error) {
      console.log(error);
    });
    location.reload();
}, false);

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