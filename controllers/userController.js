const User = require('./../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const Activity = require('./../models/Activity')

const {createAccessToken} = require("../auth.js")

const s3 = new aws.S3({
    accessKeyId: "AKIAS7CZUDCN5QXOWQFZ",
    secretAccessKey: "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",
    region: "ap-southeast-1",
});


module.exports.registerUser = (req, res) => {
    const hashedPw = bcrypt.hashSync(req.body.password, 10)
    if(req.body.password.length < 8) return res.send({err:"Password needs to be at least 8 characters"})

    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPw

    })

    newUser.save()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.send(err)
    })
}

module.exports.loginUser = (req, res) => {
    User.findOne({email: req.body.email})
    .then(foundUser => {
        if(foundUser === null){
            res.send({err: "Email is not registered"})
        }else{
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, foundUser.password)
            if(isPasswordCorrect){
                res.send({accessToken: createAccessToken(foundUser)})
            }else{
                res.send({err: "Password is incorrect"})
            }
        }
    }).catch(err => {
        res.send(err)
    })
}

module.exports.userDetails = (req,res) => {

	User.findById(req.user.id, {password: 0})
	.then(foundUser => {
		res.send(foundUser)
	})
	.catch(error => {
		res.send(error)
	})

}

module.exports.updateUserDetails = (req, res) => {
    let userId = req.user.id
    let updates= {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        updatedAt: Date.now()
    }
    let options = {
        new: true
    }
    User.findByIdAndUpdate({_id: userId}, updates, options).then(updatedUser=>{

        let activity = new Activity({
            userId: userId,
            activity: [{
                updateProfile: updatedUser.updatedAt
            }]
        });
        console.log(activity)
        activity.save().then(result=>{
            console.log(result)
            res.send({
                message: "Logged",
                data: result
            })
        }).catch(err=>{
            res.send(err)
        })
        res.send({
            message: "Information updated",
            data: updatedUser
        })
        
        
    }).catch(err=>{
        res.send(err);
    })
}

const upload = (bucketName) => multer({
    storage: multerS3({
        s3,
        bucket: bucketName,
        metadata: function (req, file, cb){
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req,file,cb){
            cb(null, `image-${Date.now()}.jpeg`)
        },
    })
});

module.exports.setProfilePic = (req, res, next) => {
    console.log(req.file);

    const uploadSingle = upload("profile-picture-upload-dorxata").single('croppedImage');

    uploadSingle(req,res, async (err) =>{
        let userId = req.user.id
    
        if(err) 
        return res.status(400).json({success:false, message: err.message})
        await User.findByIdAndUpdate({_id: userId},{$set:{photoUrl: req.file.location}})
        res.status(200).json({data:req.file.location});
    });
    
}

