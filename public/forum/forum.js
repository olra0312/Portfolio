
$.get("/getUsername").done(data => {
   //Write host ip address for chat room here
   //const socket = io.connect("192.168.0.21:3000");
   const socket = io.connect("100.25.46.147:3000");

   const username = data.response.username;

   $("#submit").click(() => {
      const time = new Date();
      const comment = time.getHours() + ":" + time.getMinutes() + " " + username + ": " + $("#comment").val();
      $("#comment").val("");
      socket.emit("User wrote:", { comment });
   });

   socket.on("User:", data => {
      console.log(6)
      $("#conversation").prepend(`<div>${data.comment}</div>`);
   });
   
});