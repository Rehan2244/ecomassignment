import { useDispatch, useSelector } from 'react-redux'
import './Header.css'
import React, { useMemo } from 'react'
import { useEffect, useState } from 'react'
import { serverUrl } from '../commonVar'

import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useDebounce } from '../utils/debounce'
import { getUserData, logout } from '../utils/storage'
import { loginPopup, notify, searchNowAction } from '../redux/actions'
import { MenuList } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ProductBar from './ProductBar'
import { ICartReducers, RootState } from '../utils/types'
const formatText = (text:string,substringToBold:string) => {
    const regex = new RegExp(`(${substringToBold})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => (
      regex.test(part) ? <span style={{fontFamily:'InterBold'}} key={index}>{part}</span> : part
    ));
  };

export default function Header(){

    const [anchorEl, setAnchorEl] = React.useState<any|null>(null);
    const [cartMenuAnchor, setAnchorCartMenu] = React.useState<any>(null);
    const [visibleSuggestion,updateSugestionDisplay]=useState(false)
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
    const [suggestions,updateSearchSuggestions]=useState([])
    const [searchKey,updateSearchKey]=useState('')
    useEffect(()=>{
        updateCart(cart)
    },[cart])
    useEffect(()=>{
        axios.get(serverUrl+'/api/get_all_keywords')
        .then(res=>{
            updateSearchSuggestions(res.data)
        })
        .catch(err=>{})
    },[])
    const handleSearch=useDebounce((e)=>{
        axios.post(serverUrl+'/api/register_key',{search:e.target.value,id:user.id})
        .then(res=>{
            console.log('response is',res)
        })
        .catch(err=>{
            dispatch(notify({type:'error',message:err.message}))
        })
    },1500)
    const search=(e:any)=>{
        e.preventDefault()
        dispatch(searchNowAction(searchKey))
        if(!window.location.pathname.includes('search')){
            navigate('../search?key='+searchKey)
        }
        updateSugestionDisplay(false)
        return
    }
    useEffect(()=>{
        if(searchReducer.searchKey){
            console.log('Search key is updated')
        }
    },[searchReducer])
    return(
        <div className="header">
            <div className='headerContainer'>
                <div className='input'>
                    <form onSubmit={search} style={{display:'flex',alignItems:'center',width:'100%'}}>
                        <input value={searchKey} onChange={(e)=>{if(e.target.value!='')updateSugestionDisplay(true); else updateSugestionDisplay(false);updateSearchKey(e.target.value)}} onKeyUp={(e)=>{if(e.key=='Enter' || e.key == 'Backspace') return;handleSearch(e)}} />
                        <img src='/images/search-outline.svg' />
                    </form>
                    <div className='suggestionSearch'>
                        {suggestions.map((el:string)=>{
                            if(searchKey!='' && el && el.includes(searchKey) && visibleSuggestion)
                                return <div key={el} onClick={()=>{updateSearchKey(el);updateSugestionDisplay(false)}} className='item'>{formatText(el,searchKey)}</div>
                            }
                        )}
                    </div>
                </div>
                <div className='icons'>
                    <div id="icon" className='icon' onClick={(event:any)=>cartItem.totalCartItems>0?setAnchorCartMenu(event.currentTarget):setAnchorCartMenu(null)}>
                        <Badge id="icon" anchorOrigin={{vertical: 'bottom',horizontal: 'left'}} badgeContent={cart.cartItems.length?cartItem.totalCartItems:0} color="primary">
                            <img id="icon" src='/images/cart.svg' />
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
                                        navigate('/OrderSummary',{})
                                    }} className='addCartBtn'>CHECKOUT</button>
                                    </div>
                                </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}