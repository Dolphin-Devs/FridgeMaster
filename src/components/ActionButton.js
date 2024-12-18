import * as React from 'react';
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { grey, yellow } from '@mui/material/colors';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


export default function ActionButton({ActionName,onClick}) {
  const [btnBg, setBtnBg] = useState("orange");
  const [startIcon, setStartIcon] = useState(<AddCircleIcon sx={{ color: yellow[500], fontSize: '5px' }} />);
  const [buttonLabel, setButtonLabel] = useState(ActionName);
  const [variant, setVariant] = useState("outlined"); 
  const [size, setSize] = useState("large"); 

  /* Check the ActionName and set the appropriate icon, background color, and label */
    useEffect(() => {
      switch (ActionName) {
        case "Delete":
          setBtnBg("transparent");
          setStartIcon(<DeleteIcon fontSize="small"/>);
          setButtonLabel("Delete");
          setVariant("text"); 
          setSize("small"); 
          break;
        case "Edit":
          setBtnBg("transparent");
          setStartIcon(<EditIcon fontSize="small" />);
          setButtonLabel("Edit");
          setVariant("text"); 
          setSize("small"); 
          break;
        case "Delete Item":
          setBtnBg("#B8B8B8");
          setStartIcon(<DeleteIcon sx={{ color: 'white', fontSize: '5px' }} />);
          setButtonLabel("Delete Item");
          setVariant("outlined"); 
          setSize("large");
          break;
        case "Delete Fridge":
          setBtnBg("#B8B8B8");
          setStartIcon(<DeleteIcon sx={{ color: 'white', fontSize: '5px' }} />);
          setButtonLabel("Delete Fridge");
          setVariant("outlined"); 
          setSize("large");
          break;
        
        case "Add Fridge":
          setBtnBg("orange");
          setStartIcon(<AddCircleIcon sx={{ color: yellow[500], fontSize: '5px' }} />);
          setButtonLabel("Add Fridge");
          setVariant("outlined"); 
          setSize("large");
          break;
          
        case "Add":
        default:
          setBtnBg("orange");
          setStartIcon(<AddCircleIcon sx={{ color: yellow[500], fontSize: '5px' }} />);
          setButtonLabel("Add Item");
          setVariant("outlined"); 
          setSize("large");
          break;
      }
    }, [ActionName]);
  return (
    <Stack direction="row" spacing={1} sx={{ mt: 4 }} justifyContent="flex-end">
      <Button
        variant={variant}
        size={size}
        startIcon={startIcon}
        onClick={onClick}
        disableFocusRipple
        disableRipple 
        sx={{
          minWidth: ActionName === "Edit" || ActionName === "Delete" ? "auto" : "50px",
          color: ActionName === "Edit" || ActionName === "Delete" ? grey[600] : "white",
          bgcolor: btnBg,
          border: ActionName === "Edit" || ActionName === "Delete" ? "none" : 2,
          fontWeight: "regular",
          borderRadius: 4,
          fontSize: ActionName === "Edit" || ActionName === "Delete" ? '0.875rem' : '12px',
          textTransform: 'none',
          padding: ActionName === "Edit" || ActionName === "Delete" ? '6px 10px' : undefined,
          transition: 'none', 
          "&:focus": {
            bgcolor: "transparent",
            outline: "none",
          },
          "&:focusVisible": {
            bgcolor: "transparent", 
          },
        }}
      >
        {buttonLabel}
      </Button>
    </Stack>

    
  );
}