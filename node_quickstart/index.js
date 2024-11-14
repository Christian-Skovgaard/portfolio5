const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/fitness";

const client = new MongoClient(uri);

const app = express();
app.use(express.json());
app.use(cors());



app.get('/hello', (req, res) => {
    res.send('omg, den virker!')
})

app.get('/paramcheck/:param1?/:param2?', (req, res) => {
    const reqObj = req.params
    res.send(reqObj.param1)
})

app.get('/search/:name?/:muskelgruppe?', (req, res) => {
    //making the parametors in the endpoint into object
    const reqObj = req.params
    //makes connection to the database
    const database = client.db('fitness');
    const machines = database.collection('machines');
    //query is the querry we use to search in the findOne function and returns it to the client
    const query = {navn: `${reqObj.name}`};
    machines.findOne(query).then(machine => {res.send(machine)})
})

app.get('/kaj', (req, res) => {
    const database = client.db('fitness');
    const machines = database.collection('machines');

    const query = {navn: 'Kaj'};
    machines.findOne(query).then(machine => {res.send(machine)})
})

app.get('/test/:param', (req, res) => {
    const database = client.db('fitness');
    const machines = database.collection('machines');

    const query = {navn: `${req.params.param}`};
    machines.findOne(query).then(machine => {res.send(machine)})
})


const port = 3000

app.listen(port, ()=>{
    console.log("it's alive!");
});