const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");


const validateRegisterInput = require("../../validation/register");
const validateLogininput = require("../../validation/login");

const User = require("../../Models/Users");


router.post("/register", (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

if(!isValid) {
    return res.status(400).json(errors)
}

User.findOne({email: req.body.email}).then(returnedStuff => {
    if(returnedStuff) {
        return res.status(400).json({email: " Ooops...Email already exists!"});
    } else{
        const newUser = new User ({
            name:req.body.name,
            email:req.body.email,
            hobbies:req.body.hobbies,
            password:req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });


    }
})

    //Hash password before saving in Database...

})

router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(item  => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
    });
    

    router.patch('/:id', async (req, res) => {
        try {
        const i_user = await User.findById(req.params.id);
        i_user.hobbies = req.body.hobbies
        const tellie = await i_user.save()
        res.json(tellie)
        } catch (err) {
            res.send ('Error')
        }
        
            
    });


    router.post("/login", (req, res) => {

        const {errors, isValid} = validateLogininput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const email = req.body.email;
            const password = req.body.password;


        User.findOne({email}).then(user => {
            if(!user) {
                return res.status(404).json({emailnotfound: "Email not found Here"
            })
        }
    
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };
            

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                    expiresIn: 31556000
                    },
                    (err, token) => {
                        res.json ({
                            success: true,
                            token: "Bearer" + token
                        });
                        }
                );
                } else {
                  return res
                    .status(400)
                    .json({passwordincorrect: "Password incorrect"});

                    }



        })












        })








    });

module.exports = router;











