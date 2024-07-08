import { useEffect, useState } from "react";
import OrderSummaryComponent from "../components/OrderSummaryComponent";
import { useSelector } from "react-redux";
import { serverUrl } from "../commonVar";
import ProductBar from "../components/ProductBar";
import { IProduct, RootState } from "../utils/types";
const OrderSummary=()=>{
    const [currentProducts,updateCurrentProduct]=useState<IProduct[]>([])
    const states=useSelector((e:RootState)=>e)
    const getImage=(imgSrc:string[])=>{
        // return
        const image=serverUrl+'/productImages/'+imgSrc[0]
        return image;
    }
    useEffect(()=>{
    if(states.buyNowReducers.buyNowItems!==undefined){
        updateCurrentProduct([states.buyNowReducers.buyNowItems])
    } else {
        updateCurrentProduct(states.cartReducers.cartItems)
    }
    },[])

    const {addressPayment}=useSelector((state:RootState)=>state.addressPaymentReducer)

    return(
        <div className="checkoutContainer">
            {currentProducts.length ?<div className="addressSection summaryPage">
                <div className="itemsList">
                    <div className="itemText">Items</div>
                    {currentProducts.map(el=>(
                        <div key={el._id}>
                            <ProductBar product={el} variant={'Checkout'} />
                        </div>
                    ))}
                    </div>
                </div>
                :
                    <div className="flex justify-center items-center pt-4 flex-col h-full w-full absolute">
                        <h2>There is not item in your cart right now</h2>
                        <h4>Browse or search to add now</h4>
                    </div>
                }
            {!!currentProducts.length && <div className="billSection">
                <OrderSummaryComponent disabled={false} activeStep={3} address={addressPayment?.address!} paymentType={addressPayment?.payment!} />
            </div>}
        </div>
    )
}

export default OrderSummary;