//Ajax
$.get("/getUsername").done(data => { 
    $("#user").text(data.response.username);
});