import './App.css';

import './components/Global.css'
import Header from './components/Header';
import Home from './screens/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useNavigate
} from "react-router-dom";
import ProductDetail from './screens/ProductDetail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { notify } from './redux/actions';
import { getUserData } from './utils/storage';
import ProductListing from './screens/ProductListing';
import { RootState } from './utils/types';
import Auth from './screens/Auth';
import CheckoutPage from './screens/CheckoutPage';
import OrderSummary from './screens/OrderSummaryPage';
import OrderConfirm from './screens/OrderConfirm';
import CircularLoader from './components/Loader';

const router=createBrowserRouter([
  {path:'/',element:<Navigate to={'/Home'} />},
  {path:'/auth',element:<Auth />},
  {path:'/Home',element:<RootApp Component={Home} IsHeadEnable={true} />},
  {path:'/ProductDetail',element:<RootApp Component={ProductDetail} IsHeadEnable={true} />},
  {path:'/search',element:<RootApp Component={ProductListing} IsHeadEnable={true} />},
  {path:'/Cart',element:<RootApp Component={CheckoutPage} IsHeadEnable={true} />},
  {path:'/OrderSummary',element:<RootApp Component={OrderSummary} IsHeadEnable={true} />},
  {path:'/OrderConfirm',element:<RootApp Component={OrderConfirm} IsHeadEnable={true} />},
])
function App(){
  return <RouterProvider router={router} />
}


function RootApp({Component,IsHeadEnable}:any) {
  const loading=useSelector((state:RootState)=>state.loadingReducer.loading)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useSelector((state:RootState)=>{
    if(state.toastReducer.message!=''){
      toast(state.toastReducer.message,{type:state.toastReducer.type})
      dispatch(notify({type:'',message:''}))
    }
    
  })
  useEffect(()=>{
    if(!getUserData()){
      navigate('../auth')
    }
  },[])
  return (
    <div className="App" style={{position:'relative'}}>
      <CircularLoader fullScreen={true}  loading={loading} />
      { IsHeadEnable && <Header /> }
      <Component />
      <ToastContainer />
    </div>
  );
}

export default App;
