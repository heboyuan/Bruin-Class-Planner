const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://sa.ucla.edu/ro/Public/SOC/Results?t=18W&sBy=subject&sName=Computer+Science+%28COM+SCI%29&subj=COM+SCI&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex');
    await page.click('h3 > a');
    await page.waitFor(1000);

    const result = await page.evaluate(() => {
        let title = document.querySelector('.instructorColumn').innerText;
        let price = document.querySelector('h3').innerText;

        return {
            title,
            price
        }

    });

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value); // Success!
});