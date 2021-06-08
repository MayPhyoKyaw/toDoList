$(document).ready(function () {

  $(".proj-create-button").click(function () {
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
                    <span class="close del del-proj"><i class="fa fa-close"></i></span>
                    <h4 class="card-title" contentEditable="true">${proj_title}</h4>
                    <hr>
                    <p class="card-text" contentEditable="true">${proj_desc}</p>
                  </div>
                </div>
                <span class="hideText proj-id">${pid}</span>
                <div class="view-detail"><span class="proj-detail">View >></span></div>
            </div>
          `);
      })

      // $('.edit-proj').click(function() {
      //   $('.card-title').attr('contentEditable', true);
      //   $('.card-text').attr('contentEditable', true);
      //   $('.card-title, .card-text').focus();

      // })

      // Project title and description to edit
      $(".card-title, .card-text").bind("keydown", function (event) {
        var target = $(event.target);
        c = event.keyCode;

        if (c === 13 || c === 27)
          $('<div contenteditable="true"></div>').appendTo('body').focus().remove();
      })

      $("[contenteditable='true']").on("focus", function () {
        $(".card-title, .card-text").toggleClass("focus");
      })

      $("[contenteditable='true']").on("blur", function () {
        $(".card-title, .card-text").toggleClass("focus");
      })

      $('.proj-detail').click(function () {
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

$(window).scroll(function () {
  var height = $('body').height();
  var scrollTop = $(window).scrollTop();
  if (scrollTop > 10) {
    $('.wrapper-sticky').css({ "position": "fixed", "top": "0px" });
  }
  else {
    $('.wrapper-sticky').css({ "position": "relative", "top": "0px" });
  }
});

function trim(x) {
  return x.replace(/^\s+|\s+$/gm, '');
}