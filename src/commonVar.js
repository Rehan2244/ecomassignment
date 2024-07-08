import { store } from "./redux/store"
export const serverUrl='http://localhost:3001'
export const pincodeUrl={
    getPaymentUrl:serverUrl+'/api/payment_types?'
}
export function getStore(){
    store.subscribe(()=>{
        return store.getState()
    })
}