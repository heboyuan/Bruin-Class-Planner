var Horseman = require("node-horseman"),
    async = require("async"),
    request = require('request'),
    cheerio = require('cheerio');

var horseman = new Horseman();

//input from front end 
var classSelector = '#COMSCI0032>h3>a',
    URL = "https://sa.ucla.edu/ro/Public/SOC/Results?t=18W&sBy=subject&sName=Computer+Science+%28COM+SCI%29&subj=COM+SCI&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex",
    bruinLink = 'com-sci-32/';
    
var professors = {name:[], find:false},
    result = [],
    temp = {rating:""};

function haveNext(){
    return horseman.evaluate(function(){
        return $( ".jPag-current:first" ).text() != (($( ".jPag-pages>li" ).length)/2).toString();
    });
}

function findClass(){
    return horseman.exists(classSelector)
        .then(function(exist){
            if(exist){
                horseman.click(classSelector)
                            .delay(400)
                            //.screenshot('here.png')
                            .evaluate(function(){
                                    var li = [];
                                    $( ".instructorColumn" ).each(function() {
                                        li.push($( this ).text());
                                    });
                                    return jQuery.unique(li);
                            })
                            .then(function(li){
                                professors.find = true;
                                professors.name = professors.name.concat(li.slice(1));
                            })
            }else{
                return false;
            }
        })

}

function searchPage(){
    return new Promise(function(resolve, reject){
        return findClass()
            .delay(500)
            .then(function(){
                if(professors.find == false){
                    return haveNext()
                        .then(function(n){
                            if(n){
                                return horseman.click(".jPag-snext-img")
                                .delay(400)
                                .then(searchPage)
                            }else{
                                return false;
                            }
                    });
                }
            })    
            .then(resolve);
    });
}

horseman.open(URL)
    .then(searchPage)
    .delay(500)
    .then(function(){
        async.each(professors.name, function(name, callback){
            var horseman = new Horseman();
            horseman.open("http://www.bruinwalk.com/search/?q=" + name)
                .click('h1:eq(3)')
                .delay(200)
                .screenshot('test.png')
                .url()
                .then(function(url){
                    var horseman = new Horseman();
                    horseman.open(url + bruinLink)
                        .text('.metric')
                        .then(function(text){
                            temp.rating = text;
                        })
                        .text('.expand-area>p')
                        .then(function(text){
                            result.push({name:name, rating:temp.rating, comments:text});
                            //console.log(result);
                            callback();
                        })
                        .close()
                })
                .close();
        },function(err){
            console.log(result);
        });
    })
    //.delay(5000)
    .close();

        