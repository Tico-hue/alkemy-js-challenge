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
app.get('/transactions/balance',(req,res)=>{
    sequelize.Transaction.findAll( {order:[['date', 'DESC']],attributes: ['id','concept', 'date','amount','type']}).then((result)=>{res.json(result)})
})


app.get('/transactions/:id',(req,res)=>{
    sequelize.Transaction.findAll({
        where: {
          id: req.params.id
        }
      }).then((result,error)=>{
            if (error){throw error};  
            res.json(result)
        });
});


app.post('/transactions/add',(req,res)=>{
    
    sequelize.Transaction
        .create({
            concept: req.body.concept, date: req.body.date, amount: req.body.amount, type: req.body.type 
        }).then((result,error)=>{
            if(error){throw error};
            res.status(201).json(result)
        });
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

app.put('/transactions/update/:id',(req,res)=>{
      
    
    sequelize.Transaction
        .update(
            {concept:   req.body.concept,
            date:       req.body.date,
            amount:     req.body.amount},
            {where:{
                id:req.params.id
            }}
        ).then((result,error)=>{
            if (error) throw error;
            res.status(200).json(req.body);
            console.log(result)
    })
})


app.listen(PORT, () => console.log(`Server running on port: localhost:${PORT}`))  