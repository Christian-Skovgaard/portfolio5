const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/fitness";

const client = new MongoClient(uri);

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