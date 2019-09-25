var express = require("express");
var app = express();
require('dotenv').config();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Parola = require("./models/definizione");
var ParolaIta = require("./models/definizioneItaliano");
var flash = require("connect-flash");

mongoose.connect(process.env.DATABASE, { useUnifiedTopology: true, useNewUrlParser: true }, function(){
    console.log("Database collegato!");
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(flash());

app.use(require("express-session")({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });

app.get("/", function(req, res){
    res.render("index");
});

app.get("/storia", function(req, res){
    Parola.find({}, function(err, parole){
        if(err){
            req.flash("error", "Errore: " + err);
            res.redirect("/");
        } else {
            res.render("storia", {parole:parole});
        }
    });
    
});

app.get("/italiano", function(req, res){
    ParolaIta.find({}, function(err, parole){
        if(err){
            req.flash("error", "Errore: " + err);
            res.redirect("/");
        } else {
            res.render("italiano", {parole:parole})
        }
    });
});

app.get("/storia/nuovo", function(req, res){
    res.render("storia/nuovo"); 
 });

app.post("/storia/nuovo", function (req, res) {
        var nuovaParola = new Parola({ parola: req.body.parola, significato: req.body.definizione });
        Parola.create(nuovaParola, function (err, nuovaParolaDB) {
            if (err) {
                req.flash("error", "Errore: " + err);
                res.redirect("/");
            } else {
                req.flash("success", "Definizione aggiunta!");
                res.redirect("/storia");
            }
        });
    }
);

app.get("/storia/:id/eteled", function (req, res){
    Parola.findOneAndDelete(req.params.id, function(err){
        if(err){
            req.flash("error", "Errore: " + err);
            res.redirect("/");
        } else {
            req.flash("success", "Definizione eliminata!");
            res.redirect("/storia");
        }
    });
});

app.get("/italiano/nuovo", function(req, res){
    res.render("italiano/nuovo"); 
 });

app.post("/italiano/nuovo", function (req, res) {
        var nuovaParola = new ParolaIta({ parola: req.body.parola, significato: req.body.definizione });
        ParolaIta.create(nuovaParola, function (err, nuovaParolaDB) {
            if (err) {
                req.flash("error", "Errore: " + err);
                res.redirect("/")
            } else {
                req.flash("success", "Definizione aggiunta!");
                res.redirect("/italiano");
            }
        });
    }
);

app.get("/italiano/:id/eteled", function (req, res){
    ParolaIta.findOneAndDelete(req.params.id, function(err){
        if(err){
            req.flash("error", "Errore: " + err);
            res.redirect("/");
        } else {
            req.flash("success", "Definizione eliminata!");
            res.redirect("/italiano");
        }
    });
});

app.get("*", function(req, res){
    res.render("404");
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Server Started");
});