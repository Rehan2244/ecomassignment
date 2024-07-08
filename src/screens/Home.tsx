import ProductTile from "../components/ProductTile";
import { getAllProductDetails } from "../APIS/APICollection";
import { useEffect, useState } from "react";
import './HomeStyle.css'
import { loading, notify } from "../redux/actions";
import { useDispatch } from "react-redux";
import { IProduct } from "../utils/types";
import { IComponent } from "../utils/component-types";
import { getUserData } from "../utils/storage";
import { useNavigate } from "react-router-dom";

const Home:React.FC<IComponent>=({isHeaderEnabled})=>{

  const [product,updateProducts]=useState<IProduct[]>([])
  const userData={id:1}
  const navigate=useNavigate()

  let dispatch=useDispatch()
  useEffect(()=>{
    const response=getAllProductDetails()
    response.then((res:any)=>{
      updateProducts(res!)
      dispatch(loading({type:'loading',loading:false}))
    })
    .catch(err=>{
      dispatch(notify({type:'error',message:err.message}))
      dispatch(loading({type:'loading',loading:false}))

    })
  },[])

  useEffect(()=>{
    if(!userData){
      navigate('/auth')
    }
  },[])
    return(
        <div>
          <div className="productContainer">
            {product && product.map((el:IProduct)=>
            <ProductTile
              className="productTile"
              key={el._id}
              imgSrc={el.imagesUrl!}
              name={el.name}
              brand={el.brand}
              price={el.price}
              mrp={el.mrp}
              offer={el.offer}
              btnText={'ADD TO CART'}
              productId={el._id}
            />
            )}
          </div>
        </div>
    )
}

export default Home;