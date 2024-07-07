import axios from "axios";
import { serverUrl } from "../commonVar";

export async function getAllProductDetails(){
    let data;
    await axios.get(serverUrl+'/api/product/getall',{}).then(async (res)=>{
        data=await res.data
        // return await res.data;
    })
    return data
}


export async function getApiCall(url:string,queryParam:any){
    // to build query string from JSON object queryParam
    let querystring='?'
    // check if variable is string and add queotes on that variable
    const isString=(variable:any)=>{
        return typeof variable=='string'?"'"+variable+"'":variable
    }
    // building query string
    for(let i in queryParam){
        let str=i+'='+isString(queryParam[i])+'&'
        querystring+=str
    }
    querystring=querystring.slice(0,-1)

    // get method call
    await axios.get('/'+url+querystring?querystring:'').then(res=>{
        return res.data
    })
}