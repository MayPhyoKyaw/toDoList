$(document).ready(function() {

    $(".proj-create-button").click(function() {
      var proj_title = document.getElementById("projTitle").value;
      var proj_desc = document.getElementById("description").value;
      // $(".proj-title").text(proj_title);
      // $(".proj-descp").text(proj_desc);
      if (proj_title === '' && proj_desc === '') {
        alert("You must write something!");
      } else {
          fetch("/createProject", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              projTitle: proj_title,
              projDesc: proj_desc,
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
      console.log(proj_desc);
    })

    // get project
    fetch('/SelectProject', { method: 'GET' })
    .then(function (response) {
        if (response.ok) return response.json();
        throw new Error('Request failed.');
    })
    .then(function (data) {
        console.log(data)
        data.forEach(proj => {
          var proj_title = proj.projTitle;
          var proj_desc = proj.description;
          var pid = proj._id;
          console.log(pid);

          $(".wrapper-created-proj").append(`
            <div class="wrapper-created-proj-list">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">${proj_title}</h4>
                    <hr>
                    <p class="card-text">${proj_desc}</p>
                  </div>
                </div>
                <span class="hideText proj-id">${pid}</span>
                <div class="proj-detail"><a href="#">View >></a></div>
            </div>
          `);
        })     
        $('.proj-detail').click(function() {
          const get_proj_id = $(this).siblings('.proj-id').text();
          const get_proj_title = $(this).siblings('div').find('h4').text();
          console.log(get_proj_id);
          var proj_id = trim(get_proj_id);
          var proj_title = trim(get_proj_title);
          location.href = `details.html?projTitle=${proj_title}&projID=${proj_id}`;
        });
    })
    .catch(function (error) {
        console.log(error);
    });
})

function trim(x) {
  return x.replace(/^\s+|\s+$/gm, '');
}