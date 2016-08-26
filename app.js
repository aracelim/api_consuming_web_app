(function ($) {
  var baseUrl = "https://superqa-api-test.herokuapp.com";

  $(".button-collapse").sideNav();
  $(".register").click(registerUser);
  $(".login").click(loginUser);
  $(".logout").click(logoutUser);
  $( document ).ready(populateUsers);

  function populateUsers() {
    if ($(".striped tbody")[0]) {
      return getUsers();
    }
  }

  function logoutUser() {
    $(location).attr('href', window.location.pathname.replace("/users", "/login"))
  }
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
      $(location).attr('href', window.location.pathname.replace("/login", "/users"))
    }).fail(function ( err ) {
      $(".data-error").html(err.responseJSON.message);
    });
  }

  function getUsers() {
    var url = baseUrl + "/users";
    $.ajax({
      url: url
    }).done(function ( data ) {
      console.log(data.users);
      var users = data.users;
      var $tbody = $(".striped tbody");

      users.forEach(function (user) {
        var $email = $("<td>" + user.email + "</td>");
        var $createdAt = $("<td>" + user.createdAt + "</td>");
        var $role = $("<td>" + user.role + "</td>");
        var $tr = $("<tr>")

        $tr.append($email, $createdAt, $role);

        $tbody.append($tr);
      })
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
