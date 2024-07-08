import { useDispatch, useSelector } from 'react-redux'
import './Header.css'
import React, { useMemo } from 'react'
import { useEffect, useState } from 'react'
import { serverUrl } from '../commonVar'

import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useDebounce } from '../utils/debounce'
import { getToken, getUserData, loginHeader, logout } from '../utils/storage'
import { loading, notify, searchNowAction } from '../redux/actions'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Search from '@mui/icons-material/Search';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ProductBar from './ProductBar'
import { ICartReducers, RootState } from '../utils/types'
import { Button } from '@mui/material'

export default function Header(){

    const [anchorEl, setAnchorEl] = React.useState<any|null>(null);
    const [cartMenuAnchor, setAnchorCartMenu] = React.useState<any>(null);

    const open = Boolean(anchorEl);
    const cartOpen = Boolean(cartMenuAnchor);
    useEffect(()=>{
        console.log('opened',cartMenuAnchor,cartOpen)
    },[cartMenuAnchor,cartOpen])
    const user=getUserData()
    const navigate=useNavigate()
    const handleClose=()=>{
        setAnchorEl(null);
        setAnchorCartMenu(null);
    }
    const dispatch=useDispatch()
    useMemo(()=>{
        document.addEventListener('click',(e:Event)=>{
            let target = e.target as HTMLInputElement;
            e.preventDefault()
            if(target.id!='icon'){
                setAnchorEl(null)
                setAnchorCartMenu(null)
            }
        })
    },[])
    let [cartItem,updateCart]=useState<ICartReducers>({
        cartItems:[],
        totalCartItems:0
    })
    let cart=useSelector((state:RootState)=>{
        return state.cartReducers})
    let buyNowItems=useSelector((state:RootState)=>state.buyNowReducers)
    let searchReducer=useSelector((state:RootState)=>state.searchReducer)

    const [searchKey,updateSearchKey]=useState('')
    useEffect(()=>{
        updateCart(cart)
    },[cart])

    const handleSearch=useDebounce((e)=>{
        dispatch(loading({type:'Loading',loading:true}))

    },1500)
    const search=(e:any)=>{
        e.preventDefault();
        dispatch(searchNowAction(searchKey))
        if(!window.location.pathname.includes('search')){
            navigate('../search?key='+searchKey)
        }
        return
    }
    
    return(
        <div className="header">
            <div className='headerContainer'>
                <div className='flex items-center gap-12 ml-10'>
                    <img src='/Logopng.png' className='h-9 cursor-pointer' onClick={()=>navigate('/Home')} />
                <div className='input'>
                    <form onSubmit={search} style={{display:'flex',alignItems:'center',width:'100%'}}>
                        <input value={searchKey} onChange={(e)=>{updateSearchKey(e.target.value)}} onKeyUp={(e)=>{if(e.key=='Enter' || e.key == 'Backspace') return;}} />
                        <Search/>   
                    </form>
                </div>
                </div>
                <div className='icons cursor-pointer'>
                    <Button style={{color:'#fff',marginRight:'30px',zIndex:99999}} onClick={()=>logout()}>Logout</Button>
                    <div id="icon" className='icon' >
                        <Badge id="icon" anchorOrigin={{vertical: 'bottom',horizontal: 'left'}} badgeContent={cart.cartItems.length?cartItem.totalCartItems:0} color="primary">
                            <div className='text-white'>
                                <ShoppingCartIcon/>
                            </div>
                        </Badge>
                        <div>

                                <Menu anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} id="basic-menu" anchorEl={cartMenuAnchor} open={cartOpen} onClose={handleClose} MenuListProps={{'aria-labelledby': 'basic-button'}}>
                                    {cart.cartItems.map(item=><MenuItem onClick={handleClose}>
                                        <ProductBar product={item} variant={'MiniCart'} />
                                    </MenuItem>)}
                                    <div className='flex justify-between py-2 px-5'>
                                        <div>Total Items</div>
                                        <div>{cart.totalCartItems}</div>
                                    </div>
                                    <div className='py-2 px-5'>
                                    <button  onClick={()=>{
                                        navigate('/Cart',{})
                                    }} className='addCartBtn'>CHECKOUT</button>
                                    </div>
                                </Menu>
                        </div>
                    </div>
                        <div id="icon" className='w-full h-full absolute' onClick={(event:any)=>cartItem.totalCartItems>0?setAnchorCartMenu(event.currentTarget):setAnchorCartMenu(null)}>

                        </div>
                </div>
            </div>
        </div>
    )
}