const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/fitness";

const client = new MongoClient(uri);

//test function
async function run() {
    try {
        const database = client.db('fitness');
        const machines = database.collection('machines');

        // Query for a movie that has the title 'Back to the Future'
        const query = { navn: 'Kaj' };
        const machine = await machines.findOne(query);

        console.log(machine);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

app.get('/hello', (req, res) => {
    res.send('hello')
})


const port = 3000

app.listen(port, ()=>{
    console.log("it's alive!");
});