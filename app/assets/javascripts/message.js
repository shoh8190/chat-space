$(function(){
  function buildHTML(message){
    if(message.image == null){
      var image = "";
    } else {
      var image = `${message.image}`;
    }
    var html = `<div class="main__chat__post">
                  <div class="main__chat__post__name">
                    <h3> ${message.user_name} </h3>
                    <p> ${message.created_at} </p>
                  </div>
                  <div class="main__chat__post__message">
                    <p> ${message.content} </P>
                    <img src ="${image}">
                  </div>
               </div>`
    return html;
  }
  $('#message_form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__chat').append(html)
      $('.main__form__message').val('')
      $('.main__chat').animate({scrollTop: $(".main__chat")[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })
});
