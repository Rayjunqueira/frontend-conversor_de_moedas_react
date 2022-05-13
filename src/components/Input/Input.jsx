import './input.css';

const Input = (props) => {
    
  return (
    <div>
        <div className="currencyBox">
            <input type="text" value={props.amount} onChange={e => props.onAmountChange(e.target.value)} />
            <select value={props.currency} onChange={e => props.onCurrencyChange(e.target.value)} >
                {props.currencies.map((currency => (
                    <option value={currency}>{currency}</option>
                )))}
            </select>
        </div>
    </div>
  )
}

export default Input