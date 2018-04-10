$(function(){
 function buildHTML(message){
    var image = (message.image == null) ? "" : `${message.image}`;
    var html = `<div class="main__chat__post" data-message-id="${message.id}">
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

  function preventSubmit(){
    var content = document.getElementById(".main__form__message").value;
    var image = document.getElementById(".main__form__image").value;

    if (content === null || image == null) {
        return false;
    }
  }

  $('#message_form').on('submit', function(e){
    // preventSubmit();
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
      if(data.id != undefined ){
      var html = buildHTML(data);
      $('.main__chat').append(html);
      $('.main__form__message').val('');
      $('.main__form__image').val('');
      $('.main__chat').animate({scrollTop: $(".main__chat")[0].scrollHeight}, 'slow');
    }
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })

  var interval = setInterval(update, 5000);

    function update(){
    var id = $('.main__chat__post').last().data('messageId');
    var url = window.location.href;
    if (url.match(/\/groups\/\d+\/messages/)){
  $.ajax({
      url: url,
      type: 'GET',
      data: {id: id},
      dataType:'json',
  })
  .done(function(json){
    if (json.length !== 0){
    json.forEach(function(message){
      $('.main__chat').append(buildHTML(message));
    });
    }
    $('.main__chat').animate({scrollTop: $(".main__chat")[0].scrollHeight}, 'slow');
   })
  .fail(function(data){
    alert('自動更新に失敗しました');
  })
  }else{
    clearInterval(interval);
  }}
});
