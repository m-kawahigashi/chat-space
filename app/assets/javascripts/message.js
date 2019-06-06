$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
                  <div class="upper-info">
                    <div class="upper-info__user">
                      ${message.user_name}
                    </div>
                    <div class="upper-info__date">
                      ${message.data}
                    </div>
                  </div>
                  <div class="message__text">
                      <p class="message__text__content">
                        ${content}
                      </p>
                    ${image}
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
      $('.new-message__edit-btn').prop('disabled', false);
      $('.form')[0].reset();
    })
    .fail(function(){
      alert('メッセージエラー');
      $('.new-message__edit-btn').prop('disabled', false);
    })
  })
});