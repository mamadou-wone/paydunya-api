const {
    InvoiceController
} = require('./../controller');

module.exports = (app) => {
    app.post('/invoice/state', InvoiceController.create);
};