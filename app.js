const { Int32 } = require('bson')
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

let app = express()
let port = 3000

//add code to parse data in the body of request
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

//connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/family', {useNewUrlParser: true, useUnifiedToploogy: true}, (error) => {
    if(!error) {
        console.log('Successfully connected to database')
    } else {
        console.log('Error connecting to databse')
    }
})

//create a schema for the database
let familySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "required"
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
})

//create a model from the schema
let Member = mongoose.model('Member', familySchema)

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html')
})

//creating the end point to receive the post request
app.post('/send-details', (req, res) => {
    let familyData = new Member(req.body)
    familyData.save()
        .then(item => {
            res.send('Family member has been saved to database')
        })
        .catch(err => {
            res.status(400).send('Unable to save to database')
        })
})

//starting the server
app.listen(port, ()=> {
     console.log('Server listening on port ' + port)
})