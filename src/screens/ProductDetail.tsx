import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios'
import { serverUrl } from "../commonVar";
import './ProductDetails.css'
import { useDispatch } from "react-redux";
import { addToCart, buyNowProducts, notify } from "../redux/actions";
import Slider from "react-slick";
import { IProduct } from "../utils/types";
import Check from '@mui/icons-material/CheckCircle'
import Cart from "@mui/icons-material/ShoppingCart";
import RightArrow from "@mui/icons-material/ChevronRight";
import LeftArrow from "@mui/icons-material/ChevronLeft";
import { Button } from "@mui/material";

export default function ProductDetail(){
    window.addEventListener("scroll", (e) =>{
        // console.log('scrolling')
    });
    const navigate = useNavigate();
    const [searchParams]= useSearchParams()
    const [product,setProductDetail]=useState<IProduct>({
        name: "",
        brand:'',
        img:'',
        price:'',
        qty:0,
        _id:'',
        mrp:'',
        imagesUrl:[{url:''}]
    })
    const [productQty,updateQty]=useState<number[]>([])
    const [currentQty,updateCurrentQty]=useState<number>(1)
    const [currentImage,updateCurrentImgae]=useState<string>('')
    const [currentCarouselIndex,updateCarouselIndex]=useState(0)
    const [isLastItem,setLastItem]=useState(true)
    const [isFirstItem,setFirstItem]=useState(false)
    const carouselRef=useRef<HTMLInputElement>()
    const id=searchParams.get('id')!
    const dispatch=useDispatch()
    const goToCart=()=>{
        navigate('../Cart')
    }

    const addToCartFunction=()=>{
        dispatch(addToCart({...product,qty:currentQty}))
    }
    
    const handleScroll=(e:any)=>{
        let defaultScrollTop=0;
        if(e.target.scrollTop>defaultScrollTop){
            defaultScrollTop=e.target.scrollTop
            setFirstItem(true)
        } else {
            defaultScrollTop=e.target.scrollTop
            setLastItem(true)

        }
    }
    useEffect(()=>{
        if(carouselRef.current){
            carouselRef.current.addEventListener('scroll',handleScroll)
            carouselRef.current.addEventListener('scrollend',(e)=>{
            })
        }
    },[])
    useEffect(()=>{
        axios.get(`${serverUrl}/api/products/${id}`).then(res=>{
            setProductDetail(res.data)
        })
        .catch(err=>{
            dispatch(notify({type:'error',message:err.message}))
        })
    },[])
    useEffect(()=>{
        if(currentCarouselIndex==4){
            carouselRef.current?.scrollTo({top:360,left:0,behavior:'smooth'})   
        }
        else if(carouselRef.current && currentCarouselIndex!=0){carouselRef.current.children[currentCarouselIndex].scrollIntoView({behavior:'smooth',block:'start'})} else if(carouselRef.current){
            carouselRef.current.scrollTo({top:0,left:0,behavior:'smooth'})
        }
        if(currentCarouselIndex==8) {setFirstItem(true);setLastItem(false);}
    },[currentCarouselIndex])
    useEffect(()=>{
        if(product!=undefined){
            let qty=[]
            updateCurrentImgae(product.imagesUrl![0].url!)
            for(var i=1;i<=product.qty;i++){
                qty.push(i)
            }
            updateQty(qty)
        }
    },[product])
    const settings = {
        customPaging: function(i:number) {
          return (
            <a>
              <img style={{height:'40px',width:'40px'}} src={product.imagesUrl![i].url} />
            </a>
          );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:<div className="slick-next"><LeftArrow /></div>,
        nextArrow:<div className="slick-prev"><RightArrow /></div>
      };
    return(
        <div className="productDetail">
            {product!=undefined &&
                <div className="product">
                {product.imagesUrl &&
                    <div className="productImages relative">
                        <Slider vertical={false} {...settings}>
                            {product.imagesUrl.map(el=>
                                <div style={{height:'400px'}} key={el.url}>
                                    <img src={el.url} style={{height:'400px',width:'100%',objectFit:'contain',margin:'auto'}} />
                                </div>
                            )}
                        </Slider>
                    </div>
                }
                <div>
                </div>
                <div className="productDesc">
                    <div style={{lineHeight:1.3,marginBottom:'14px'}}>
                        <div className="productName">{product.name}</div>
                        <div className="brandName">{product.brand}</div>
                    </div>
                    <div>₹ {product.price}</div>
                    <div>{product.detail}</div>
                    <div className="flexStyle" style={{marginBlock:'20px',fontSize:'14px'}}>
                        <select onChange={e=>{
                            let num=e.target.value as unknown as number;
                            updateCurrentQty(num)
                            }} style={{border:'1px solid #d0d0d0',paddingBlock:'3px',paddingInline:'7px'}}>
                            {productQty.map(el=>{

                                return <option key={el}>{el}</option>
                            })

                            }
                        </select>
                        {product.qty>0?
                        <div style={{color:'#31DC42',justifyContent:'center',gap:'10px'}} className="flexStyle">
                           <div>In stock</div>  <Check />
                        </div>
                        :
                        <div>
                            Out of Stock
                        </div>
                        }
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:12,marginBlock:20}}>
                        <div style={{display:'flex'}}>
                            <Button onClick={addToCartFunction} className='addCartBtn' style={{background:'transparent',color:'#0009'}}>Add to cart <Cart/> </Button>
                        </div>
                        <button className='addCartBtn' onClick={()=>goToCart()}>BUY NOW </button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}