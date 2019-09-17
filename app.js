var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Parola = require("./models/definizione");

mongoose.connect("mongodb://localhost:27017/dizionario", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);



app.get("/", function(req, res){
    res.render("index");
});

app.get("/storia", function(req, res){
    res.render("storia");
});

app.get("/italiano", function(req, res){
    res.render("italiano");
});

app.get("/storia/nuovo", function(req, res){
    res.render("storia/nuovo"); 
 });

app.get("*", function(req, res){
    res.render("404");
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Started");
});