import { ChangeEvent, useEffect, useState } from 'react'
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
import { Menu } from '@mui/material';
import PaymentTypes from '../components/PaymentTypes';

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
    const [payments,setPayments]=useState([])
    const [isValidate,setIsValidate]=useState(false)
    const [canGoNext,setCanGoNext]=useState(false)
      const {states,getDistrict}=stateData
      const checkNumber = (event:ChangeEvent<HTMLInputElement>, onChange:any) => {
        const inputValue = event.target.value;
        const filteredValue = inputValue.replace(/[^0-9]/g, '');
        onChange(filteredValue);
      };

    useEffect(()=>{
        if(pinCode?.length>5){
            axios.get(pincodeUrl.getPaymentUrl+'pin='+pinCode)
            .then(res=>{
                if(res.data.message=='Got payment lists'){
                    setPayments(res.data.paymentTypes)
                } else {
                    setPayments([])
                }
            })
        }
    },[pinCode])

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
    return (
      <div className="checkoutContainer">
        <div className="addressSection">
          <p>Address</p>
          <div>IF USER LOGGED IN</div>
          <div className="inputField">
            <div className="flex gap-8">
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
                  {/* <select className="w-full">
                    {states &&
                      getDistrict(state) &&
                      getDistrict(state).map((district) => {
                        return (
                          <option value={district} key={district}>
                            {district}
                          </option>
                        );
                      })}
                  </select> */}
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
          </div>
          <p>Payment</p>
          {/* <p onClick={handleSubmit(hello)}>Payment</p> */}
          <div className="payment Types">
            <PaymentTypes payments={payments} />
          </div>
        </div>
        <div className="billSection">
          <OrderSummaryComponent disabled={!isValidate} onClick={handleNextClick} activeStep={2} />
        </div>
      </div>
    );
}