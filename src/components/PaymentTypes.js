import { Input, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import FormControl from '@mui/material/FormControl';

const PaymentTypes=({payments,onChange,onUpdate})=>{

    const {control,watch}=useForm({})
    const [upi,cardNumber,expiry,cvv]=watch(['upi','cardNumber','expiry','cvv'])
    const [radio,setRadio]=useState([])
    useEffect(()=>{
        if(payments.length){
            setRadio(payments)
        }
    },[payments])
    const handleChange=(idx)=>{
        const temp=[...radio]
        temp.map(el=>{
            el.isChecked=false
        })
        temp[idx].isChecked=true;
        setRadio(temp)
        onChange(temp,isValid)
    }
    const isValid=useMemo(()=>{
        if(radio.length){
            if(radio[1].isChecked){
                return upi?true:false
            } else if(radio[2].isChecked){
                return cvv && expiry && cardNumber?true:false
            }
        } else{
            return false
        }
    },[upi,cardNumber,expiry,cvv,radio])
    useEffect(()=>{
        console.log('valid',isValid)
        onUpdate(isValid)
    },[isValid])
    return (
    <div className="payment">
        {radio.map((pay,idx)=>{
            return <div key={pay.id} className="my-1 w-8/12 flex flex-col gap-3">
                    <label for={pay.id} className="cursor-pointer relative">
                        <div className="absolute w-full h-full" onClick={(e)=>{handleChange(idx)}}></div>
                        <input checked={pay.isChecked}   type="radio" name={pay.id} />
                        <span>{' '+pay.type}</span>
                    </label>
                    {pay.isChecked && pay.id=='UPI' && <div>
                        <FormControl>
                            <Controller
                            name="upi"
                            defaultValue={''}
                            control={control}
                            rules={{required:{value:true,message:'Please enter upi ID'}}}
                            render={({ field }) => (
                                <TextField {...field} id="outlined-basic" label="vpa address" type='text' variant="outlined" placeholder="Enter your UPI ID here" />
                                )}>
                            </Controller>
                        </FormControl>
                        </div>}
                    {pay.isChecked && pay.id=='CARD' && <div className="flex flex-col gap-3">
                        <FormControl>
                            <Controller name="cardNumber"
                                control={control}
                                rules={{required:{value:true,message:'Please enter card number'}}}
                                render={({field})=>(
                                    <TextField {...field} id="outlined-basic" fullWidth label="Card number" type='text' variant="outlined" placeholder="Enter your card number" />
                                )}
                            />
                            <div className="flex w-full gap-3 mt-3">
                            <Controller name="expiry"
                                control={control}
                                rules={{required:{value:true,message:'Please enter card expiry date'}}}
                                render={({field})=>(
                                    <TextField {...field} id="outlined-basic" label="expiry date" type='text' variant="outlined" placeholder="Enter your card expiry date" className="w-full"  />
                                )}
                            />
                            <Controller name="cvv"
                                control={control}
                                rules={{required:{value:true,message:'Please enter card CVV'}}}
                                render={({field})=>(
                                    <TextField {...field} id="outlined-basic" label="CVV" type='text' variant="outlined" placeholder="Enter your card cvv"  className="w-full"/>
                                )}
                            />
                            </div>
                        </FormControl>
                    </div>}
                </div>
        })}
    </div>
    )}
export default PaymentTypes;