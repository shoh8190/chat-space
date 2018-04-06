$(function(){

  var user_list = $("#user-search-result");
  var member_list = $("#chat-group-users")

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
               </div>`
    user_list.append(html);
      }

  function appendNoUser(user){
    var html = `<li>
                  <div> ${ user } </div
                </li>`
    user_list.append(html);
  }

  function addUser(user){
    // console.log(user.userName);
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.userName}</p>
                    <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id=${user.userId} data-user-name=${user.userName}>削除</a>
                </div>`
    member_list.append(html);
    }

    function revertUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.userName}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.userId} data-user-name=${user.userName}>追加</a>
               </div>`
    user_list.append(html);
      }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users/',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.lendth !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するメンバーはいません");
      }
      })
     .fail(function(){
       alert('メンバーの検索に失敗しました。');
    })
  });

  $('#user-search-result').on('click', '.chat-group-user__btn--add', function(user){
    addUser(user.target.dataset);
    $(this).parent().remove();
  });

  $('#chat-group-users').on('click', '.chat-group-user__btn--remove', function(user){
    $(this).parent().remove();
  });
});
