const PaymentTypes=({payments})=>{
    return (
    <div className="payment">
        {payments.map(pay=>{
            return <div key={pay.id} >
                    <label>
                        <input type="radio" name="payment" />
                        <span>{pay.type}</span>
                    </label>
                </div>
        })}
    </div>
    )}
export default PaymentTypes;