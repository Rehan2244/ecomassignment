import './App.css';

import './components/Global.css'
import Header from './components/Header';
import Home from './screens/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import ProductDetail from './screens/ProductDetail';
// import CheckoutPage from './screens/CheckoutPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { notify } from './redux/actions';
import { getUserData } from './utils/storage';
import ProductListing from './screens/ProductListing';
import { RootState } from './utils/types';
import LoginDialog from './components/LoginDialog';

const router=createBrowserRouter([
  {path:'/',element:<Navigate to={'/Home'} />},
  {path:'/Home',element:<RootApp Component={Home} IsHeadEnable={true} />},
  {path:'/ProductDetail',element:<RootApp Component={ProductDetail} IsHeadEnable={true} />},
  {path:'/search',element:<RootApp Component={ProductListing} IsHeadEnable={true} />},
  // {path:'/CheckoutPage',element:<RootApp Component={CheckoutPage} IsHeadEnable={true} />},
])
function App(){
  return <RouterProvider router={router} />
}


function RootApp({Component,IsHeadEnable}:any) {
  const loading=useSelector((state:RootState)=>state.loadingReducer.loading)
  const loginPopupEnabled=useSelector((state:RootState)=>(state.loginReducer.popupenabled))
  const dispatch=useDispatch()
  useSelector((state:RootState)=>{
    if(state.toastReducer.message!=''){
      toast(state.toastReducer.message,{type:'error'})
      dispatch(notify({type:'',message:''}))
    }
    // setLoading(state.loadingReducer.loading)
  })
  useEffect(()=>{
    if(getUserData()){
      console.log('data found',getUserData())
    } else{
      console.log('data not found',getUserData())
    }
  },[])
  return (
    <div className="App" style={{position:'relative'}}>
      {/* <CircularLoader fullScreen={true}  loading={loading} /> */}
      { IsHeadEnable && <Header /> }
      <Component />
      <LoginDialog isOpen={loginPopupEnabled} />
      <ToastContainer />
    </div>
  );
}

export default App;
