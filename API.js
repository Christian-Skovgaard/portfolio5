const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

const arr = [{
    'navn':'træningscykel',
    'muskelgrupper': [
        'ben'
    ]},
    {'navn':'let_puldown',
    'muskelgrupper':['ryg','biceps']},
    {'navn':'armcurl',
        'muskelgrupper':['biceps']}
    ]


app.get('/hello', (req, res) => {
    res.send(const MongoClient = require("mongodb");
    const client = new MongoClient(uri);

    const database = client.db('fitness');
    const machines = database.collection('machines');

// Query for a movie that has the title 'Back to the Future'
    const query = { navn: 'Kaj' };
    const machine = machines.findOne(query);

    console.log(machine);
)
})



const { MongoClient } = require("mongodb");
const client = new MongoClient(uri);

const database = client.db('fitness');
const machines = database.collection('machines');

// Query for a movie that has the title 'Back to the Future'
const query = { navn: 'Kaj' };
const machine = machines.findOne(query);

console.log(machine);

const port = 3000

app.listen(port, ()=>{
    console.log("it's alive!");
});