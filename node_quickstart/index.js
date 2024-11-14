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

app.get('/paramcheck/:param1?/:param2?', (req, res) => {
    const reqObj = req.params
    res.send(reqObj)
    console.log(reqObj)
})

app.get('/search/:name?/:muskelgruppe?', (req, res) => {
    //query is the querry we use to search in the findOne function and returns it to the client
    const query = {navn: `${req.params.name}`};
    machines.findOne(query).then(machine => {res.send(machine)})
})


const port = 3000

app.listen(port, ()=>{
    console.log("it's alive!");
});