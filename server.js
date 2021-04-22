const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/api/users");

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());
const dbKeys = require("./config/keys").mongoURI;
const { urlencoded } = require('body-parser');

mongoose.connect(dbKeys, {useNewUrlParser: true} ).then(() => {
    console.log("MONGODB connected successfully");
})
  
const port = process.env.PORT || 5000;

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);


app.listen(port, () => {
    console.log(`Server is up and running on port ${port}!`);
});
