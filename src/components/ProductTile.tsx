import './ProductTile.css'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from "../commonVar"
import { useDispatch,useSelector } from "react-redux";
import { addToCart,addToWishlist } from '../redux/actions';
import { useState } from 'react';
import { IProduct, IProductTile, Image } from '../utils/types';
import Cart from '@mui/icons-material/ShoppingCart'
const ProductTile:React.FC<IProductTile>=({imgSrc,name,brand,price,mrp,offer,btnText,productId})=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    let images=imgSrc as unknown as Image[]
    console.log('imgsrc',imgSrc)
    const [product,updateProduct]=useState<IProduct>({_id:productId,qty:1,price,name,img:imgSrc[0].url,brand,mrp})
    const goToDetail=()=>{
        navigate('../ProductDetail?id='+productId)
    }
    const addToCartFunction=()=>{
        dispatch(addToCart(product))
    }

    return(
        <div className='productTile'>
            <div className='image' style={{position:'relative'}}>
                <img onClick={()=>goToDetail()} src={images[0].url} width={100} height={100} />
            </div>
            <div className='detail'>
                <div onClick={()=>goToDetail()} className='name bold'>{name}</div>
                <div onClick={()=>goToDetail()} className='brand'>{brand}</div>
                <div onClick={()=>goToDetail()} className='price'> ₹ {price}</div>
                <div onClick={()=>goToDetail()} className='mrp'>
                    <span className='mrpPrice'> ₹ {mrp}</span>
                    {/* {<span className='offer'>{offer}</span> } */}
                </div>
                <div className='addToCartFunction'>
                    <button onClick={()=>addToCartFunction()} className='addCartBtn'>{btnText} <Cart/> </button>
                </div>
            </div>
        </div>
    )
}

export default ProductTile;