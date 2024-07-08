import { IAdress, ILoading, ILoginPopup, INotification, IProduct } from "../utils/types"

export const addToCart=(itemsToAdd:IProduct)=>{
    return {
        type:'ADD_TO_CART',
        cartItems:itemsToAdd
    }
}

export const removeFromCart=(idToRemove:string|number)=>{
    return {
        type:'REMOVE_FROM_CART',
        _id:idToRemove
    }
}
export const addToWishlist=(itemsToAdd:IProduct)=>{
    return {
        type:'ADD_TO_WISHLIST',
        wishListItems:itemsToAdd
    }
}

export const buyNowProducts = (itemsToAdd:IProduct) =>{
    return {
        type:'BUY_NOW',
        buyNowItems:itemsToAdd
    }
}

export const searchNowAction = (searchKey:string) =>{
    return {
        type:'SEARCH',
        searchKey:searchKey
    }
}


export const notify = (payload:INotification) =>{
    return {
        type:'TOAST',
        alert:payload
    }
}
export const loading = (payload:ILoading) =>{
    return {
        type:'loading',
        loading:payload
    }
}

export const loginPopup = (payload:ILoginPopup) =>{
    return {
        type:'login',
        payload
    }
}


interface AddressPaymentAction{
    address:IAdress,
    payment:any
}
export const addressAndPayment = (payload:AddressPaymentAction) =>{
    return {
        type:'AddressPayment',
        payload
    }
}

export interface ICartState{
    cartItems:IProduct[],
    totalCartItems:number
}
export interface ICartAction{
    type:string,
    cartItems:IProduct
}

export interface IWishListState{
    wishListItems:IProduct[],
    totalWLItems:number
}
export interface IWishlistAction{
    type:string,
    wishListItems:IProduct
}

export interface IBuyNowState{
    buyNowItems:IProduct[] | undefined
}
export interface IBuyNowAction{
    buyNowItems:IProduct
}

export interface IToastState{
    type:ToastState,
    message:string
}
type ToastState='success' | 'warning' | 'error';

export interface IToastAction{
    alert:string,
    type:string
}

export interface ILoginPopupActionState{
    type:string,
    payload:any
}

export interface ILoginState{
    type:string,
    popupenabled:boolean
}

export interface ILoadingState{
    loading:boolean,
    type:string
}
export interface ILoadingAction{
    loading:boolean
}

export interface ISearchState{
    type:string,
    searchKey:string
}
export interface ISearchAction{
    type:string,
    searchKey:string
}