const express = require('express');

const app = express();
const expressLayouts=require('express-ejs-layouts');
const mongoose = require('mongoose');
const db = require('./config/keys').MONGOURI;
const session = require('express-session');
const passport =require('passport');

require('./config/passport')(passport);

//Connect to MongoDb
mongoose.connect(db,
    {useNewUrlParser:true},
    ()=> console.log('MongoDb Connected')
    );


//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//BodyParser
app.use(express.urlencoded({extended:false}));

//session
app.use(session({
    secret:'some',
    resave:true,
    saveUninitialized:true
}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/',require('./routes/index'));
app.use('/courses',require('./routes/courses'));
app.use('/students',require('./routes/students'));
app.use('/teachers',require('./routes/teachers'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> console.log(`Server Started at ${PORT}` ));