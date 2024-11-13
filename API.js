const express = require('express');

const app = express();
app.use(express.json());

const obj = {
    'message':'hello'
}


app.get('/hello', (req, res) => {
    res.send(obj)
})


const port = 3000

app.listen(port, ()=>{
    console.log("it's alive!");
});