import * as React from 'react';
import { useState,useEffect } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

export default function CloseButton({CloseName, onClick}) {
  const [leftPosition, setLeftPosition] = useState('110%');

  useEffect(() =>{
    if (CloseName === 'In Fridge') {
        setLeftPosition('95%');
      } else if (CloseName === 'other'){
        setLeftPosition('85%');
      } else {
        setLeftPosition('110%'); 
      }
    }, [CloseName]);

    return (
        //left:"110%"
        <IconButton onClick={onClick}  type="button" sx={{ p: '10px', left:leftPosition }} aria-label="close">
            <ClearIcon />
        </IconButton>
    
    );
  }