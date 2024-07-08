import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import './CheckoutPage.css'
import axios from 'axios';
import { pincodeUrl, serverUrl } from '../commonVar';
import { useNavigate } from 'react-router-dom';
import OrderSummaryComponent from '../components/OrderSummaryComponent';
import {useForm,Controller} from 'react-hook-form'
import stateData from '../utils/stateSelector';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, Menu } from '@mui/material';
import PaymentTypes from '../components/PaymentTypes';
import { IAdress } from '../utils/types';
import { getToken, getUserData, loginHeader } from '../utils/storage';
import { addressAndPayment, notify } from '../redux/actions';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'

export interface IForm{
  firstName:string,
  lastName:string,
  state:string,
  district:string,
  pinCode:string,
  mobile:string,
  email:string,
  address1:string,
  address2:string
}
export type OrderSummaryNext = () => any
export default function CheckoutPage(){
    // const [form,updateForm]= useState({firstName:'',lastName:'',address1:'',address2:'',state:'',disctrict:'',pincode:'',mobile:'',email:''})
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        control,
        setValue
      } = useForm<IForm>();
      const [firstName,lastName,state,district,pinCode,mobile,email,address1,address2]=watch(
        ['firstName','lastName','state','district','pinCode','mobile','email','address1','address2']
    )
    const [payments,setPayments]=useState([{
      type:'COD',
      id:'COD',
      isChecked:false
    },
    {
      type:'UPI',
      id:'UPI',
      isChecked:false
    },
    {
      type:'Card',
      id:'CARD',
      isChecked:false
    }
  ])
    const [isValidate,setIsValidate]=useState<boolean>(false)
    const [canGoNext,setCanGoNext]=useState<boolean>(false)
    const [addressList,setAddressList]=useState<IAdress[]>([])
    const [isAddAdress,setAddAddress]=useState<boolean>(false)
    const [cardOrUpiPresent,setCardUpiVisibility]=useState<boolean>(false)
      const {states,getDistrict}=stateData
      const checkNumber = (event:ChangeEvent<HTMLInputElement>, onChange:any) => {
        const inputValue = event.target.value;
        const filteredValue = inputValue.replace(/[^0-9]/g, '');
        onChange(filteredValue);
      };

    const dispatch=useDispatch();

    useEffect(()=>{
      let arr=[firstName,lastName,state,district,pinCode,mobile,email,address1,address2]
      let isEmpty=false
      arr.forEach(el=>{
        if(el==''){
          isEmpty=true
        }
      })
      if(isEmpty){
        console.log('something is still blank')
        setIsValidate(false)
      } else {
        setIsValidate(true)
      }
    },[firstName,lastName,state,district,pinCode,mobile,email,address1,address2])


    const handleNextClick = (next: () => void) => {
      if (canGoNext) {
        next();
      }
    };
    useEffect(()=>{
      if(addressList.length){
        let primary=addressList.filter(address=>address.isPrimary)
        if(!primary.length){
          let temp=[...addressList];
          temp[0].isPrimary = true;
          setAddressList(temp)
        }
      }
    },[addressList])
    const addNewAddress=()=>{
      axios.post(serverUrl+'/api/addresses',{
        fName:firstName,
        lName:lastName,state,district,pincode:pinCode,
        mobile:mobile,email:email,addressLine1:address1,addressLine2:address2,
        userId:getUserData()!._id
      },{headers:loginHeader})
      .then(res=>{
        dispatch(notify({type:'success',message:'added new address'}))
        const address=addressList
        address.splice(addressList.length-1,1,res.data,{} as any)
        setAddressList([...address])
      })
      .catch(e=>{
        dispatch(notify({type:'error',message:e.message}))
      })
      return;
    }
    useEffect(()=>{
      axios.get(serverUrl+'/api/addresses/'+getUserData()._id,{headers:{
        "x-auth-token":getToken()
      }})
      .then(res=>{
        setAddressList([...res.data,{}])
      })
      .catch(err=>{})
    },[])

    const selectAddress=(idx:number)=>{
      let addresses=[...addressList]
      addresses.forEach(ad=>{
        ad.isPrimary! =false;
      })
      addresses[idx].isPrimary! = true;
      setAddressList(addresses)
    }
    const isDisabled=useMemo(()=>{
      if(cardOrUpiPresent) return !cardOrUpiPresent
      if(!payments.length) return true;
      return !payments[0].isChecked;
    },[payments,cardOrUpiPresent])
    return (
      <div className="checkoutContainer ">
        <div className="addressSection pb-4 relative">
          <p className='p-2 text-lg'>Address</p>
          {!!addressList.length && <div className='flex flex-wrap gap-2 cursor-pointer'>
              {addressList.map((el:IAdress,index)=>index<4 &&<div key={el.addressLine1+index} className='addressCard border px-3 py-2 rounded-[4px] w-[200px] relative'>
                {el.fName ? <div onClick={()=>selectAddress(index)}><div className='relative'>{el.fName}</div>
                {el.isPrimary && <div className='absolute right-2 top-2 text-sm bg-yellow-100 px-2 rounded-full'>active</div>}
                <div>{el.addressLine1}</div>
                <div>{el.district} {el.state} - {el.pincode}</div>
                </div>:
                addressList.length<5 && <div onClick={()=>setAddAddress(true)} className='text-center'>
                  <AddIcon />
                  <div>Add New Address</div>
                </div>
              }
              </div>)}
            </div>}
          {(isAddAdress || addressList.length==0) && <div className="inputField">
            <div className="flex gap-8">
              <div className='absolute right-0'>
              <Button onClick={()=>{setAddAddress(false)}} >
                <CloseIcon />
              </Button>
              </div>
              <div className="pb-6 w-full">
                <div className="label">First Name</div>
                <input
                  className="w-full"
                  {...register("firstName", {
                    required: {
                      message: "First name is required",
                      value: true,
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="inputError">{errors.firstName.message}</p>
                )}
              </div>
              <div className="pb-6 w-full">
                <div className="label">Last Name</div>
                <input
                  className="w-full"
                  {...register("lastName", {
                    required: { value: true, message: "Last name is required" },
                  })}
                />
                {errors.lastName && (
                  <p className="inputError">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="pb-6">
              <div className="label">Address line 1</div>
              <input
                className="w-full"
                {...register("address1", {
                  required: {
                    value: true,
                    message: "Address line 1 is required",
                  },
                })}
              />
              {errors.address1 && (
                <p className="inputError">{errors.address1.message}</p>
              )}
            </div>
            <div className="pb-6">
              <div className="label">Address line 2</div>
              <input className="w-full" {...register("address2")} />
              {errors.address2 && (
                <p className="inputError">{errors.address2.message}</p>
              )}
            </div>
            <div className="flex gap-8">
              <div className="w-full pb-6">
                <div className="label">State</div>
                <div>
                <FormControl fullWidth>
                  <Controller
            name="state"
            defaultValue={''}
            control={control}
            rules={{required:{value:true,message:'Please select state'}}}
            render={({ field }) => (
                    <Select
                      labelId="selectState"
                      className='stateSelect'
                      id="stateSelect"
                      // value={'state'}
                      // onChange={()=>{}}
                        {...field}
                    >
                        {states &&
                      states.map((state) => {
                        return (<MenuItem value={state.state} key={state.state}>{state.state}</MenuItem>)
                        })}
                    </Select>
            )}
          />
                  </FormControl>
                </div>
                {errors.state && (
                  <p className="inputError">{errors.state.message}</p>
                )}
              </div>
              <div className="w-full pb-6">
                <div className="label">District</div>
                <div>
                  <FormControl fullWidth>
                  <Controller
            name="district"
            defaultValue={''}
            control={control}
            rules={{required:{value:true,message:'Please select district'}}}
            render={({ field }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      className='districtSelect'
                      id="districtSelect"
                      // value={'Age'}
                      // onChange={()=>{}}
                        {...field}
                    >
                        {states &&
                      getDistrict(state) &&
                      getDistrict(state).map((district:string) => {
                        return (<MenuItem value={district} key={district}>{district}</MenuItem>)
                        })}
                    </Select>
            )}
          />
                  </FormControl>
                </div>
                {errors.district && (
                  <p className="inputError">{errors.district.message}</p>
                )}
              </div>
            </div>
            <div className="flex gap-8 pb-6">
              <div className="w-full ">
                <div className="label">Pincode</div>

                <Controller
          name="pinCode"
          control={control}
          defaultValue=""
          rules={{
            required:{value:true,message:'Please Enter 6 digit pin code'},
          }}
          render={({ field: { onChange, value} }) => (
            <input
              className="w-full numberInput"
              inputMode="numeric"
              pattern="[^0-9]*"
              maxLength={6}
              value={value}
              onChange={(e) => checkNumber(e, onChange)}
            />
          )}
        />

                {errors.pinCode && (
                  <p className="inputError">{errors.pinCode.message}</p>
                )}
              </div>
              <div className="w-full ">
                <div className="label">Mobile</div>
                <Controller
          name="mobile"
          control={control}
          defaultValue=""
          rules={{
            required:{value:true,message:'Please enter mobile number'}
          }}
          render={({ field: { onChange, value } }) => (
            <input
              className="w-full numberInput"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              value={value}
              onChange={(e) => checkNumber(e, onChange)}
            />
          )}
        />
                {errors.mobile && (
                  <p className="inputError">{errors.mobile.message}</p>
                )}
              </div>
            </div>
            <div className="w-full pb-6">
              <div className="label">Email</div>
              <input className="w-full " {...register("email",
              {required:{
                value:true,message:'Please Enter your email'
              },
              pattern:{
                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message:'Please enter valid email address'
              }
            }
              )} />
              {errors.email && (
                <p className="inputError">{errors.email.message}</p>
              )}
            </div>
          <div className='pb-4'>
            <Button onClick={()=>addNewAddress()} className='addressBtn ' disabled={!isValidate} style={{backgroundColor:'#E44141'}} fullWidth variant='contained'>ADD ADDRESS</Button>
          </div>
          </div>}
          {(!isAddAdress && !!addressList.length) && <div>
            <p className='p-2 text-lg'>Payment</p>
            <div className="payment Types">
              <PaymentTypes onChange={(data:any,isValid:boolean)=>{
                setCardUpiVisibility(isValid)
                setPayments(data)}} payments={payments}  onUpdate={(isValid:boolean)=>setCardUpiVisibility(isValid)}/>
            </div>
          </div>}
        </div>
        <div className="billSection">
          <OrderSummaryComponent disabled={isDisabled} onClick={handleNextClick} activeStep={2} address={addressList.filter(ad=>ad.isPrimary)![0]} paymentType={payments.filter(p=>p.isChecked)[0]?.type}/>
        </div>
      </div>
    );
}