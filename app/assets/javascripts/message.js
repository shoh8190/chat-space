$(function(){
  function buildHTML(message){
    if(message.image == null){
      var image = "";
    } else {
      var image = `${message.image}`;
    }
    var html = `<div class="main__chat__post" messageId="${message.id}">
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
      $('#message_form')[0].reset();
      $('.main__chat').animate({scrollTop: $(".main__chat")[0].scrollHeight}, 'slow');
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })

  var interval = setInterval(update, 5000);

    function update(){
    var id = $('.main__chat__post').last().attr('messageId');
    var link = window.location.pathname;
    if (link.match(/\/groups\/\d+\/messages/)){
  $.ajax({
      url: link,
      type: 'GET',
      data: {id: id},
      dataType:'json'
  })
  .done(function(json){
    var insertHTML ='';
    if (json.id !== 0){
    json.forEach(function(message){
      insertHTML = buildHTML(message);
      $('.main__chat').append(insertHTML);
    });
    }
    $('#message_form')[0].reset();
    $('.main__chat').animate({scrollTop: $(".main__chat")[0].scrollHeight}, 'slow');
   })
  .fail(function(data){
    alert('自動更新に失敗しました');
  })
  }else{
    clearInterval(interval);
  }}
});


