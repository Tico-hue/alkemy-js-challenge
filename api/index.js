import express from 'express';
import bodyParser from 'body-parser';
import expensesRoutes from './routes/expenses.js'
import incomesRoutes from './routes/incomes.js'
import mysql from 'mysql'

const app = express();
app.use(bodyParser.json());
const PORT = 5000;

const config = {
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'api',
};

var pool = mysql.createPool(config)
export default pool;

app.use('/expenses',expensesRoutes);
app.use('/incomes',incomesRoutes);

app.get('/transactions',(req,res)=>{
    pool.query('SELECT * FROM transactions',(error, result)=>{
        if (error) throw error;
        res.send(result)
    })
});


 



app.listen(PORT, () => console.log(`Server running on port: localhost:${PORT}`))  