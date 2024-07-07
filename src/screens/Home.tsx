import ProductTile from "../components/ProductTile";
import { getAllProductDetails } from "../APIS/APICollection";
import { useEffect, useState } from "react";
import './HomeStyle.css'
import { loading, notify } from "../redux/actions";
import { useDispatch } from "react-redux";
import { IProduct } from "../utils/types";
import { IComponent } from "../utils/component-types";

const Home:React.FC<IComponent>=({isHeaderEnabled})=>{
  const [product,updateProducts]=useState<IProduct[]>([])

  let dispatch=useDispatch()
  useEffect(()=>{
    const response=getAllProductDetails()
    response.then((res:any)=>{
      updateProducts(res?.products!)
      setTimeout(()=>{
        dispatch(loading({type:'loading',loading:false}))
      },1500)
    })
    .catch(err=>{
      dispatch(notify({type:'error',message:err.message}))
      dispatch(loading({type:'loading',loading:false}))

    })
  },[])

  useEffect(()=>{
  },[product])
    return(
        <div>
          <div className="productContainer">
            {product && product.map((el:IProduct)=>
            <ProductTile
              className="productTile"
              key={el.id}
              imgSrc={el.images!}
              name={el.name}
              brand={el.brand}
              price={el.price}
              mrp={el.mrp}
              offer={el.offer}
              btnText={'ADD TO CART'}
              productId={el.id}
            />
            )}
          </div>
        </div>
    )
}

export default Home;