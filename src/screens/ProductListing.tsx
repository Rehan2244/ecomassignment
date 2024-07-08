import { useEffect, useState } from "react"
import ListingFilter from "../components/ListingFilter"
import { useDispatch, useSelector } from "react-redux"
import { IProduct, RootState } from "../utils/types"
import ProductTile from "../components/ProductTile"
import axios from "axios"
import { serverUrl } from "../commonVar"
import { loading, notify } from "../redux/actions"
import { getToken } from "../utils/storage"

export default function(){
    const [products,setProducts]=useState([])
    const dispatch=useDispatch();
    const {searchKey}=useSelector((state:RootState)=>state.searchReducer)
    
    

    const loadProducts=()=>{
        axios.get(serverUrl+'/api/products/search?query='+searchKey,{headers:{
            "x-auth-token":getToken()
        }})
        .then(res=>{
            dispatch(loading({type:'Loading',loading:false}))
            setProducts(res.data)
        })
        .catch(err=>{
            dispatch(notify({type:'error',message:err.message}))
            dispatch(loading({type:'Loading',loading:false}))
        })
    }
    useEffect(()=>{
            if(searchKey){
                loadProducts()
        }
    },[searchKey])
    return <div className="flex">
        <ListingFilter />
        <ListingContainer products={products} />
    </div>
}

interface ListingContainerInterface{
    products:IProduct[]
}
export const ListingContainer=({products}:ListingContainerInterface)=>{
    const [product,setProducts]=useState<IProduct[]>()

    return <div style={{width:'70%'}} >
        <div >Found {products.length} results</div>
        <div className="flex flex-wrap">
        {products.length?products.map((el:IProduct)=>{
            return <div>
                <ProductTile 
                imgSrc={el.imagesUrl!}
                name={el.name}
                brand={el.brand}
                price={el.price}
                mrp={el.mrp}
                btnText={'ADD TO CART'}
                productId={el._id}
                className={""}
                                   
                />
            </div>
        }):
        <h3>No Records found</h3>
        }
        </div>
    </div>
}