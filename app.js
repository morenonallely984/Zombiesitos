var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var Forecastlo = require("forecastio");
var http = require('http');

var app = express();

//Aquí va la llave 
var weather = new Forecastlo("17e975ba8a1461ab5e4dc9a5057630e5");

app.use(express.static(path.resolve(__dirname,"public")));
app.set("views", path.resolve(__dirname,"views"));
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("index");
});

app.get("/",function(req, res){
    res.send("/armas.ejs")
}); 
app.get("/armas",function(req, res){
    res.render("armas")
});

app.get("/",function(req, res){
    res.send("/clases.ejs")
});

var publicPath = path.resolve(__dirname,'public');
app.use('/recursos',express.static(publicPath));

app.get("/clases",function(req, res){
    res.render("clases")
});

app.get("/",function(req, res){
    res.send("/index.ejs")
});
app.get("/index",function(req, res){
    res.render("index")
});

app.get("/",function(req, res){
    res.send("/victimas.ejs")
});
app.get("/victimas",function(req, res){
    res.render("victimas")
});

app.get(/^\/(\d{5})$/,function(req,res,next){
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if(!location.zipcode){
        next();
        return;
    }



   
});

app.use(function(req,res){
    res.status(404).render("404");
});
app.listen(3000);

