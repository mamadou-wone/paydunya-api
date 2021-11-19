const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    data: [],
});

const Invoice = mongoose.model("invoice", invoiceSchema);

module.exports = Invoice;