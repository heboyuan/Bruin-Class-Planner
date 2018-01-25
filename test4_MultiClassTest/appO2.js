var Horseman = require("node-horseman"),
    async = require("async"),
    request = require('request'),
    cheerio = require('cheerio');

//input from front end
var classList = [
                    {professors:[],
                    find:false,
                    classSelector : '#CHEM0276AC>h3>a',
                    URL : "https://sa.ucla.edu/ro/Public/SOC/Results?t=18W&sBy=subject&sName=Chemistry+and+Biochemistry+%28CHEM%29&subj=CHEM&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex",
                    bruinLink : 'chem-c276a/'}
                    ,
                    {professors:[],
                    find:false,
                    classSelector : '#COMSCI0032>h3>a',
                    URL : "https://sa.ucla.edu/ro/Public/SOC/Results?t=18W&sBy=subject&sName=Computer+Science+%28COM+SCI%29&subj=COM+SCI&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex",
                    bruinLink : 'com-sci-32/'}
                    ,
                    {professors:[],
                    find:false,
                    classSelector : '#PHYSICS0004AL>h3>a',
                    URL : "https://sa.ucla.edu/ro/Public/SOC/Results?t=18W&sBy=subject&sName=Physics&subj=PHYSICS&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex",
                    bruinLink : 'physics-4al/'}
                    ,
                    {professors:[],
                    find:false,
                    classSelector : '#COMSCI0281A>h3>a',
                    URL : "https://sa.ucla.edu/ro/Public/SOC/Results?t=18W&sBy=subject&sName=Computer+Science+%28COM+SCI%29&subj=COM+SCI&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex",
                    bruinLink : 'com-sci-281a/'}
                    ];
    
var result = [],
    temp = {rating:""};

function haveNext(horseman){
    return horseman.evaluate(function(){
        return $( ".jPag-current:first" ).text() != (($( ".jPag-pages>li" ).length)/2).toString();
    });
}

function findClass(info,horseman){
    return horseman.wait(1150) //Wait01 wait for the page to load
        //.screenshot('test.png')
        .exists(info.classSelector)
        .then(function(exist){
            //console.log(info.classSelector);
            //console.log(info.classSelector)
            console.log(exist);
            if(exist){
                horseman.click(info.classSelector)
                            .wait(400)  //Wait02 for the drop down of the specific class
                            .evaluate(function(){
                                    var li = [];
                                    $( ".instructorColumn" ).each(function() {
                                        li.push($( this ).text());
                                    });
                                    return jQuery.unique(li);
                            })
                            .then(function(li){
                                info.find = true;
                                info.professors = info.professors.concat(li.slice(1));
                            })
            }
        })

}

function searchPage(info,horseman){
    return new Promise(function(resolve, reject){
        return findClass(info,horseman)
            .delay(950)//Wait03(Wait01 & 02) for findClass to finish
            .then(function(){
                if(info.find == false){
                    return haveNext(horseman)
                        .then(function(n){
                            if(n){
                                return horseman.click(".jPag-snext-img")
                                .then(searchPage(info,horseman))
                            }else{
                                console.log('class not offered')
                                return false;
                            }
                    });
                }
            })    
            .then(resolve);
    });
}


async.each(classList, function(info, callback){
    //console.log('1');
    var horseman = new Horseman();
    horseman.open(info.URL)
        .then(searchPage(info,horseman))
        .delay(12000) //Wait04(Wait01 & 02 & 03)
        .then(function(){
            async.each(info.professors, function(name, callback){
                var bruinSearchURL = "http://www.bruinwalk.com/search/?q=" + name;
                request(bruinSearchURL,function(error, response, html){
                    var $ = cheerio.load(html);
                    var profURL = "http://www.bruinwalk.com" + $(".professor-result").first().find("a").attr('href') + info.bruinLink;
                    var profURLAll = "http://www.bruinwalk.com" + $(".professor-result").first().find("a").attr('href') + "all";
                    request(profURL,function(error, response, html){
                            if (!error && response.statusCode == 200) {
                                var $ = cheerio.load(html);
                                temp.rating = $(".metric").text();
                                var l = [];
                                $( ".expand-area>p" ).each(function(){
                                    l.push($( this ).text());
                                });
                                result.push({name:name, rating:temp.rating, comments:l});
                                console.log(name + " have " + info.classSelector.substring(1,11));
                                callback();
                            }else if (!error && response.statusCode == 404){
                                request(profURLAll, function(error, response, html){
                                    if (!error && response.statusCode == 200) {
                                        var $ = cheerio.load(html);
                                        temp.rating = $(".metric").text();
                                        var l = [];
                                        $( ".expand-area>p" ).each(function(){
                                            l.push($( this ).text());
                                        });
                                        result.push({name:name, rating:temp.rating, comments:l});
                                        console.log(name + " have records");
                                        callback();
                                    }else{
                                        console.log(name + " doen't have " + info.classSelector.substring(1,11));
                                        result.push({name:name, rating:'N/A', comments:'N/A'});
                                        callback();
                                    }
                                })
                            }else{
                                console.log("error!!!");
                                callback();
                            }
                        });
                });
            },function(err){
                horseman.close();
                callback();
            });
        });
},function(err){
     console.log(result);
});

        