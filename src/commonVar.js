import { store } from "./redux/store"
export const serverUrl='http://localhost:1337'
export const pincodeUrl={
    getPaymentUrl:serverUrl+'/api/payment_types?'
}
export function getStore(){
    store.subscribe(()=>{
        return store.getState()
    })
}