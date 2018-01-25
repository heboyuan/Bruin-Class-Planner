var Horseman = require("node-horseman");

var horseman = new Horseman();

horseman.open('https://sa.ucla.edu/ro/Public/SOC/Results?t=18W&sBy=subject&sName=Mathematics+%28MATH%29&subj=MATH&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex')
    .click(".jPag-snext-img")
    .delay(1000)
    .click(".jPag-snext-img")
    .delay(1000)
    .click('#MATH0182>h3>a')
    .delay(1000)
    .screenshot('test.png')
    .close()
    