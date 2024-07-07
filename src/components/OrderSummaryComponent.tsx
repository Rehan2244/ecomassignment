import { useNavigate } from "react-router-dom"
import {useSelector} from 'react-redux'
import { RootState } from "../utils/types"

interface IOrderSummary{
    activeStep:number,
    disabled:boolean,
    onClick?:(next:()=>void)=>void
}
const OrderSummaryComponent:React.FC<IOrderSummary>=({activeStep,disabled,onClick})=>{

    const navigate=useNavigate()
    const orderSummary=()=>{
        if(activeStep==2) navigate('/OrderSummary',{})
    }
    let stepper=[]
    for(let i=1;i<4;i++){
        stepper.push({id:i,isActive:activeStep>=i?'active':''})
    }
    const data=useSelector((state:RootState)=>state)
    const items=  data.buyNowReducers.buyNowItems?[data.buyNowReducers.buyNowItems]:[]
    console.log('items',items)
    return (
        <>
                <div className='stepper'>
                    {stepper.map(el=>(<>
                            <div className={'step '+el.isActive} >{el.id}</div>
                            {el.id<=2&&<div className='link'></div>}
                        </>))
                    }
                </div>
                <div className='couponSection'>
                    Coming soon
                </div>
                <div className='paymentDetail'>
                    <h2>Payment details</h2>
                    <div className='flexStyle item'>
                        <div>Total MRP</div>
                        <div>{}</div>
                    </div>
                    <div className='flexStyle item'>
                        <div>Discount</div>
                        <div>{}</div>
                    </div>
                    <div className='flexStyle item'>
                        <div>Delivery</div>
                        <div>{}</div>
                    </div>
                    <div className='flexStyle item'>
                        <div>Total</div>
                        <div>{}</div>
                    </div>
                    <button disabled={disabled} onClick={()=>orderSummary()} className='addCartBtn'>CHECKOUT</button>
                </div>
        </>
    )
}

export default OrderSummaryComponent;