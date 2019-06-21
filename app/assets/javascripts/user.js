$(document).on('turbolinks:load', function(){

  var user_search = $("#user-search-result");
  var message_search = $("#message-search-result");

  function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
  user_search.append(html);
  }

  function changeUser(name, id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    message_search.append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">一致するユーザーがいません。</p>
                </div>`
    user_search.append(html);
  }

    $(document).on("click", '.user-search-add', function(){
      var userName = $(this).data('user-name');
      var userId = $(this).data('user-id');
      $(this).parent().remove();
      changeUser(userName, userId);
    });
    $(document).on("click", '.user-search-remove', function(){
      $(this).parent().remove();
    });

  $('.chat-group-form__input').on("keyup", function(){
    var input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
        appendUser(user);
        });
      }
    })
    .fail(function(){
      appendErrMsgToHTML();
    })
  })
})