const express = require('express')
const cors = require('cors') 
const sequelize = require('./db')
const bodyParser = require('body-parser')
const Transaction = require('./models/transactions')
const { reset } = require('nodemon')
require('./db')
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 5000;


app.get('/transactions',(req,res)=>{
    sequelize.Transaction.findAll( {order:[['date', 'DESC']], limit: 10,attributes: ['id','concept', 'date','amount','type']}).then((result)=>{res.json(result)})
})


const getTransaction = async (id)=>{
    console.log(id)
    const transaction = await sequelize.Transaction.findAll({
        where: {
          id: id
        }
      })
    console.log(`29 - ${transaction}`)
    
    return transaction
};


app.post('/transactions/add', async (req,res)=>{
    
     const trans = await sequelize.Transaction
        .create({raw: true,
            concept: req.body.concept, date: req.body.date, amount: req.body.amount, type: req.body.type 
        });
        res.send(trans)
        console.log(trans)
})

app.delete('/transactions/del/:id',(req,res)=>{
        sequelize.Transaction.destroy({
        where: {
          id: req.params.id
        }
      }).then((result,error)=>{
          if(error){ throw error}
          res.status(200).json(result)
      });
});

app.put('/transactions/update/:id', async (req,res)=>{
      
   const result = await sequelize.Transaction
        .update(
            {concept:   req.body.concept,
            date:       req.body.date,
            amount:     req.body.amount},
            {where:{
                id:req.params.id
            }}
        )
    const transUpdated = await getTransaction(req.params.id)
    console.log(`65///${transUpdated}`)
    res.send(transUpdated)
})


app.listen(PORT, () => console.log(`Server running on port: localhost:${PORT}`))  