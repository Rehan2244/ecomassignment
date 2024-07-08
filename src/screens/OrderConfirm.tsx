import { useSelector } from "react-redux"
import { RootState } from "../utils/types"
import CheckCircle from "@mui/icons-material/CheckCircle"
import { useParams, useSearchParams } from "react-router-dom"
const OrderConfirm=()=>{

    const {addressPayment}=useSelector((state:RootState)=>state.addressPaymentReducer)
    const [searchParams, setSearchParams] = useSearchParams();
    const id=searchParams.get("orderId")
    console.log('serc',searchParams)
    return <div className="flex justify-center items-center mt-20 items-center flex-col">
        <CheckCircle className="text-emerald-400" style={{height:'100px', width:'100px'}} />
        <div>
            <h3>Your order has been confirmed</h3>
            <h5>Details of order is</h5>
            <div>
                <div>Address: {addressPayment?.address?.addressLine1}</div>
                <div>Payment Mode: {addressPayment?.payment}</div>
                <div>Order ID: {id}</div>
            </div>
        </div>
    </div>
}

export default OrderConfirm;