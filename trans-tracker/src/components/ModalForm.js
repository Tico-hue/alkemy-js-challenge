import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useState, useContext, useEffect} from 'react'
import { ModalContext } from '../ModalContext';
const ModalForm =(props) =>{
  
   
    const {ModalType, setModalType} = useContext(ModalContext)
    const [concept,setConcept] = useState('')
    const [date,setDate] = useState('')
    const [amount,setAmount] = useState(0)
    const [type,setType] = useState()
    
        
     
    // useEffect(()=>{
    //   const setValues = function(){
    //     if (ModalType.type === 'update' ){
    //       setConcept(ModalType.transaction.concept)
    //       setAmount(ModalType.transaction.amount)
    //       setDate(ModalType.transaction.date)
  
    //     }
    //   }
    //   setValues()
    //  },[])
      
    if (ModalType.type ==='update' && !ModalType.valuesSetted){
      setConcept(ModalType.transaction.concept)
      setAmount(ModalType.transaction.amount)
      setDate(ModalType.transaction.date)
      setModalType({...ModalType, valuesSetted:true})
    }

  
    const onSubmit = (e) => {
        e.preventDefault()
        if (ModalType.type ==='update'){
         
            props.onUpdate(ModalType.transaction.id,{concept,date,amount})
            props.onHide()
        }
        else{  
          props.onAdd({concept,date,amount,type})
          props.onHide()
        }
        setConcept('')
        setDate('')
        setAmount(0)
        setType("1")
    }

    return (
      <Modal {...props} size='lg' aria-labelledby="contained-modal-title-vcenter" className='modal-70w'>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {ModalType? ModalType.type==='update'?'Edit ' :'Create ' :''}Transaction
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
              <form onSubmit={onSubmit}>
                <Row className= 'form-group'>
                    <Col xs={12} md={5}>
                        <label >Concept</label>
                        <input type="text" 
                            className='form-control'
                            value = {concept}
                            required
                            onChange={(e)=> setConcept(e.target.value)}
                        />
                      </Col>
                    <Col xs={0} md={2}>
                    </Col>
                    <Col xs={12} md={5}>
                        <label >Amount</label>
                        <input 
                            className='form-control'
                            type="number"  min="0" step="1.0" 
                            value = {amount}
                            required
                            onChange={(e)=> setAmount(e.target.value)}
                        />
                    </Col>
                </Row>
    
                <Row>
                    <Col xs={6} md={6}>
                        <label >Date</label>
                        <input 
                              type="date"
                              className='form-control' 
                              value = {date}
                              required
                              onChange={(e) => setDate(e.target.value) }
                        />
                    </Col>
                    <Col xs={0} md={0}>
                    </Col>
                    {ModalType.type === 'update'? '' : <Col xs={6} md={5}>
                        <label>Type</label><br/>
                        <input type="radio" id="income" value={1} required  name="type" 
                        onChange={(e)=>setType(e.target.value)}
                        />
                        <label htmlFor="income">Income</label>
                        <br/>
                        <input type="radio" id="expense" required value={0} 
                        onChange={(e)=>setType(e.target.value)}
                         name="type"/>
                        <label htmlFor="expense">Expense</label> 
                    </Col>}
                </Row>
                <br/>
                 <input  className='btn btn-success btn-block' type="submit" variant="success" value="Save"/>

                </form>
          </Container>
        </Modal.Body>
    
      </Modal>
    );
  }
  export default ModalForm
