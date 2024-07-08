import { Modal, Box, TextField, Button } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { serverUrl } from "../commonVar"
import { loginPopup, notify } from "../redux/actions"
import { saveUserData } from "../utils/storage"
import { RootState } from "../utils/types"
import CircularLoader from "./Loader"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

const LoginDialog=({isOpen}:{isOpen:boolean})=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading]=useState(false)
    const open = useSelector((state:RootState)=>state.loginReducer.popupenabled)
    const dispatch=useDispatch()
    const handleClose =()=>{
      dispatch(loginPopup({type:'login',popupenabled:false}))
    }
    const loginNow=()=>{
      axios.post(serverUrl+'/api/profile/login',{email,password})
      .then(res=>{
        if(res.data.user==undefined){
          dispatch(notify({type:'error',message:res.data.message}))
        } else{
          saveUserData(res.data.user)
          handleClose()
        }
        setLoading(false)
      })
      .catch(err=>{
        dispatch(notify({type:'error',message:err.message}))
        setLoading(false)
      })
    }
    return <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div>
    <Box sx={style}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}} >
      <div style={{marginBottom:'20px'}}>Login</div>
        <div style={{width:'100%',textAlign:'center'}}>
          <TextField value={email} onChange={e=>setEmail(e.target.value)} style={{width:'80%'}} id="outlined-basic" label="Email" variant="outlined" />
        </div>
        <div style={{marginTop:'20px',width:'100%',textAlign:'center'}}>
          <TextField value={password} onChange={e=>setPassword(e.target.value)} style={{width:'80%'}} id="outlined-basic" label="Password" type='password' variant="outlined" />
        </div>
        <div style={{marginBlock:'20px',textAlign:'center'}}>
          <Button title='Login' onClick={loginNow} >Login</Button>
          <div>
            <span>Not a member sign up</span>
          </div>
        </div>
      </div>
      <div style={{marginLeft:'-16px'}}>
      </div>
    </Box>
    <CircularLoader fullScreen={true}  loading={loading} />
    </div>
  </Modal>
  }

export default LoginDialog;