(function ($) {
  var baseUrl = "https://superqa-api-test.herokuapp.com";

  $(".register").click(registerUser);
  $(".login").click(loginUser);

  function loginUser() {
    var url = baseUrl + "/login";
    var method = "POST";
    var payload = {
      email: $("#email").val(),
      password: $("#password").val()
    }
    $.ajax({
      method: method,
      url: url,
      data: payload
    }).done(function ( data ) {
      console.log(data)
      $.cookie("session-id", data.token);
      $(location).attr('href', window.location.pathname.replace("/login", "/users"))
    }).fail(function ( err ) {
      $(".data-error").html(err.responseJSON.message);
    });
  }

  function registerUser() {
    var url = baseUrl + "/register";
    var method = "POST";
    var payload = {
      email: $("#email").val(),
      password: $("#password").val(),
      confirmPassword: $(".confirmPassword").val()
    }
    $.ajax({
      method: method,
      url: url,
      data: payload
    }).done(function( data ) {
      $(location).attr('href', window.location.pathname.replace("/register", "/login"))
    }).fail(function( err ) {
      $(".data-error").html(err.responseJSON.message);
    });
  }
}(jQuery));
