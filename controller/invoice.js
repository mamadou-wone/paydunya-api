let Invoice = require("../models/invoicestate-model");

/**
 * @author Mamadou WONE.
 * @module Invoice management
 */

module.exports = {

    async create(req, res) {
        try {
            const newInvoice = new Invoice({
                data: req.body.data
            });
            console.log(req.body.data);
            newInvoice.save().then((invoice) => {
                res.status(201).send({
                    success: true,
                    message: 'Successfully created.',
                    data: req.body.data,
                    id: invoice._id
                })
            }).catch((error) => res.status(400).send(error));
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

}