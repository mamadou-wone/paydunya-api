const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    data: [],
    token: {
        type: String,
    },
    phone: {
        type: String,
    }
});

const Invoice = mongoose.model("invoice", invoiceSchema);

module.exports = Invoice;