const EventEmitter = require('events').EventEmitter;
const InvoiceService = require("../invoice/invoice.service")
const ejs = require('ejs');
const fs = require('fs');

const {
    sendPdf
} = require('./invoice.mail');

const eventEmitter = new EventEmitter();
const event = require('./invoice.event.js');


eventEmitter.on(event.newInvoice, async ({ user, Invoice }) => {
    const invoiceService = new InvoiceService()
    const pdf = await invoiceService.createPdf(Invoice)
    const html = ejs.render(fs.readFileSync(`${__dirname}/invoice.mail.template.ejs`, 'utf-8'), { user });
    sendPdf({ user, attachments: [{ data: pdf, filename: `${Invoice.data.invoiceNumber}.pdf`, }], html });
});


module.exports = eventEmitter;