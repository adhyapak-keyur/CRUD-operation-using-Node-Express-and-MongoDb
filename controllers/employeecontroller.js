const express = require('express');
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

var router = express.Router();

router.get('/', (req,res)=> {
    res.render('employee/addoredit', {
        viewTitle : 'Insert Employee Data'
    });
});

router.get('/list', (req,res)=> {
    Employee.find((err,docs) => {
        if(!err) {
            res.render('employee/list', {
                list: docs,
            });
        }
        else{
            console.log('Error in retriving Data:' + err);
        }
    });
})

router.get('/:id', (req,res)=> {
    Employee.findById((req.params.id), (err,docs)=> {
        if(!err) {
            res.render('employee/addoredit', {
                viewTitle : 'Update Employee Data',
                employeeinfo : docs
            });
        }
        else{
            console.log('Error in retriving Data:' + err);
        }
    });
});

router.get('/delete/:id', (req,res)=> {
    Employee.findByIdAndRemove(req.params.id, (err,docs)=> {
        if(!err) {
            res.redirect('http://localhost:3000/employee/list');
        }
        else{
            console.log('Error in deleting Data:' + err);
        }
    });
});

router.post('/', (req,res) => {
    if(req.body._id == '')
        insertRecord(req,res);
    else
        updateRecord(req,res);
});

function insertRecord(req,res){
    var employeeinfo = new Employee();
    employeeinfo.userName = req.body.userName;
    employeeinfo.email = req.body.email;
    employeeinfo.mobile = req.body.mobile;
    employeeinfo.country = req.body.country;
    employeeinfo.save((err,doc)=> {
        if(!err) {
            res.redirect('employee/list')
        }
        else{
            if(err.name == 'ValidationError') {
                handleValidateError(err,req.body);
                res.render('employee/addoredit', {
                    viewTitle : 'Employee Data',
                    employeeinfo : req.body
                }); 
            }
            console.log('Error during insertion:' + err);
        }
    });
}

function updateRecord(req,res) {
    Employee.findOneAndUpdate({_id : req.body._id}, req.body, {new : true}, (err,doc)=> {
        if(!err) {
            res.redirect('employee/list')
        }
        else{
            if(err.name == 'ValidationError') {
                handleValidateError(err,req.body);
                res.render('employee/addoredit', {
                    viewTitle : 'Update Employee Data',
                    employeeinfo : req.body
                }); 
            }
            console.log('Error during updation:' + err);
        }
    });
}

function handleValidateError(err,body) {
    for(field in err.errors) {
        switch(err.errors[field].path) {
            case 'userName' : body['userNameError'] = err.errors[field].message;
            break;

            case 'email' : 
                body['emailError'] = err.errors[field].message;
            break;

            default :
            break;
        }   
    }
}


module.exports = router;