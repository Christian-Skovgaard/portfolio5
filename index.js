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

//this is the formatting functions. They format strings or arrays into objects that can be pushed to our $and-query. This makes it easy to add more filters in the future.
function formatString (field, value) { return {[field]: value}}     //the squrebrackets is there because otherwise the key would just be called 'field', and not the varieble, field

function formatArray (field, arr) {
    //this function makes the arr into an $or funciton so that every keyvalue is searched for idividualy, if we only wanted the machinens that included the filters we could use $all instead
    const arrayQuery = {$or: []}
    for (value of arr) {
        const valueObj = {[field]: `${value}`}
        arrayQuery.$or.push(valueObj)
    }
    return arrayQuery
}

const getArrFromAPIString = (str) => str.split('.')     //this function decodes the filter-array from the string, and is the opposite to the getAPIStringFromArr function in the front-end script


app.get('/search/name=:name?;musclegroup=:musclegroup?;difficulty=:difficulty?', (req, res) => {
    //welcome to the temple of the search api! Here we take all the params if they are brought forth and sacrifice them to the formatting functions appropriate to their type. Then, they shall be reincarnated as a new variable to best serve in the image of the all mighty $and-query. And they shall be doomed to eternal servitude in the $and-arrays service!
    const reqObjParams = req.params
    const query = {$and: []}
    if (reqObjParams.name) {
        const formattedName = formatString('name',reqObjParams.name)
        query.$and.push(formattedName)
    }
    if (reqObjParams.musclegroup) {
        const muscleArr = getArrFromAPIString(reqObjParams.musclegroup)
        const formattedArr = formatArray('musclegroup',muscleArr)
        query.$and.push(formattedArr)
    }
    if (reqObjParams.difficulty) {
        const difficultyArr = getArrFromAPIString(reqObjParams.difficulty)
        const formattedArr = formatArray('difficulty',difficultyArr)
        query.$and.push(formattedArr)
    }
    machines.find(query).toArray().then(result => {
        console.log(query)
        res.send(result)
    })
})

app.get('/search/displayCategoryValues/:category', (req, res) => {
    //this endpoint gives all posible keyvalues of a specific key in the database, and is used to find all the relevant filters in the frontend search.
    const valueArr = []
    const key = req.params.category
    console.log(key)
    //we fetch the entire DB and then selects only the data we need from the objects and return them in a array
    machines.find({}).toArray().then(result => {
        for (machine of result) {
            //we check if the keyvalue we check is an array
            if (typeof machine[key] === 'object') {
                for (index of machine[key]) {
                    valueArr.push(index)
                }
            }
            else {
                valueArr.push(machine[key])
            }
        }
        res.send(valueArr)
    })
})

//userDB



const port = 3000

app.listen(port, ()=>{
    console.log("it's alive!");
});


//not relevant

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

//$or: [
//      {musclegroup: "wrist"},
//      {musclegroup: "core"}
// ]