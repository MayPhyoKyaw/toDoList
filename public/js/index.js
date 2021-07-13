$(document).ready(function () {

  $(".proj-create-button").click(function () {
    var proj_title = document.getElementById("projTitle").value;
    var proj_desc = document.getElementById("description").value;
    var proj_deadline = document.getElementById("projDeadline").value;
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
          projDeadline: proj_deadline,
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
        console.log(pid, proj_desc);

        $(".wrapper-created-proj").append(`
            <div class="wrapper-created-proj-list">
                <div class="card">
                  <div class="card-body">
                    <span class="close del del-proj"><i class="fa fa-close"></i></span>
                    <h4 class="card-title" contentEditable="true" id="cardTitle">${proj_title}</h4>
                    <p class="card-text" contentEditable="true" id="cardText">${proj_desc}</p>
                  </div>
                </div>
                <span class="hideText proj-id">${pid}</span>
                <div class="view-detail"><span class="proj-detail">View >></span></div>
            </div>
          `);
      })

      var cardTitle = document.getElementById("cardTitle");
      cardTitle.addEventListener('keydown', function(ev){
          // console.log(ev.which);
          if(ev.keyCode == 13){
            ev.preventDefault();
            var card_title = $(this).text();
            var card_id = $(this).parent().parent().siblings(".proj-id").text();
            // console.log(card_title); console.log(card_id);
            $("#updateTitle").text(`"${card_title}"`);
            $(".card-id").text(`${card_id}`);
            $("#confirmCardTitleEditModal").modal('show');
          }
      }, false)

      var cardText = document.getElementById("cardText");
      cardText.addEventListener('keydown', function(ev){
        // console.log(ev.which);
        if(ev.keyCode == 13){
          ev.preventDefault();
          var card_text = $(this).text();
          var card_id = $(this).parent().parent().siblings(".proj-id").text();
          // console.log(card_text); console.log(card_id);
          $("#updateText").text(`"${card_text}"`);
          $(".card-id").text(`${card_id}`);
          $("#confirmCardTextEditModal").modal('show');
        }
      }, false)

      $("#editCardTitle").on('click', function(){
        var card_id = $(this).parent().siblings().find(".card-id").text();
        var card_title = $(this).parent().siblings().find("#updateTitle").text();
        // console.log(card_id); console.log(card_title);
        var title = card_title.replace(/"/g,"");
        console.log(title);
        fetch('/editCardTitle', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            p_id: card_id,
            p_title: title,
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
      });

      $("#editCardText").on('click', function(){
        var card_id = $(this).parent().siblings().find(".card-id").text();
        var card_text = $(this).parent().siblings().find("#updateText").text();
        // console.log(card_id); console.log(card_text);
        var content = card_text.replace(/"/g,"");
        console.log(content);
        fetch('/editCardText', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            p_id: card_id,
            p_content: content,
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
      });

      $(".del-proj").on('click', function(){
        var card_id = $(this).parent().parent().siblings(".proj-id").text();
        // console.log(card_id);
        fetch('/DeleteProjCard', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
           p_id: card_id,
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
      });

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
        const get_proj_id = $(this).parent().siblings('.proj-id').text();
        const get_proj_title = $(this).parent().siblings('div').find('h4').text();
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