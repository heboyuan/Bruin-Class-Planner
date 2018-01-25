var Horseman = require('node-horseman');
var express = require("express");
var bodyParser = require("body-parser");

//helloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
// hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi
//welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome welcome
//→_→

var app = express();
app.use(bodyParser.urlencoded({extended:true}));

var Class;
var URL = 'https://sa.ucla.edu/ro/Public/SOC/Results?t=18W&sBy=subject&sName=Computer+Science+%28COM+SCI%29&subj=COM+SCI&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex';

var result = {comments:"default", rating:"default"},
    professor = {name:"default"};

app.get("/",function(req,res){
    res.render("index.ejs");
});

app.get("/search",function(req,res){
    res.render("result.ejs",{result:result, professor:professor});
})

app.post("/search",function(req,res){
    var selector = '#' + req.body.class + '>h3>a';
    if (req.body.class == 'COMSCI0031'){
        Class = 'com-sci-31/';
    }else{
        Class = 'com-sci-180/';
    }
    var horseman = new Horseman();
    //console.log("here");
    horseman.open(URL)
    .exists(selector)
    .then(function(exist){
        if(!exist){
            horseman.click(selector)
        }
    })
    .delay(200)
    .text('.instructorColumn')
    .then(function(text){
        professor.name = text.substring(13);
        console.log(professor.name);
        var horseman = new Horseman();
        horseman.open("http://www.bruinwalk.com/search/?q=" + professor.name)
            .click('h1:eq(3)')
            .delay(200)
            .url()
            .then(function(url){
                var horseman = new Horseman();
                horseman.open(url + Class)
                    .text('.metric')
                    .then(function(text){
                        result.rating = text;
                    })
                    .text('.expand-area>p')
                    .then(function(text){
                        result.comments = text;
                    })
                    .status()
                    .then(function(status){
                        // console.log(result.comments);
                        // console.log(result.rating);
                        if (status != 200){
                            res.send("error");
                        }else{
                            res.redirect("/search");
                        }
                    })
                    .close();
            })
    })
    .close()
    
    

});

app.listen(process.env.PORT, process.env.IP,function(){
  console.log('Started')
})
