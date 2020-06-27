const router = require('express').Router();

const User = require('../models/User.js');

router.get('/users', async (req, res) => {
    const allUsersWithComments = await User.query().select('username').withGraphFetched('comments');
    return res.send({ response: allUsersWithComments });
});

router.get('/getUsername', (req, res) => {
    if(req.session.login) {
        return res.send({response: req.session})
    }else{
        return res.redirect("/")
    }
});


module.exports = router;
