import { ModalContext } from '../ModalContext';
import {useContext} from 'react'
const React = require('react') 
const {FaEdit,FaTrash} =require('react-icons/fa')
const {BsArrowDownLeft,BsArrowUpRight} = require("react-icons/bs");


const Transaction = ({transaction, onDelete,setModalShow}) => {
    const {ModalType,setModalType} = useContext(ModalContext)
    return (
        <tbody>
            <tr key= {transaction.id}>
                <td id='options'>
                    <FaTrash 
                        style = {{ cursor:'pointer'}}
                        onClick={() =>  onDelete(transaction.id)}

                    />
                    
                    <FaEdit style={{marginLeft:'20px',cursor:'pointer'}}
                        onClick={() => { setModalType({type:'update',transaction: transaction,valuesSetted:false});setModalShow()}}
                    />
                </td>
                <td>{transaction.concept}</td>
                <td>{transaction.date?transaction.date.substring(0, [10]):''}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.type? <p style={{margin:'0'}}><BsArrowUpRight style={{ color: "green"}}  />Income</p>  : <p style={{margin:'0'}}><BsArrowDownLeft style={{ color: "red"}}/>Expense</p>   }</td>
            </tr>
        </tbody>
    )
}

export default Transaction
