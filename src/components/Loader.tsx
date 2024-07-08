import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Loader.css'

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
  if(!loading) return null;
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