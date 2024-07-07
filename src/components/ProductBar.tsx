import { useDispatch } from "react-redux"
import { serverUrl } from "../commonVar"
import { removeFromCart } from "../redux/actions";
import { IProduct } from "../utils/types";

interface IProductBar{
    product:IProduct,
    variant:string
}
const ProductBar:React.FC<IProductBar>=({product,variant})=>{
    const imageUrl=product?.img
    console.log('Product',product)
    const dispatch=useDispatch();
    return(
        <div className={`productBar ${variant}`} style={{display:'flex'}}>
            <img src={imageUrl} />
            <div style={{display:'flex',justifyContent:'space-between',width:'100%'}} >
                <div className="productSpanBlock">
                <span className="name">{product.name}</span>
                <span className="brand">{product.brand}</span>
                <span className="price">{product.price}</span>
                </div>
                <div className="buyingQty">
                    <div>{'X '+product.qty}</div>
                    <div onClick={()=>dispatch(removeFromCart(product.id))}>Remove</div>
                </div>
            </div>
        </div>
    )
}

export default ProductBar;