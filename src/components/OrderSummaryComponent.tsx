import { useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { IAdress, IProduct, RootState } from "../utils/types"
import Cash from '@mui/icons-material/LocalAtm';
import { useEffect, useMemo, useState } from "react";
import { addressAndPayment, loading, notify } from "../redux/actions";
import axios from "axios";
import { serverUrl } from "../commonVar";
import { getUserData, loginHeader } from "../utils/storage";

interface IOrderSummary{
    activeStep:number,
    disabled:boolean,
    onClick?:(next:()=>void)=>void,
    address?:IAdress,
    paymentType?:string
}
const OrderSummaryComponent:React.FC<IOrderSummary>=({activeStep,disabled,onClick,address,paymentType})=>{

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const products=useSelector((state:RootState)=>state.cartReducers)
    const orderSummary=()=>{
        if(activeStep==2) {
            navigate('/OrderSummary',{})
        }
        if(activeStep==3) {
            dispatch(loading({type:'Loading',loading:true}))
            let total=0
            products.cartItems.forEach(el=>{
                total+=parseInt(el.mrp)
            })
            axios.post(serverUrl+'/api/orders',{
                userId:getUserData()._id,
                products:products.cartItems,
                totalAmount:total
            },{headers:loginHeader})
            .then(res=>{
                axios.post(serverUrl+'/api/orders/confirm',{orderId:res.data._id})
                .then(confirmRes=>{
                    navigate('/OrderConfirm?orderId='+confirmRes.data._id)
                    dispatch(loading({type:'Loading',loading:false}))
                })
                .catch(err=>{
                    dispatch(notify({type:'error',message:'Something went wrong'}))
                    dispatch(loading({type:'Loading',loading:false}))
                })
            })
            .catch(e=>{
                dispatch(notify({type:'error',message:'Something went wrong'}))
                dispatch(loading({type:'Loading',loading:false}))
            })
        };
    }
    let stepper=[]
    for(let i=1;i<4;i++){
        stepper.push({id:i,isActive:activeStep>=i?'active':''})
    }
    const data=useSelector((state:RootState)=>state)
    const items=  data.buyNowReducers.buyNowItems?[data.buyNowReducers.buyNowItems]:[]
    console.log('items',items,data.cartReducers.cartItems)
    const total=useMemo(()=>{
        let sum=0
        if(items.length){
            items.forEach((el:IProduct)=>{
                sum += parseInt(el.price)
            })
        } else{
            data.cartReducers.cartItems.forEach((el:IProduct)=>{
                sum+=parseInt(el.price)
            })
        }
        return sum;
    },[items])

    useEffect(()=>{
        return()=>{
            if(address && activeStep>1){
                dispatch(addressAndPayment({address:address as any,payment:paymentType}))
            }
        }
    },[address,paymentType,activeStep])

    return (
        <>
                <div className='stepper'>
                    {stepper.map(el=>(<>
                            <div className={'step '+el.isActive} >{el.id}</div>
                            {el.id<=2&&<div className='link'></div>}
                        </>))
                    }
                </div>
                <div className='paymentDetail'>
                    <div>
                    <h2 className="pb-2">Payment details</h2>
                    {address && <div className="flex flex-col text-base border-b pb-2 mb-2">
                            <p>Address</p>
                            <div>{address.addressLine1}</div>
                            <div>{address.addressLine2}</div>
                            <div>{address.district} {address.state} {address.pincode}</div>
                        </div>}
                    {paymentType && <div className="flex justify-between">
                            <div>
                                <Cash /> Payment
                            </div>
                            <div className="bg-sky-400 px-4 py-0 rounded-[5px] text-white">
                                {paymentType}
                            </div>
                        </div>}
                    <div className='flexStyle item w-full justify-between'>
                        <div>Total MRP</div>
                        <div>₹ {total}</div>
                    </div>
                    <div className='flexStyle item w-full justify-between'>
                        <div>Discount</div>
                        <div>N/A</div>
                    </div>
                    <div className='flexStyle item w-full justify-between'>
                        <div>Delivery</div>
                        <div>₹ 40</div>
                    </div>
                    <div className='flexStyle item w-full justify-between'>
                        <div>Total</div>
                        <div>₹ {40+total}</div>
                    </div>
                    </div>
                    <button disabled={disabled} onClick={()=>orderSummary()} className='addCartBtn'>{activeStep<3?'CHECKOUT':'CONFIRM ORDER'}</button>
                </div>
        </>
    )
}

export default OrderSummaryComponent;