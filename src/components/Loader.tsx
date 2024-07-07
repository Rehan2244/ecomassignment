import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Loader.css'
import React from 'react';

interface Loader{
    fullScreen:boolean,
    loading:boolean
}
export default function CircularLoader({fullScreen,loading}:Loader) {
    if(fullScreen && loading){
        document.body.style.overflow = "hidden"
    }
    if(!loading){
        document.body.style.overflow = "scroll"
    }
  return fullScreen?
    <div className='fullScreenContainer'>
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    </div>:
    <Box sx={{ display: 'flex' }}>
            <CircularProgress />
    </Box>
}