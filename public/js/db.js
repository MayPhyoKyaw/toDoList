$(document).ready(function() {
    // get items data
    fetch('/SelectItems', { method: 'GET' })
    .then(function (response) {
        if (response.ok) return response.json();
        throw new Error('Request failed.');
    })
    .then(function (data) {
        console.log(data)
        var toDoItems = [];
        var pendingTask = [];
        data.forEach(list => {
            // console.log(list);
            toDoItem = list.itemName;
            id = list._id;
            status = list.doneStatus;
            // console.log(toDoItem, typeof(toDoItem), id, status, typeof(status));
            // $("ul").append(`
            //     <li>${toDoItem}
            //         <span class="hideText" id="itemId">${id}</span>
            //         <span class="edit"><i class="fa fa-edit"></i></span>
            //         <span class="close"><i class="fa fa-close"></i></span>
            //     </li>
            // `);
            // var ul = document.getElementById("toDoList");
            console.log(status);
            pendingTask.push(status);
            console.log(pendingTask);

            if(status === "1"){
              $("#toDoList").append(`
                <li class="checked">${toDoItem}
                    <span class="hideText" id="itemId">${id}</span>
                    <span class="edit"><i class="fa fa-edit"></i></span>
                    <span class="close"><i class="fa fa-close"></i></span>
                </li>
              `);
            }else{
              $("#toDoList").append(`
                <li>${toDoItem}
                    <span class="hideText" id="itemId">${id}</span>
                    <span class="edit"><i class="fa fa-edit"></i></span>
                    <span class="close"><i class="fa fa-close"></i></span>
                </li>
              `);
            }
        });
        console.log(pendingTask.length);
        // var i=0;
        var count = 0;
        for(i=0; i<pendingTask.length; i++){
          console.log(pendingTask[i]);
          if(pendingTask[i] === "0"){
            // console.log(pendingTask.length);
            count++;
          }
        }
        console.log(count);
        $(".pendingTasks").text(count);
    })
    .catch(function (error) {
        console.log(error);
    });

    var add = document.getElementById("addListItem");
    add.addEventListener('click', function (e) {
      var itemName = document.getElementById("toDo").value;
        console.log('button was clicked');
        var li = document.createElement("li");
        var t = document.createTextNode(itemName);
        li.appendChild(t);
        if (itemName === '') {
            alert("You must write something!");
        } else {
            document.getElementById("toDoList").appendChild(li);
        }
        document.getElementById("toDo").value = "";

        var itemID = document.getElementById("itemId").innerHTML;
        var idSpan = document.createElement("span");
        idSpan.className = "hideText";
        var idText = document.createTextNode(itemID);
        idSpan.appendChild(idText);
        var closeSpan = document.createElement("SPAN");
        // var txt = document.createTextNode("\u00D7");
        closeSpan.className = "close";
        var closeIcon = document.createElement("I");
        closeIcon.className = "fa fa-close";
        closeSpan.appendChild(closeIcon);
        li.appendChild(closeSpan);

        var editSpan = document.createElement("SPAN");
        // var txt = document.createTextNode("\u00D7");
        editSpan.className = "edit";
        var editIcon = document.createElement("I");
        editIcon.className = "fa fa-edit";
        editSpan.appendChild(editIcon);
        li.appendChild(editSpan);
  
        if(itemName !== ""){
          fetch("/addToDoItem", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              item_name: itemName,
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
        }
    });

    // Add a "checked" symbol when clicking on a list item
    var list = document.querySelector('ul');
    list.addEventListener('click', function(ev) {
      // if (ev.target.tagName === 'LI') {
      //   ev.target.classList.toggle('checked');
      //   console.log(ev.target.childNodes[1].textContent);
      // }
      console.log($(ev.target).hasClass("checked"));
      var itemId = ev.target.childNodes[1].textContent;
      
      if($(ev.target).hasClass("checked")){
        fetch('/MakeUndoStatus', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            item_id: itemId,
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
      }else{
        fetch('/MakeDoneStatus', {
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
      }
      location.reload();
    }, false);

    // var close = document.getElementById("del");
    $("#del").click(function(){
      var itemId = $(this).child().text();
      console.log(itemId);
      // fetch('/DeleteItem', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     item_id: itemId,
      //   })
      // })
      //   .then(function (response) {
      //     console.log(response)
      //     if (response.ok) {
      //       console.log('clicked!!');
      //       return;
      //     }
      //     throw new Error('Failed!!');
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      //   location.reload();
    })
})