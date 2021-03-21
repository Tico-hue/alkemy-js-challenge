import { useState, useEffect } from "react";
import Header from "./Header";
import ModalForm from "./ModalForm";
import Table from "./Table";
import { ModalContext } from "../ModalContext";

const Home = () => {
  const [balance, setBalance] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [ModalType, setModalType] = useState("");
  const [transactionListSorted, setTransactionListSorted] = useState(false);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:5000/transactions/");
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getTransactions = async () => {
      const transactionsFromServer = await fetchTransactions();
      setTransactions(transactionsFromServer);
    };

    getTransactions();
  }, []);

  useEffect(() => {
    const getTotalBalance = (transactions) => {
      let acuIncomes = 0;
      let acuExpenses = 0;
      transactions.forEach((transaction) =>
        transaction["type"]
          ? (acuIncomes += transaction["amount"])
          : (acuExpenses += transaction["amount"])
      );
      setBalance(acuIncomes - acuExpenses);
    };
    getTotalBalance(transactions);
  }, [transactions]);

  // useEffect(()=>{
  //   const sortTransactionsByDate = (transactions) =>{

  //   }
  // },[])

  const deleteTransaction = async (id) => {
    await fetch(`http://localhost:5000/transactions/del/${id}`, {
      method: "DELETE",
    });
    setTransactions(transactions.filter((trans) => trans.id !== id));
  };

  const addTransaction = async (transaction) => {
    const newTransaction = await fetch(
      `http://localhost:5000/transactions/add`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(transaction),
      }
    );
    let data = await newTransaction.json();

    data = { ...data, amount: parseInt(data.amount) };
    setTransactions([...transactions, data]);
  };

  const updateTransaction = async (id, transaction) => {
    const newTransaction = await fetch(
      `http://localhost:5000/transactions/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(transaction),
      }
    );

    let data = await newTransaction.json();

    setTransactions(
      transactions.map((trans) =>
        trans.id === data[0].id
          ? {
              ...trans,
              concept: data[0].concept,
              amount: data[0].amount,
              date: data[0].date,
            }
          : trans
      )
    );
  };

  // const setType = (type,id=null)=>{
  //   setModalShow(true)
  //   setModalType(type)
  //   setIdTrans(id)
  // }
  const onHide = () => {
    setModalShow(false);
    setModalType({ ...ModalType, valuesSetted: false });
  };
  return (
    <div className="App">
      <ModalContext.Provider value={{ ModalType, setModalType }}>
        <Header
          title="Finance Tracker"
          total={balance}
          setModalShow={() => setModalShow(true)}
        />
        <Table
          transactions={transactions.slice(0, 10)}
          setModalShow={() => setModalShow(true)}
          onDelete={deleteTransaction}
        ></Table>
        <ModalForm
          show={modalShow}
          onUpdate={updateTransaction}
          onAdd={addTransaction}
          onHide={onHide}
        />
      </ModalContext.Provider>
    </div>
  );
};

export default Home;
