const express = require('express')
const app = express();
const {Intermediary} = require('./models')
//linee di codice standard per inizializzare express

const cors = require('cors');

app.use(cors());

app.use(express.json())

const db = require('./models');

//routers
const companyRouter = require('./routes/Company');
app.use("/company", companyRouter);

const requestRouter = require('./routes/Requests');
app.use("/request", requestRouter);

const requestB2Brouter = require('./routes/RequestB2B');
app.use("/requestB2B", requestB2Brouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server is running on port 3001")
    })
    
})

//il server gira sulla porta 3001, e la funzione verrà attivata ad ogni avvio