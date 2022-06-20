const puppeteer = require('puppeteer');
const fs = require('fs');
const ejs = require('ejs');

class InvoiceService {

    async createPdf(meta) {
        const browser = await puppeteer.launch({
            headless: true
        })
        const page = await browser.newPage()
        const html = ejs.render(fs.readFileSync(`${__dirname}/invoice.template.ejs`, 'utf-8'), { meta });
        // console.log(html)
        await page.setContent(html, {
            waitUntil: 'domcontentloaded'
        })
        const pdf = await page.pdf({
            format: 'A4'
        })
        await browser.close();
        return pdf;

    }
}

module.exports = InvoiceService;