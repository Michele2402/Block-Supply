const express = require('express');
const router = express.Router();
const {Company} = require('../models')
const {TransportationCompany} = require('../models')

router.get('/', async (req, res) => {
    const listofComp = await Company.findAll();
    res.json(listofComp)
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const company = await Company.findByPk(id);
    res.json(company)
})

router.post('/', async (req, res) => {
    const company = req.body   
    try {
        if(company.type_of_company == "Supplier") {
            const createdCompany = await Company.create(company); 
            res.json(createdCompany);
        } else   {
            const createdTransportationCompany = await TransportationCompany.create(company)
            res.json(createdTransportationCompany)
        }
    } catch (error) {
        res.json({error: "something went wrong"})
    }
   
})

router.post('/checkprincipal', async (req, res) => {
    const {value} = req.body

    try {
        const company = await Company.findOne({
            where: {
              internetID: value
            }
          });
        const transportationCompany = await TransportationCompany.findOne({
            where: {
                internetID: value
            }
        })
        if(company) {
            res.json(company);
          }
        else if(transportationCompany)
            res.json(transportationCompany)
        else {
            res.json("company not found");
        }
    } catch (error) { 
        res.json({error: error.messaage})
    }
})

module.exports = router;