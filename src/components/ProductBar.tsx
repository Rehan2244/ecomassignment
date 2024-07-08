import { useDispatch } from "react-redux"
import { serverUrl } from "../commonVar"
import { removeFromCart } from "../redux/actions";
import { IProduct } from "../utils/types";
import Trash from '@mui/icons-material/Delete';

interface IProductBar{
    product:IProduct,
    variant:string
}
const ProductBar:React.FC<IProductBar>=({product,variant})=>{
    const imageUrl=product?.img || product.imagesUrl![0].url
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
                    {variant!=='MiniCart' && <div className="cursor-pointer flex items-center" onClick={()=>dispatch(removeFromCart(product._id))}>Remove <Trash className="text-red-400 " fontSize="small" /> </div>}
                </div>
            </div>
        </div>
    )
}

export default ProductBar;