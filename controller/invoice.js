let Invoice = require("../models/invoicestate-model");
const CryptoJS = require('crypto-js');

/**
 * @author Mamadou WONE.
 * @module Invoice state
 */

module.exports = {

    /** Getting user's invoice state 
     * @param  {} req
     * @param  {} res
     */
    /**
     * @api {post} /invoice/state
     * @apiName create
     * @apiGroup Invoice
     *
     *
     * @apiParam {Array} data Data for the invoice
     *
     * @apiSuccess (Success 201) {Boolean} success If it works ot not
     * @apiSuccess (Success 201) {String} message Response message
     * @apiSuccess (Success 201) {UUID} idInvoice the invoice's ID
     * @apiSuccess (Success 201) {Object} token
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     *     {
     *       "success": true,
     *       "message": "Successfully created.",
     *       "data": Array,
     *       "id": 6cfb320a-bc39-48a6-b49f-3277646ad1d5 
     *     }
     */

    async create(req, res) {
        try {
            const newInvoice = new Invoice({
                data: req.body.data
            });
            var hash = CryptoJS.SHA512(process.env.MASTER_KEY);
            console.log(hash.toString());
            if (hash.toString(CryptoJS.enc.Hex) == req.body.data[0]['hash']) {
                newInvoice.save().then(async(invoice) => {
                    res.status(201).send({
                        success: true,
                        message: 'Successfully created.',
                        data: req.body.data,
                        id: invoice._id,
                    });
                    const filter = { _id: invoice._id };
                    const update = { token: req.body.data[0]['invoice']['token'], phone: req.body.data[0]['customer']['phone'] };
                    let doc = await Invoice.findOneAndUpdate(filter, update);
                }).catch((error) => res.status(400).send(error));
            } else {
                res.status(503).send({
                    success: false,
                    message: 'Vérifier votre master key !',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },


    /**
     * @api {get} /invoice get invoice by token and phone
     * @apiName getInvoice
     * @apiGroup Invoice
     *
     *
     * @apiSuccess (Success 200) {Object} result Invoice
     */
    getInvoice(req, res) {
        const token = req.body.token;
        const phone = req.body.phone;
        Invoice.find({ token: token, phone: phone }).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving invoice."
            });
        });
    }

}