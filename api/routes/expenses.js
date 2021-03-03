import express, { query, request } from 'express'
import pool from '../index.js'
const router = express.Router();
export default router;

//fetch all expenses
router.get('/',(req,res) => {
    let expenses_query = 'SELECT * FROM transactions WHERE tipo=0';
    pool.query(expenses_query,(error, result)=>{
        if (error) throw error;
        res.send(result)
    })   
});

//fetch single expense
router.get('/:id',(req,res) => {
    let expenses_query = 'SELECT * FROM transactions WHERE tipo=0 and id=?';
    const id = req.params.id
    pool.query(expenses_query,id,(error, result)=>{
        if (error) throw error;
        res.send(result)
    })   
});