/*
horseman+phantom
打开CS Search Result网页
点击CS31
打印课名和教授
*/
var Horseman = require('node-horseman');

var SELECTOR = '#COMSCI0031>h3>a';
var URL = 'https://sa.ucla.edu/ro/Public/SOC/Results?t=18W&sBy=subject&sName=Computer+Science+%28COM+SCI%29&subj=COM+SCI&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex';

var horseman = new Horseman();

horseman.open(URL)
    .click(SELECTOR)
    .delay(5000)
    .screenshot('test.png')
    // .text('#COMSCI0031>h3')
    // .then(function(text){
    //  console.log(text);   
    // })
    // .text('.instructorColumn')
    // .then(function(text){
    //  console.log(text);   
    // })
    .close()