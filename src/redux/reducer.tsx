import { combineReducers } from "redux";
import { IProduct } from "../utils/types";
import { ICartState, IWishListState, ICartAction, IWishlistAction, IBuyNowState, IBuyNowAction, IToastState, IToastAction, ILoginState, ILoginPopupActionState, ILoadingState, ILoadingAction, ISearchState, ISearchAction } from "./actions";

const initialCartState:ICartState={
    cartItems:[],
    totalCartItems:0,
};

const initialWLState:IWishListState={
    wishListItems:[],
    totalWLItems:0,
}
const cartReducers=(state=initialCartState,action:ICartAction)=>{

    switch(action.type){
        case 'ADD_TO_CART':
            return pushItemsToCart(state,action)
        case 'REMOVE_FROM_CART':
            return removeFromCart(state,action as unknown as IProduct)
        default: return state;
    }
}

const removeFromCart=(state=initialCartState,action:IProduct)=>{
    if (state.cartItems.find(item => item.id == action.id)) {
        state.cartItems.forEach((item,index) => {
            if (item.id == action.id) {
                state.totalCartItems-=item.qty;
                state.cartItems.splice(index,1)
            }
        })
    }
    return state;
}
const wishlistReducers=(state=initialWLState,action:IWishlistAction)=>{
    switch(action.type){
        case 'ADD_TO_WISHLIST':
            return pushItemsToWL(state,action)
        default:return state;
    }
}

const pushItemsToCart=(tempState:ICartState,action:ICartAction)=>{
    let state={...tempState}
    state.totalCartItems++;
    if(state.cartItems.length){
        console.log('length',state.cartItems.find((item:IProduct)=>item.id==action.cartItems.id))
        if(state.cartItems.find((item:IProduct)=>item.id==action.cartItems.id)){
            state.cartItems.find((item:IProduct)=>{
                if(item.id==action.cartItems.id){
                    item.qty+=1
                }
            })
        } else {
            state.cartItems.push(action.cartItems)
        }
        return state;
    } else {
        state.cartItems.push(action.cartItems)
    }
    return state;
}
const pushItemsToWL=(tempState:IWishListState,action:IWishlistAction)=>{
    let state={...tempState}
    if(!state.wishListItems.length){
        state.wishListItems.push(action.wishListItems)
        state.totalWLItems++;
        return state;
    } else{
        let found=false
        state.wishListItems.forEach((el,idx)=>{
            if(el.id==action.wishListItems.id){
                state.wishListItems.splice(idx,1)
                state.totalWLItems--
                found=true;
            }
        })
        if(!found){
                state.wishListItems.push(action.wishListItems)
                state.totalWLItems++;
        }
        return state;
    }
}


const buyNowItemsState:IBuyNowState={
    buyNowItems:undefined
}
const buyNowReducers=(state=buyNowItemsState,action:IBuyNowAction)=>{
    return action.buyNowItems!==undefined? {buyNowItems:action.buyNowItems}:state
}
const toastState:IToastState={
    type:'success',
    message:''
}
const toastReducer=(state=toastState,action:IToastAction)=>{
    return action.alert!==undefined? action.alert:state
}
const loginState:ILoginState={
    type:'login',
    popupenabled:false
}
const loginReducer=(state=loginState,action:ILoginPopupActionState)=>{
    return action.payload?action.payload:state;
}
const loadingState:ILoadingState={
    type:'loading',
    loading:true
}
const loadingReducer=(state=loadingState,action:ILoadingAction)=>{
    return action.loading!==undefined? action.loading:state
}
const searchState:ISearchState={
    type:'search',
    searchKey:''
}
const searchReducer=(state=searchState,action:ISearchAction)=>{
    return {type:'search',searchKey:action.searchKey}
}
export const rootReducer=combineReducers({
    cartReducers,
    wishlistReducers,
    buyNowReducers,
    toastReducer,
    loadingReducer,
    loginReducer,
    searchReducer
})