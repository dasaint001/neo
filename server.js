const express = require('express')
const mongoose = require('mongoose')
const Email = require('mongoose-type-email')
const User = require('./models/userModel')
const app = express()

app.use(express.json())

//this is a test api for the checks
app.get('/', (req, res, next)=> {
    res.status(200).json({ 
        message: true,
        data: 'it works'
    })
})

//endpoint to add user
app.post('/user', async(req, res) => {

    try{
        const user = await User.create(req.body)
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const alpha = /^[A-Za-z\s]+$/;

        if (alpha.test(req.body.firstName) == false || alpha.test(req.body.lastName) == false || emailRegexp.test(req.body.email) == false) {
            res.status(400).json({message: 'only alphabets are allowed for name fields and a valid email address'})
            //console.log('This is not string');
        } else{
            { res.status(201).json({ 
                status: true,
                data: user
            })}
        }
       
    }catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//mongodb connection
mongoose.connect('mongodb+srv://admin:aTTiTude@neoapi.ilvcnzx.mongodb.net/neoapi?retryWrites=true&w=majority')
.then(() => {

    console.log('connected to MongDB')
    app.listen(3000, () => {
        console.log('api is running  on port 3000')
    });
   
}).catch((error) => {
    console.log(error)
})