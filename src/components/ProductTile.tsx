import './ProductTile.css'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from "../commonVar"
import { useDispatch,useSelector } from "react-redux";
import { addToCart,addToWishlist } from '../redux/actions';
import { useState } from 'react';
import { IProductTile, Image } from '../utils/types';

const ProductTile:React.FC<IProductTile>=({imgSrc,name,brand,price,mrp,offer,btnText,productId})=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    let imageUrl=serverUrl
    let images=imgSrc as unknown as Image[]
    const [product,updateProduct]=useState({id:productId,qty:1,price,name,img:serverUrl+images[0].url,brand,mrp})
    const goToDetail=()=>{
        navigate('../ProductDetail?id='+productId)
    }
    const getFirstImage=()=>{
        const image=serverUrl+images[0].url
        return image
    }
    const addToCartFunction=()=>{
        dispatch(addToCart(product))
    }
    const addToWishlisht=()=>{
        dispatch(addToWishlist(product))
    }
    return(
        <div className='productTile'>
            <div className='image' style={{position:'relative'}}>
                <img onClick={()=>goToDetail()} src={getFirstImage()} width={100} height={100} />
                <img onClick={()=>addToWishlisht()} src='./images/heart.svg' style={{filter:'hue-rotate(90deg)',width:24,height:24,position:'absolute',right:10,top:10,mixBlendMode:'unset'}} />
            </div>
            <div className='detail'>
                <div onClick={()=>goToDetail()} className='name bold'>{name}</div>
                <div onClick={()=>goToDetail()} className='brand'>{brand}</div>
                <div onClick={()=>goToDetail()} className='price'>{price}</div>
                <div onClick={()=>goToDetail()} className='mrp'>
                    <span className='mrpPrice'>{mrp}</span>
                    {/* {<span className='offer'>{offer}</span> } */}
                </div>
                <div className='addToCartFunction'>
                    <button onClick={()=>addToCartFunction()} className='addCartBtn'>{btnText} <img src='/images/cart.svg' /> </button>
                </div>
            </div>
        </div>
    )
}

export default ProductTile;