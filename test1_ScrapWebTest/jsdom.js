var jsdom;
try {
  jsdom = require("jsdom/lib/old-api.js"); // jsdom >= 10.x
} catch (e) {
  jsdom = require("jsdom"); // jsdom <= 9.x
}

var url = 'https://sa.ucla.edu/ro/Public/SOC/Results?t=18W&sBy=subject&sName=Computer+Science+%28COM+SCI%29&subj=COM+SCI&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex';
jsdom.env(url, [ 'https://code.jquery.com/jquery-3.2.1.min.js' ], done);


function done (errors, window) {
    
  window.$('h3').trigger( "click" );
  var course = window.$('h3').children();
  var instr = window.$('.instructorColumn');
  console.log(course.text());
  console.log(instr);
  window.close();
}