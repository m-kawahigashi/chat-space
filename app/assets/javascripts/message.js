$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-message-id=${ message.id }>
                  <div class="upper-info">
                    <div class="upper-info__user">
                      ${ message.user_name }
                    </div>
                    <div class="upper-info__date">
                      ${ message.data }
                    </div>
                  </div>
                  <div class="message__text">
                      <p class="message__text__content">
                        ${ content }
                      </p>
                    ${ image }
                  </div>
                </div>`;
    return html;
  }
 
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'swing');
      $('#new_message')[0].reset();
      $('.new-message__edit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージエラー');
      $('.new-message__edit-btn').prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var group = $('.group').data('group-id')
    var last_message_id = $('.message:last').data('message-id');
      $.ajax({
        type: 'GET',
        url: `/groups/${group}/api/messages`,
        dataType: 'json',
        data: {id: last_message_id},
      })
      .done(function(messages){
        messages.forEach(function(message){
        if (message.id > last_message_id){
        var insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'swing');
          }
        })
      })
      .fail(function(){
        alert('自動更新に失敗しました。');
      });
    }
  }
   setInterval(reloadMessages, 5000);
});