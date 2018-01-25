var express = require('express'),
    bodyParser = require("body-parser");
    
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));


app.get("/search",function(req,res){
    res.render("Output.ejs");
});

app.get("/",function(req,res){
    res.render("index.ejs");
});


app.listen(process.env.PORT, process.env.IP,function(){
  console.log('Started')
})
