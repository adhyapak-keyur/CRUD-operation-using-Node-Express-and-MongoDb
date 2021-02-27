const mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    userName: {
        type: String,
        required : 'This field cannot be empty.'
    },
    email: {
        type: String,
        required : 'This field cannot be empty.'
    },
    mobile: {
        type: String
    },
    country: {
        type: String
    }
});

employeeSchema.path('email').validate((val) => {
    var emailRegex = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    return emailRegex.test(val);
}, 'Invalid Email')

mongoose.model('Employee',employeeSchema);