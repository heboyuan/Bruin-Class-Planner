var page = require("webpage").create();
page.open("https://sa.ucla.edu/ro/Public/SOC/Results?t=18W&sBy=subject&sName=Computer+Science+%28COM+SCI%29&subj=COM+SCI&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex", function(status) {
	console.log("Status: " + status);
	if(status === "success") {
		var result = page.evaluate(function(){
		    var el = document.querySelector('#COMSCI0031>h3>a');
            var event = document.createEvent('MouseEvent');
            event.initEvent('click', true, true);
            el.dispatchEvent(event);
			return 1;//document.querySelector('.instructorColumn').textContent; 
		});
		page.render('phantom.png');
		console.log(result)
	}
phantom.exit();
});