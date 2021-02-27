const mongoose = require('mongoose');
require('./employess');

mongoose.connect('mongodb://localhost:27017/EmployeeDB',  {useNewUrlParser : true, useUnifiedTopology: true, useFindAndModify: false}, (err)=> {
    if(err) {
        console.log('Error in DB Connection' + err);
    }
    else {
        console.log('Successfully connected with DB');
    }
});







