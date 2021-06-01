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
        // var pendingTask = [];
        data.forEach(list => {
            // console.log(list);
            toDoItem = list.itemName;
            id = list._id;
            status = list.doneStatus;
            console.log(status);
            toDoItems.push(status);
            console.log(toDoItems);

            if(status === "1"){
              $(".completed_tasks").append(`
                <li class="checkedli list">
                    <input type="checkbox" name="toDoList" value="${id}" class="styled-checkbox" checked>
                    <label></label><span class="item_name">${toDoItem} </span>
                    <span class="hideText" id="itemId">${id}</span>
                    <span class="edit passValue" data-toggle="modal" data-target="#editModal"><i class="fa fa-edit"></i></span>
                    <span class="close del"><i class="fa fa-close"></i></span>
                </li>
              `);
            }else{
              $(".pending_tasks").append(`
                <li class="list">
                    <input type="checkbox" name="toDoList" value="${id}" class="styled-checkbox">
                    <label></label><span class="item_name">${toDoItem} </span>
                    <span class="hideText" id="itemId">${id}</span>
                    <span class="edit passValue" data-toggle="modal" data-target="#editModal"><i class="fa fa-edit"></i></span>
                    <span class="close del"><i class="fa fa-close"></i></span>
                </li>
              `);
            }

            $("input[type=checkbox]").on("click", function(e) {
              var item_id = `${(this).value}`;
              console.log(item_id);
              if($(this).is(":checked")) {
                console.log(`Checkbox is checked. \n ${(this).value}`);
                fetch('/MakeDoneStatus', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    itemID: item_id,
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
              }else if($(this).is(":not(:checked)")){
                console.log("Checkbox is unchecked.");
                fetch('/MakeUndoStatus', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    item_id: item_id,
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
            });

            $(".del").click(function(){
              var item_id = $(this).siblings().text();
              console.log(`Hello ${itemId}`);
              fetch('/DeleteItem', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  item_id: item_id,
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
            })

            $(".passValue").click(function(){
              var item_id = $(this).siblings().text();
              // console.log(`Hello ${item_id}`);
              var itemName = $(this).siblings(".item_name").text();
              // console.log(itemName);
              // $("#editToDo").val(itemName);
              document.getElementById("editToDo").textContent = itemName;
              document.getElementById("carry_id").textContent = item_id;
            })

            $(".editListItem").click(function(){
              var itemId = $(this).siblings(".hiddenID").text();
              var editedItemName = document.getElementById("editToDo").value;
              console.log(`Hello ${itemId}`);
              fetch('/editTask', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  itemId: itemId,
                  item_name: editedItemName,
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
            })
        });
        // console.log(toDoItems.length);
        var pending_count = 0;
        var completed_count = 0;
        for(i=0; i<toDoItems.length; i++){
          if(toDoItems[i] === "0"){
            pending_count++;
          }else if(toDoItems[i] === "1"){
            completed_count++;
          }
        }
        console.log(pending_count);
        $(".pendingTasks").text(pending_count);
        $(".completedTasks").text(completed_count);
    })
    .catch(function (error) {
        console.log(error);
    });

    var add = document.getElementById("addListItem");
    add.addEventListener('click', function (e) {
      var itemName = document.getElementById("toDo").value;
        console.log('button was clicked');
      // var addTime = new Date();
      // console.log(addTime);
        if (itemName === '') {
            alert("You must write something!");
        } else {
            fetch("/addToDoItem", {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                item_name: itemName,
                // add_time: addTime,
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
        }
    });

    $("#delAll").click(function(){
      fetch('/DeleteAll', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
          // item_id: itemId,
        // })
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
    })

    $("#delForCompletedTasks").click(function(){
      fetch('/DeleteCompletedTasks', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
          // item_id: itemId,
        // })
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
    })
})