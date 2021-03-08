
import {useState, useEffect} from 'react';
import Header from './components/Header';
import AddTrans from './components/AddTrans';
import Table from './components/Table';

const App = () => {
  const [balance,setBalance] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionsAll,setTransactionsAll] = useState([]);
  const [modalType, setModalType] = useState('Add Transaction')
  const [idTrans,setIdTrans]= useState('')
  const fetchTransactions = async() =>{
    try{
      const res1 = await fetch('http://localhost:5000/transactions/');
      const data1 = await res1.json();
      const res2 = await fetch('http://localhost:5000/transactions/balance');     
      const data2 = await res2.json();
      setTransactions(data1)
      getTotalBalance(data2)
      return data1
    }
    catch(e){
      console.log(e)
    }
   
  }
  const getTotalBalance = (data)=>{
    let acuIncomes = 0;
    let acuExpenses = 0;
    data.forEach(transaction => (transaction['type']? acuIncomes+= transaction['amount'] : acuExpenses += transaction['amount']));
    setBalance(acuIncomes-acuExpenses);
    return balance
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const deleteTransaction = async(id)=>{
    console.log(id)
    await fetch(`http://localhost:5000/transactions/del/${id}`,
    {
      method:'DELETE'
    })
    // setTransactions(
    //   transactions.filter((trans)=>trans.id!== id)
    // )
    fetchTransactions()
  };

  const addTransaction = async (transaction) => {
     await fetch(`http://localhost:5000/transactions/add`,{
      method:'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(transaction)

    })
    // setTransactions([...transactions,data])
    fetchTransactions()
  }

  const updateTransaction = async(id,transaction) =>{
    console.log(transactions)
    await fetch(`http://localhost:5000/transactions/update/${id}`,
    {
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(transaction)
    })
    console.log(transaction)
    fetchTransactions()
  }

  const setType = (type,id=null)=>{
    setModalShow(true)
    setModalType(type)
    setIdTrans(id)
  }

  return (
    <div className="App">
        <Header   title = 'Finance Tracker' total = {balance} setModal = {setType} />
        <Table    title = {modalType} setModal={setType} transactions={transactions}  onDelete={deleteTransaction}></Table>
        <AddTrans idTrans = {idTrans} show = {modalShow} title = {modalType} onUpdate={updateTransaction} onAdd = {addTransaction} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default App;
