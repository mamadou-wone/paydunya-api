const {
    InvoiceController
} = require('./../controller');

module.exports = (app) => {
    app.post('/invoice/state', InvoiceController.create);
    app.get('/invoice', InvoiceController.getInvoice);
};