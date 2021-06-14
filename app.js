const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');


// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

// *** midlware ** //
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use('/upload', express.static('uploads'));




//** load routes file user */

const usersignup = require('./routes/User/users-signup');
const userlogin = require('./routes/User/user-login');
const userprofile = require('./routes/User/userprofile');
const gettoken = require('./routes/User/verifysession');


// *** admin load routes ** ///
const adminsignup = require('./routes/Admin/adminRegister');
const adminlogin = require('./routes/Admin/adminLogin');
const getusers = require('./routes/Admin/users');
const uplouadimage = require('./routes/Admin/uplaoud');


// **  user routes ** //
app.use('/users/register', usersignup);
app.use('/users/login', userlogin);
app.use('/user/profile', userprofile);
app.use('/users/me/access-token', gettoken);



// ** Admin Routes *** ///
app.use('/admin/register', adminsignup);
app.use('/admin/login', adminlogin);
app.use('/admin/users', getusers);
app.use('/user/upload', uplouadimage);







app.listen(3000, () => {
    console.log('server is listening on port : 3000');

})