require('./models/employeedb');
var employeeController = require('./controllers/employeecontroller')
const express = require('express');
const path = require('path');
const Handlebars = require('handlebars')
const expressHbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

app.get('/', (req,res)=> {
    res.redirect('/employee');
});

app.use('/employee', employeeController);

app.set('views', path.join(__dirname,'/views/'));
app.engine('hbs', expressHbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/', 
    handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'hbs');


const port = process.env.PORT || 3000;
app.listen(port, (err)=> {
    if(!err){
        console.log('Server started ar port:' + port);
    }
    else {
        console.log('Something went wrong')
    }
})