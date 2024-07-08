import { IToastState } from "../redux/actions"

export interface IStore{}

export interface RootState{
    cartReducers:ICartReducers,
    buyNowReducers:IBuyNowReducers,
    searchReducer:ISearcReducers,
    loginReducer:ILoginPopup,
    loadingReducer:ILoading,
    toastReducer:IToastState,
    plpProductReducer:any,
    addressPaymentReducer:any
}

export interface ImagesInterface{
    data:ImageDataInterface[]
}
export interface ImageDataInterface{
    attributes:ImageDataAttributeInterface
}

export interface ImageDataAttributeInterface{
    url:string
}
export interface IProduct{
    img:string
    name:string,
    brand:string,
    price:string,
    qty:number,
    _id:number | string,
    imagesUrl?:Image[],
    detail?:string,
    mrp:string,
    offer?:IOffer
}

export interface ICartReducers{
    cartItems:IProduct[]
    totalCartItems:number
}

export interface IWishlistReducers{
    totalWLItems:string[],
    wishlistReducers:any[]
}

export interface IBuyNowReducers{
    buyNowItems:IProduct
}

export interface ISearcReducers{
    searchKey:string
}


export interface IProductTile{
    imgSrc:Image[],
    name:string,
    brand:string,
    price:string,
    mrp:string,
    offer?:IOffer,
    btnText:string,
    productId:string|number,
    className:string
}

export interface IOffer{

}
export interface Image{
    url:string
}


export interface INotification{
    type:string,
    message:string
}
export interface ILoading{
    type:string,
    loading:boolean
}
export interface ILoginPopup{
    type:string,
    popupenabled:boolean
}

export interface IAdress{
    fName:string,
    lName:string
    addressLine1:string,
    addressLine2:string,
    state:string,
    district:string,
    pincode:string,
    mobile:string,
    email:string,
    userId:string,
    isPrimary?:boolean
}