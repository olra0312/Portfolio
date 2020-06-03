const router = require('express').Router();
const User = require('../models/User.js');



//Defining file system as a standard library.
const fs = require("fs");


///GET METHODS
router.get("/", (req, res) => {
    const head = fs.readFileSync("./public/navbar/navbar.html", "utf8");
    const foot = fs.readFileSync("./public/footer/footer.html", "utf8");
    const page = fs.readFileSync("./public/login/login.html", "utf8");
    return res.send(head + page + foot);

});

router.get("/getUsername", (req, res) => {
    return res.send({ response: req.session });
});

router.get("/signup", (req, res) => {
    const head = fs.readFileSync("./public/navbar/navbar.html", "utf8");
    const foot = fs.readFileSync("./public/footer/footer.html", "utf8");
    const page = fs.readFileSync("./public/signup/signup.html", "utf8");
    return res.send(head + page + foot);
});

router.get("/home", (req, res) => {
    if(req.session.login) {
        const head = fs.readFileSync("./public/navbar/navbar.html", "utf8");
        const foot = fs.readFileSync("./public/footer/footer.html", "utf8");
        const page = fs.readFileSync("./public/home/home.html", "utf8");
        return res.send(head + page + foot);
    } else {
        return res.redirect("/");
    }
});

router.get("/mail", (req, res) => {
    if(req.session.login) {
        const head = fs.readFileSync("./public/navbar/navbar.html", "utf8");
        const foot = fs.readFileSync("./public/footer/footer.html", "utf8");
        const page = fs.readFileSync("./public/mail/mail.html", "utf8");
        return res.send(head + page + foot);

    } else {
        return res.redirect("/");
    }
});

router.get("/about", (req, res) => {
    if(req.session.login) {
        const head = fs.readFileSync("./public/navbar/navbar.html", "utf8");
        const foot = fs.readFileSync("./public/footer/footer.html", "utf8");
        const page = fs.readFileSync("./public/about/about.html", "utf8");
        return res.send(head + page + foot);

    } else {
        return res.redirect("/");
    }
});

router.get("/chatbot", (req, res) => {
    if(req.session.login) {
        const foot = fs.readFileSync("./public/footer/footer.html", "utf8");
        const page = fs.readFileSync("./public/chatbot/chatbot.html", "utf8");
        return res.send(page + foot);

    } else {
        return res.redirect("/");
    }
});

router.get("/projects", (req, res) => {
    if(req.session.login) {
        const head = fs.readFileSync("./public/navbar/navbar.html", "utf8");
        const foot = fs.readFileSync("./public/footer/footer.html", "utf8");
        const page = fs.readFileSync("./public/projects/projects.html", "utf8");
        return res.send(head + page + foot);

    } else {
        return res.redirect("/");
    }
});

///POST METHODS

//Home-sidens autherization
router.post('/home', async (req, res) => {
//variable for the form data
const { username, password } = req.body;
//Selecting username and password. The username should match the username from the form
    try{
        const checkInfo = await User.query().select('username', 'password').where('username', username);

        if(checkInfo.length !==1) {
            return res.redirect("/");
        }

        if(checkInfo.length === 1) {

            if(password === checkInfo[0].password) {
                req.session.login = true;
                req.session.username = username;
                return res.redirect("/home");
            } else {
                return res.redirect("/");
            }
        }
    } catch(error) {
        return res.status(500).send({ response: "Something went wrong with the DB" });
    }
});
//log ud fra home siden. Undefined sættes for at resette session info, 
//På denne måde har brugeren ikke fortsat adgang til alle sider, når der logges ud.
router.post("/logout", (req, res) => {
    req.session.login = undefined;
    req.session.username = undefined;
    return res.redirect("/");
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        // password validation
        if (password.length < 8) {
            return res.status(400).send({ response: "Password must be 8 characters or longer" });
        } else {
            try {
                User.query().select('username').where('username', username).then(foundUser => {
                    if (foundUser.length > 0) {
                        return res.status(400).send({ response: "User already exists" });
                    } else {
                        User.query().insert({
                            username,
                            password
                        }).then(createdUser => {
                            res.redirect("/");
                        });
                    }
                });
            } catch (error) {
                return res.status(500).send({ response: "Something went wrong with the DB" });
            }
        }
    } else {
        return res.status(400).send({ response: "username or password missing" });
    }
});

module.exports = router;