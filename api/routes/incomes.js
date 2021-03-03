import express, { query } from 'express'
import pool from '../index.js'
const router = express.Router();
export default router;


router.get('/',(req,res) => {
    let income_query = 'SELECT * FROM transactions WHERE tipo=1';
    pool.query(income_query,(error, result)=>{
        if (error) throw error;
        res.send(result)
    })   
});
