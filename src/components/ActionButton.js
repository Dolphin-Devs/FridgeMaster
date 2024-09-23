import * as React from 'react';
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { yellow } from '@mui/material/colors';
import { Typography } from '@mui/material';

export default function ActionButton({ActionName,onClick}) {
  const[btnBg,setBtnBg] = useState("orange");
  const[startIcon,setStartIcon] = useState(<AddCircleIcon sx={{color:yellow[500], fontSize:'5px'}} />);

/*Check the ActionName and set the background color of button  */
  useEffect(() => {
    if(ActionName === "Delete Item"){
      setBtnBg("#B8B8B8");
      setStartIcon(<DeleteIcon sx={{color: 'white', fontSize:'5px'}} />)
    }else{
      setBtnBg("orange");
      setStartIcon(<AddCircleIcon sx={{color:yellow[500], fontSize:'5px'}} />)
    }
  }, [ActionName]); 


  return (
    <Stack direction="row" spacing={1} sx={{ mt:4}} justifyContent='flex-end'>
      <Button 
        variant="outlined" 
        size="large" 
        startIcon={startIcon} 
        onClick={onClick}
        sx={{ minWidth:"50px", color:"white", bgcolor: btnBg,border: 2, fontWeight:"regular", borderRadius: 4,fontSize: '12px' }}>
         {ActionName}
      </Button>
    </Stack>
  );
}