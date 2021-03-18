import React from 'react'
import Transaction from './Transaction'

const Table = ({transactions,onDelete,setModalShow}) => {
    return (
            <table className='table table-hover'>
                <thead className="thead-dark">
                    <tr>
                        <th scope='col'>options</th>
                        <th scope='col'>concept</th>
                        <th scope='col'>date</th>
                        <th scope='col'>amount</th>
                        <th scope='col'>type</th>
                    </tr>
                </thead>
            {transactions.map((transaction,index)=>(

                    <Transaction 
                        key = {index} 
                        transaction = {transaction} 
                        onDelete = {onDelete}
                        setModalShow = {setModalShow}
                    /> 
                ))
            }
            </table>
    )
}

export default Table
