const express    = require('express');
const app        = express();
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const session    = require('express-session');
const server = require("http").createServer(app);
const io     = require("socket.io")(server);


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
	secret: 'Tesseract',
	resave: false,
	saveUninitialized: true
}));


//KNEX\\
const { Model } = require('objection');
const Knex      = require('knex');
const knexfile  = require('./knexfile.js');
const knex      = Knex(knexfile.development);

Model.knex(knex);


//ROUTES\\
const authRoute  = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');

app.use(authRoute);
app.use(usersRoute);


//Getting access to static files such as CSS, images, videos etc.\\
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/public/createUser'));
app.use(express.static(__dirname + '/public/navbar'));
app.use(express.static(__dirname + '/public/signup'));
app.use(express.static(__dirname + '/public/login'));
app.use(express.static(__dirname + '/public/home'));
app.use(express.static(__dirname + '/public/mail'));
app.use(express.static(__dirname + '/public/about'));
app.use(express.static(__dirname + '/public/chatbot'));
app.use(express.static(__dirname + '/public/projects'));
app.use(express.static(__dirname + '/public/forum'));



//GET\\
app.get("/login", (req, res) => {
   return res.sendFile(__dirname + "/public/login/login.html");
 });

 app.get("/home", (req, res) => {
   return res.sendFile(__dirname + "/public/home/home.html");
 });

 app.get("/signup", (req, res) => {
   return res.sendFile(__dirname + "/public/signup/signup.html");
 });

 app.get("/mail", (req, res) => {
   return res.sendFile(__dirname + "/public/mail/mail.html");
 });

 app.get("/about", (req, res) => {
   return res.sendFile(__dirname + "/public/about/about.html");
 });

 app.get("/chatbot", (req, res) => {
   return res.sendFile(__dirname + "/public/chatbot/chatbot.html");
 });

app.get("/projects", (req, res) => {
   return res.sendFile(__dirname + "/public/projects/projects.html");
});

app.get("/forum", (req, res) => {
   return res.sendFile(__dirname + "public/forum/forum.html");
});




 //POST
 app.post("/logout", (req, res) => {
   req.session.login = undefined;
   req.session.username = undefined;
   return res.redirect("/");
});


////EMAIL\\\\
app.post('/mail',(req,res,next)=>{
   console.log(req.body)

   const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
   user: 'olra0312@gmail.com',//ændrer den mail der skal sendes fra
   pass: 'Ramstedt123'//Password til ovenstående mail
   }
   });
    

const mailOptions = {
   from: 'olra0312@gmail.com',//Den mail der sendes fra
   to: 'olra0312@gmail.com' ,//Den mail der sendes til
   subject: `Contact name: ${req.body.name}`,
   html:`<h1>Contact details</h1>
   <h2> Navn:${req.body.name} </h2>
   <h2> Email:${req.body.email} </h2>
   <h2> Telefonnummer:${req.body.phonenumber} </h2><br>
   <h2> Besked:${req.body.message} </h2><br>`
   };


transporter.sendMail(mailOptions, function(error, info){
   if (error) {
   console.log(error);
   res.send('error') 
   }
   else {
   console.log('Email sent: ' + info.response);
   res.redirect("/home");
   }
   });
})


///FORUM\\\

//Socket setup
io.on("connection", socket => {
   console.log("test1")
   socket.on("User wrote:", (data) => {
       io.emit("User:", { comment: data.comment }); 
   });
});


server.listen(3000, (error) => {
   if (error) {
       console.log("Error running the server");
   }
   console.log("The server is running on port", 3000);
});
