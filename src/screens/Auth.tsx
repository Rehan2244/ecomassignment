import { Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { serverUrl } from "../commonVar";
import { loginPopup, notify } from "../redux/actions";
import { getUserData, loginHeader, saveToken, saveUserData } from "../utils/storage";
import { RootState } from "../utils/types";
import { useNavigate } from "react-router-dom";


const Auth=()=>{

    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [phone,setPhone] = useState('')
    const [login,setLogin]=useState(true)
    const [loading,setLoading]=useState(false)

    const open = useSelector((state:RootState)=>state.loginReducer.popupenabled)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const loginNow=()=>{
      setLoading(true)
      axios.post(serverUrl+'/api/auth/login',{email,password})
      .then(res=>{
        if(!res.data.token){
          dispatch(notify({type:'error',message:'Error logging in'}))
        } else{
          saveToken(res.data.token)
          dispatch(notify({type:'success',message:'Successfully logged in'}))
          getLoggedinUser(res.data.token);
        }
        setLoading(false)
      })
      .catch(err=>{
        dispatch(notify({type:'error',message:err.message}))
        setLoading(false)
      })
    }

    const getLoggedinUser=(token:string)=>{
        axios.get(serverUrl+'/api/auth/user',{headers:{"x-auth-token":token}})
        .then(res=>{
            saveUserData(res.data)
            navigate('../Home')
        })
        .catch(e=>{
            notify({type:'error',message:'Something bad happened'})
        })
    }
    const signUp=()=>{
        setLoading(true)
        axios.post(serverUrl+'/api/auth/register',{email,password,name,phone_number:phone})
        .then(res=>{
          if(!res.data.token){
            dispatch(notify({type:'error',message:'Error occured'}))
          } else{
            dispatch(notify({type:'success',message:'Successfully registered login now'}))
            // saveUserData(res.data.user)
          }
          setLoading(false)
        })
        .catch(err=>{
          dispatch(notify({type:'error',message:err.message}))
          console.log('error occured')
          setLoading(false)
        })
      }

    const style = {
        margin:'auto',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
      };
    const isDisabled=()=>{
        if(login ){
            return email === '' || password ===''? true:false;
        } else{
            return email === '' || password ==='' || confirmPassword===''? true:false;
        }
    }

    useEffect(()=>{
      if(getUserData()){
        navigate('/Home')
      }
    },[])
    return    <div className="flex items-center h-screen" >
    <Box sx={style}>
    <div className="flex flex-col items-center justify-between" >
    <div style={{marginBottom:'20px'}}>{login?'Login':'Register'}</div>
      {!login&&<div style={{width:'100%',textAlign:'center'}}>
        <TextField value={name} onChange={e=>setName(e.target.value)} style={{width:'80%'}} id="outlined-basic" label="Name" variant="outlined" />
      </div>}
      <div style={{marginTop:'20px',width:'100%',textAlign:'center'}}>
        <TextField value={email} onChange={e=>setEmail(e.target.value)} style={{width:'80%'}} id="outlined-basic" label="Email" required variant="outlined" />
      </div>
      <div style={{marginTop:'20px',width:'100%',textAlign:'center'}}>
        <TextField value={password} onChange={e=>setPassword(e.target.value)} style={{width:'80%'}} id="outlined-basic" label="Password" type='password' required variant="outlined" />
      </div>
      {!login?<>
      <div style={{marginTop:'20px',width:'100%',textAlign:'center'}}>
        <TextField value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} style={{width:'80%'}} id="outlined-basic" label="Confirm Password" required type='password' variant="outlined" />
      </div>
      <div style={{marginTop:'20px',width:'100%',textAlign:'center'}}>
        <TextField value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'80%'}} id="outlined-basic" label="Enter Mobile Number" type='text' variant="outlined" />
      </div>
      <div style={{marginBlock:'20px',textAlign:'center'}}>
        <Button disabled={isDisabled()} fullWidth variant='contained' title='Login' onClick={signUp} >Sign-up</Button>
        <div>
          <span>Go to <span className="underline cursor-pointer text-blue-700" onClick={()=>setLogin(true)}>sign in </span></span>
        </div>
      </div>
      </>:
      <div style={{marginBlock:'20px',textAlign:'center'}}>
        <Button disabled={isDisabled()} fullWidth variant='contained' title='Login' onClick={loginNow} >Login</Button>
        <div>
          <span>Not a member <span className="underline cursor-pointer text-blue-700" onClick={()=>setLogin(false)}>sign up </span></span>
        </div>
      </div>
}
    </div>
    <div style={{marginLeft:'-16px'}}>
    </div>
  </Box>
  </div>
}
export default Auth;