const User = require('./models/User');

module.exports.emailExists = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(findResult => {
        if(findResult){
            res.send({error: "Email already exists"})
        }else{
            next()
        }
    }).catch(err => {
        res.send(err)
    })
}