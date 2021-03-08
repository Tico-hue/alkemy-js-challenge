import React from 'react'
import { FaMoneyBillWaveAlt } from "react-icons/fa";
import Button from 'react-bootstrap/Button'
const Header = ({title,total,setModal}) => {
    return (
        <header className = 'header row shadow'>
            <div className= 'col-lg-8 col-md-8 col-sm-11 col-xs-11 col-9'>
                <h2 style={{marginBottom:'40px'}}>{title}</h2>
                <h4 style={{display:'inline-block',fontWeight:"200",marginRight:'30px'}}>Latest Transactions</h4>
                    <Button style={{borderColor:'white',backgroundColor:'rgb(65, 75, 216)'}} onClick={()=>setModal('Add Transaction')}>
                        New Transaction
                    </Button>
                
            </div>
            
            <div className="col-lg-4 col-md-4 col-sm-1 col-xs-1">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Balance</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{total}</div>
                        </div>
                        <div className="col-auto">
                            <FaMoneyBillWaveAlt size={30} color={"primary"}></FaMoneyBillWaveAlt>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        </header>
    )
}

export default Header
