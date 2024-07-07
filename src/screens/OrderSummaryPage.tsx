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

    useEffect(()=>{
        
    },[currentProducts])
    return(
        <div className="checkoutContainer">
            <div className="addressSection summaryPage">
                <div className="itemsList">
                    <div className="itemText">Items</div>
                    {currentProducts.map(el=>(
                        <div key={el.id}>
                            <ProductBar product={el} variant={'Checkout'} />
                        </div>
                    ))}
                </div>
                <div className="address"></div>
            </div>
            <div className="billSection">
                <OrderSummaryComponent disabled={false} activeStep={3} />
            </div>
        </div>
    )
}

export default OrderSummary;