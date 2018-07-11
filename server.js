const bodyParser=require('body-parser');
const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));     
var port = process.env.PORT || 8080;
var uuid = require('uuid-v4');

var teams = [];

app.get('/teams', (req,res) => {
    res.json(teams);
});

app.get('/teams/:id', (req,res) => {
    var id = req.params.id;
    var index = teams.findIndex(item => {return item.id = id});
    if (index != -1) {
        res.json(teams[index]);        
    }
    else {
        res.sendStatus(404);
    }
});


app.post('/teams', (req,res) => {
    var id=uuid();
    var matches = [req.body.matches];
    teams.push({"id" : id, "name" : req.body.name, "is_still_in" : req.body.is_still_in, "matches" : matches});
    res.json({"id" : id, "name" : req.body.name, "is_still_in" : req.body.is_still_in, "matches" : matches});
});

app.put('/teams/:id', (req,res) => {
    var id = req.params.id;
    var matches = [req.body.matches];
    var index = teams.findIndex(item => {return item.id = id});
    if (index != -1) {
        var param = teams[index].id;
        teams[index]={"id" : param, "name" : req.body.name, "is_still_in" : req.body.is_still_in, "matches" : matches};
        res.json(teams[index]);
    }
    else {
        res.sendStatus(404);
    }
});


app.get('/matches', (req,res) => {
    res.json(matches);
});


app.listen(port);
console.log("Listen to port " + port);