const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/fitness";

const client = new MongoClient(uri);

//det her er databasen i mongoDB som var har lagt i en variable
const database = client.db('fitness');
//her er collectionen af machines i en variable så vi kan refrence den i vores api-er
const machines = database.collection('machines');

const app = express();
app.use(express.json());
app.use(cors());



app.get('/test', (req, res) => {
    res.send('omg, den virker!')
})

app.get('/paramcheck/p1=:param1?;p2=:param2?', (req, res) => {
    const reqObj = req.params
    res.send(reqObj)
    console.log(reqObj)
})

app.get('/search/old/:name', (req, res) => {
    //query is the querry we use to search in the findOne function and returns it to the client
    const query = {name: `${req.params.name}`}
    machines.findOne(query).then(machine => {
        res.send(machine)
        console.log(machine)
    })
})

//this is the formatting functions. They format strings or arrays into objects that can be pushed to our $and-query. This makes it easy to add more filters in the future.
function formatString (field, value) { return {[field]: value}}     //the squrebrackets is there because otherwise the key would just be called 'field', and not the varieble, field

function formatArray (field, arr) {
    const arrayQuery = {$or: []}
    for (value of arr) {
        const valueObj = {[field]: `${value}`}
        arrayQuery.$or.push(valueObj)
    }
    return arrayQuery
}

console.log(formatArray('group',['yes','frø']))

app.get('/search/name=:name?;musclegroup=:musclegroup?;difficulty=:difficulty?', (req, res) => {
    const query = {$and: []}

    const reqObj = req.params
    console.log(reqObj)
    res.send(reqObj)
})

//$or: [
//      {musclegroup: "wrist"},
//      {musclegroup: "core"}
// ]

//userDB



const port = 3000

app.listen(port, ()=>{
    console.log("it's alive!");
});

const query = {$and: []}
query.$and.push(2)
query.$and.push('hej')
console.log(query)

const trainingset = [
    {
        id: 1,
        name: "weights",
        musclegroup: ['arm','bicpts','wrist'],
        difficulty: "easy",
        dangerlevel: "minimal"
    },
    {
        id: 2,
        name: "rowmachine",
        musclegroup: ['arm','bicpts','core','abs'],
        difficulty: "medium",
        dangerlevel: "minimal"
    }
]