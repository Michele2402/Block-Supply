const express = require('express');
const router = express.Router();
const {Request} = require('../models')
const {Company} = require('../models')
const {TransportationCompany} = require('../models')

router.post('/', async(req, res) => {
//this route is to create a fake request from a customer
    const {requestBody, companyName} = req.body

    try {
        const company = await Company.findAll({where: {companyName: companyName}})

        const request = await Request.create({
            requestBody: requestBody,
            CompanyInternetID: company[0].internetID
        });
        res.json(company);
    } catch (error) {
        res.json({error: error.message})
    }
})

router.post('/byCompany', async (req, res) => {
//this one get all the requests of a company
    const {companyInternetID} = req.body;

    try {
        const requests = await Request.findAll({where: {companyInternetID: companyInternetID}});
        res.json(requests)
    } catch (error) {
        res.json({error: error.message})
    }
 
})

router.post('/byTransportationCompany', async (req, res) => {
    const {transportationCompanyInternetID} = req.body;

    try {
        const requests = await Request.findAll({where: {transportationCompanyInternetID: transportationCompanyInternetID}});
        res.json(requests)
    } catch (error) {
        res.json({error: error.message})
    }
    
})

router.post('/byId', async (req, res) => {
    const {requestId} = req.body
    
    try {
        const request = await Request.findByPk(requestId)

        res.json(request)
    } catch (error) {
        res.json({error: error.message})
    }
})

router.post('/sendToTransp', async (req, res) => {
    const {requestId, transportationName} = req.body

    try {
        const request = await Request.findByPk(requestId)

        const transportationCompany = await TransportationCompany.findOne({where: {companyName: transportationName}})

        const updatedRequest = await request.set({
            TransportationCompanyInternetID: transportationCompany.internetID
        })

        await updatedRequest.save()

        res.json(request)
    } catch (error) {
        res.json({error: error.message})
    }
})

router.post('/delete', async (req, res) => {
    const {requestId} = req.body
    
    try {
        const request = await Request.findByPk(requestId)

        await request.destroy();

        res.json(request)
    } catch (error) {
        res.json({error: error.message})
    }
})

module.exports = router;