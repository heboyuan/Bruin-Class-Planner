var Horseman = require('node-horseman');
var express = require("express");

var app = express();

var ProfName = 'Stahl';
var Class = 'com-sci-31/';
var URL = "http://www.bruinwalk.com/search/?q=" + ProfName;


function getProf(callback){
    var horseman = new Horseman();
    horseman.open(URL)
        .evaluate(function(selector){
            var els = $(selector);
            $.each(els, function(i, el) {
                var event = document.createEvent('MouseEvent');
                event.initEvent('click', true, true);
                el.dispatchEvent(event);
            });
        }, 'h1:eq(3)')
        .delay(200)
    .delay(1000)
    .screenshot('test1.png')
    .text('.metric')
    .then(function(text){
     result.com = text;   
    })
    .text('.expand-area>p')
    .then(function(text){
     result.rat = text;   
    })
    .url()
    .then(function(url){
        callback(url);
    })
    .close();
}

app.get("/",function(req,res){
    var result = {comments:"default", rating:"default"};
    var horseman = new Horseman();
    horseman.open(URL)
        .evaluate(function(selector){
            var els = $(selector);
            $.each(els, function(i, el) {
                var event = document.createEvent('MouseEvent');
                event.initEvent('click', true, true);
                el.dispatchEvent(event);
            });
        }, 'h1:eq(3)')
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
                .then(function(){
                    res.send(result.rating+ result.comments);
                })
                .close();
        })

});

app.listen(process.env.PORT, process.env.IP,function(){
  console.log('Started')
})