const transactions = require('./models/transactions')
const {Sequelize} = require('sequelize')
const sequelize = new Sequelize('alkemy','root','rootroot', {
    host:'localhost',
    dialect:'mysql',
    dialectOptions: {decimalNumbers: true},
    define:{
        timestamps:false
    }
});

sequelize
.authenticate()
.then(()=>{
    console.log('Connection has been established')
})
.catch(err =>{
    console.error('Unable to connecto to db')
})

const Transaction = transactions(sequelize,Sequelize)

sequelize.sync({force:false})
    .then(()=>{
        console.log('synchronized')
    })

module.exports = {
    Transaction,
    sequelize
}

