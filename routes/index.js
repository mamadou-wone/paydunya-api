const {
    InvoiceController
} = require('./../controller');

module.exports = (app) => {
    app.post('/invoice/state', InvoiceController.create);
    app.post('/invoice', InvoiceController.getInvoice);
};