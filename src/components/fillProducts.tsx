import axios from "axios"
import { serverUrl } from "../commonVar"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react";

const Filler=()=>{

    const params=useSearchParams()[0];
    const count:any=params.get('count')
    const navigate=useNavigate()
    useEffect(()=>{
        axios.post(serverUrl+'/api/products/fill',{count})
        .then(res=>{
            if(res.data){
                navigate('/Home')
            }
        })
    },[])
    return <div>adding {count} products...</div>
}

export default Filler;