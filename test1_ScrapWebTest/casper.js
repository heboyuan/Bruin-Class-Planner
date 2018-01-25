var casper = require('casper').create();

casper.then(function(){
    console.log("Start:");
  })
  casper.thenOpen("https://sa.ucla.edu/ro/Public/SOC/Results?t=18W&sBy=subject&sName=Computer+Science+%28COM+SCI%29&subj=COM+SCI&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex");
  
  casper.then(function(){
    // scrape something else
    this.echo(this.getHTML('h3'));
  })
  
  casper.thenClick("#h3>a");
   casper.then(function(){
    // scrape something else
    this.echo(this.getHTML('.instructorColumn'));
  });

casper.run(); 