const express = require('express');

const app = express();
app.use(express.json());

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
    res.send(arr)
})


const port = 3000

app.listen(port, ()=>{
    console.log("it's alive!");
});