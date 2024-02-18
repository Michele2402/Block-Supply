const express = require('express');
const router = express.Router();
const {RequestB2B} = require('../models')
const {Company} = require('../models')
const {TransportationCompany} = require('../models')

router.post('/', async (req,res) => {
    const {askingCompanyInternetID, receivingCompanyName, requestBody, transportationCompanyName} = req.body

    try {
        const receivingCompany = await Company.findOne({where: {companyName: receivingCompanyName}})
        const transortationCompany = await TransportationCompany.findOne({where: {companyName: transportationCompanyName}})

        const requestB2B = await RequestB2B.create({
            requestBody: requestBody,
            askingCompanyInternetID: askingCompanyInternetID,
            receivingCompanyInternetID: receivingCompany.internetID,
            transportationCompanyInternetID: transortationCompany.internetID
        })

        res.json(requestB2B);
    } catch (error) {
        res.json({error: error.message})
    }
})

router.post('/sent', async(req, res) => {
    const {askingCompanyID} = req.body;

    try {
        const requests = await RequestB2B.findAll({where: {askingCompanyInternetID: askingCompanyID}})

        res.json(requests)
    } catch (error) {
        res.json({error: error.message})
    }
})

router.post('/byTranspCompany', async(req, res) => {
    const {transportationCompanyID} = req.body;

    try {
        const requests = await RequestB2B.findAll({where: {transportationCompanyInternetID: transportationCompanyID}})

        res.json(requests)
    } catch (error) {
        res.json({error: error.message})
    }
})


router.post('/received', async(req, res) => {
    const {receivingCompanyID} = req.body;

    try {
        const requests = await RequestB2B.findAll({where: {receivingCompanyInternetID: receivingCompanyID}})

        res.json(requests)
    } catch (error) {
        res.json({error: error.message})
    }
})

router.post('/sendQuote', async(req, res) => {
    const {requestID, quote} = req.body

    try {
        const request = await RequestB2B.findByPk(requestID);

        const requestWithQuote = await request.set({
            quote: quote,
            quoteSent: true,
            quoteAccepted: null
        })

        requestWithQuote.save()

        res.json(requestWithQuote)
    } catch (error) {
        res.json({error: error.message})
    }
})

router.post('/handleQuote', async (req, res) => {
    const {requestID, value} = req.body
    
    try {
        const request = await RequestB2B.findByPk(requestID);

        const updatedQuote = await request.set({
            quoteAccepted: value
        })

        updatedQuote.save()

        res.json(updatedQuote)
    } catch (error) {
        res.json({error: error.message})
    }
})

router.post('/delete', async (req, res) => {
    const {requestId} = req.body
    
    try {
        const request = await RequestB2B.findByPk(requestId)

        await request.destroy();

        res.json(request)
    } catch (error) {
        res.json({error: error.message})
    }
})

module.exports = router;