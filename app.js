var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Parola = require("./models/definizione");

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, function(){
    console.log("Database collegato!");
});
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

// var port = process.env.PORT || 3000;
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Server Started");
});