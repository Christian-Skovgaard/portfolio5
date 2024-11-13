const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

let db;
const client = new MongoClient('mongodb://localhost:27017/local');


client.connect()
    .then(() => {
        db = client.db(); // Use the connected database
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });


app.get('/hello', (req, res) => {
    res.send('hello')
})


const port = 3000

app.listen(port, ()=>{
    console.log("it's alive!");
});