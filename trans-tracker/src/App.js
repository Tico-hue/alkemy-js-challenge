
import {useState, useEffect} from 'react';
import Header from './components/Header';
const App = () => {
  const [balance,setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
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
  return (
    <div className="App">
        <Header   title = 'Finance Tracker' total = {balance} setModal = {setType} />
        <Table    title = {modalType} setModal={setType} transactions={transactions}  onDelete={deleteTransaction}></Table>
        <AddTrans idTrans = {idTrans} show = {modalShow} title = {modalType} onUpdate={updateTransaction} onAdd = {addTransaction} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default App;
