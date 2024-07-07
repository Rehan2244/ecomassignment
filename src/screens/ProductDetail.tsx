import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios'
import { serverUrl } from "../commonVar";
import './ProductDetails.css'
import { useDispatch } from "react-redux";
import { buyNowProducts, notify } from "../redux/actions";
import Slider from "react-slick";
import { IProduct } from "../utils/types";
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
        id:'',
        mrp:'',
        images:{
            data:[{attributes:{url:''}}]
        }
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
        dispatch(buyNowProducts({...product,id,qty:currentQty,img:serverUrl+currentImage}))
        navigate('../CheckoutPage')
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
        axios.get(`${serverUrl}/api/products/${id}?populate=*`).then(res=>{
            console.log('product is')
            setProductDetail(res.data.data.attributes)
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
            updateCurrentImgae(product.images?.data[0].attributes.url!)
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
              <img style={{height:'40px',width:'40px'}} src={serverUrl+product.images?.data[i].attributes.url} />
            </a>
          );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    return(
        <div className="productDetail">
            {product!=undefined &&
                <div className="product">
                {product.images &&
                    <div className="productImages">
                        <Slider vertical={false} {...settings}>
                            {product.images.data.map(el=>
                                <div style={{height:'400px'}} key={el.attributes.url}>
                                    <img src={serverUrl+el.attributes.url} style={{height:'400px',width:'100%',objectFit:'contain',margin:'auto'}} />
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
                        <div className="brandName">BRAND NAME HERE</div>
                    </div>
                    <div>price: {product.price}</div>
                    <div>detail {product.detail}</div>
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
                           <div>In stock</div>  <img style={{width:'20px'}} src='/images/checkmark-circle.svg' />
                        </div>
                        :
                        <div>
                            Out of Stock
                        </div>
                        }
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:12,marginBlock:20}}>
                        <div style={{display:'flex'}}>
                            <button className='addCartBtn' style={{background:'transparent',color:'#0009'}}>Add to Wishlist</button>
                            <div style={{width:'2px',flex:1,border:'1px solid #0006'}}></div>
                            <button className='addCartBtn' style={{background:'transparent',color:'#0009'}}>Add to cart</button>
                        </div>
                        <button className='addCartBtn' onClick={()=>goToCart()}>BUY NOW </button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}