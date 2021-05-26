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
        data.forEach(transaction => {
            // console.log(transaction);
            toDoItem = transaction.itemName;
            console.log(toDoItem, typeof(toDoItem));
            // var ul = document.getElementById("toDoList");
            $("ul").append(`
                <li>${toDoItem}
                    <span class="edit"><i class="fa fa-edit"></i></span>
                    <span class="close"><i class="fa fa-close"></i></span>
                </li>
            `)
        });
    })
    .catch(function (error) {
        console.log(error);
    });
})