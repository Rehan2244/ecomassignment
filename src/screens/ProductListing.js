import { useState } from "react"
import ListingFilter from "../components/ListingFilter"
import { useSelector } from "react-redux"

export default function(){
    const [products,setProducts]=useState([])

    const search=useSelector(state=>state.searchReducer)
    return <div className="flex">
        <ListingFilter />
        <ListingContainer products={products} />
    </div>
}

export const ListingContainer=({products})=>{

    return <div>
        {products.length?products.map(el=>{
            return <div>{el.name}</div>
        }):
        <h3>No Records found</h3>
        }
    </div>
}