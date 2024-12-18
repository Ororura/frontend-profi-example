import { useEffect, useState } from "react";
import "./App.css";
import Services from "./Services";

function App() {
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState(0);
  const [eth, setEth] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      const data = await Services.getBalance();
      setBalance(data);
    };

    getBalance();
  }, []);

  const handleSendEth = async () => {
    await Services.sendDeposit(wallet, eth);
    const data = await Services.getBalance();
    setBalance(data);
  };

  const connectWallet = async () => {
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((data) => {
        setWallet(data[0]);
      });
  };

  const handleWithdraw = async () => {
    await Services.withdraw(wallet, value);
    const data = await Services.getBalance();
    setBalance(data);
  };

  return (
    <>
      <p>{wallet}</p>
      <p>Баланс: {balance.toString()}</p>
      <input
        type="number"
        onChange={(event) => {
          setEth(event.currentTarget.value);
        }}
      />
      <input
        type="number"
        placeholder="Вывести баланс"
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
      />
      <button onClick={handleSendEth}>Отправить валюту</button>
      <button onClick={connectWallet}>Подключить аккаунты</button>
      <button onClick={handleWithdraw}>Вывести баланс</button>
    </>
  );
}

export default App;
