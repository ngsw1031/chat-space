$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="main-chat__message__block">
          <div class="main-chat__message__block">
            <div class="main-chat__message__block__name">
              ${message.user_name}
            </div>
            <div class="main-chat__message__block__name__time">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__message__block__list">
            <p class="main-chat__message__block__list__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
         </div>`
      return html;
    } else {
      let html =
       `<div class="main-chat__message__block">
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
});