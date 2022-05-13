import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Input from '../components/Input/Input';
import './homepage.css';

const Homepage = () => {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('BRL');
  const [currency2, setCurrency2] = useState('USD');
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios.get('https://v6.exchangerate-api.com/v6/dffdc7d0f074cb108e7a7e10/latest/BRL')
      .then(response => {
       setRates(response.data.conversion_rates)
      })
  }, []);

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmount1Change(1);
      }
      init();
    }
  }, [rates]);
  
  function format(number) {
    return number.toFixed(3);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }


  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }


  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <div>
      <header id='hero-section'>
        <div className="dark-overlay">
          <div className="container">
            <h2>Conversor</h2>
            <p>Escolha a moeda e digite o valor que deseja converter!</p>
            <Input onAmountChange={handleAmount1Change} onCurrencyChange={handleCurrency1Change} currencies={Object.keys(rates)} amount={amount1} currency1={currency1} />
            <Input onAmountChange={handleAmount2Change} onCurrencyChange={handleCurrency2Change} currencies={Object.keys(rates)} amount={amount2} currency2={currency2} />
            <div className="btncont">
            </div>
          </div>
        </div>
      </header>
    </div>
    )
}


export default Homepage