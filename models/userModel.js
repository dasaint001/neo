const mongoose = require('mongoose')
require('mongoose-type-email');

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "the name field is required"]
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: mongoose.SchemaTypes.Email
        },
        phone: {
            type: Number
        }
        
    },
    {
        timestamps: true
    }
) 

const User = mongoose.model('User', userSchema);

module.exports = User;