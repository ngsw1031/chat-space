$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
       `<div class="main-chat__message__block" data-message-id=${message.id}>
          <div class="umain-chat__message__block">
            <div class=".main-chat__message__block__name">
              ${message.user_name}
            </div>
            <div class="main-chat__message__block__name__time">
              ${message.created_at}
            </div>
          </div>
          <div class=".main-chat__message__block__list">
            <p class="main-chat__message__block__list__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      let html =
       `<div class="main-chat__message__block" data-message-id=${message.id}>
          <div class="umain-chat__message__block">
            <div class=".main-chat__message__block__name">
              ${message.user_name}
            </div>
            <div class="main-chat__message__block__name__time">
              ${message.created_at}
            </div>
          </div>
          <div class=".main-chat__message__block__list">
            <p class="main-chat__message__block__list__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-chat__message').append(html);
      $('.main-chat__message').animate({ scrollTop: $('.main-chat__message')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.main-chat__form__btn').prop('disabled', false);
    })
  })
  let reloadMessages = function() {
    let last_message_id = $('.main-chat__message__block:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id},  
    })
    .done(function(messages){
      if (messages.length !== 0) {
        let insertHTML = "";
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.main-chat__message').append(insertHTML);
        $('.main-chat__message').animate({ scrollTop: $('.main-chat__message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("error");
    });
  }; 
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
