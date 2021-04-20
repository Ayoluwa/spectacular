const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../routes/api/users");
const keys = require("./keys");
console.log(keys);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secretohqoh58@$%^&^ADF";
module.exports = passport => {
    console.log(opts)
    passport.use (
        
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done (null, false);

            })
            .catch(err => console.log(err));
        })
    )


}