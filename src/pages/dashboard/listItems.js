import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import KitchenIcon from '@mui/icons-material/Kitchen';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalDiningIcon from '@mui/icons-material/LocalDining';


  

export const mainListItems =({getSelectListItemFunction})=>(


  <React.Fragment>
    <ListItemButton onClick={()=>getSelectListItemFunction(1)}>
      <ListItemIcon>
        <PlaylistAddCheckIcon style={{ color: "white" }}/>
      </ListItemIcon >
      <ListItemText primary="Lists" />
    </ListItemButton>
     <ListItemButton onClick={()=>getSelectListItemFunction(2)}>
      <ListItemIcon>
        <KitchenIcon style={{ color: "white" }} />
      </ListItemIcon>
      <ListItemText primary="Fridge" />
    </ListItemButton> 
    <ListItemButton onClick={()=>getSelectListItemFunction(4)}>
      <ListItemIcon>
        <LocalDiningIcon style={{ color: "white" }} />
      </ListItemIcon>
      <ListItemText primary="Recipe" />
    </ListItemButton> 
    <ListItemButton onClick={()=>getSelectListItemFunction(3)}>
      <ListItemIcon>
        <SettingsIcon style={{ color: "white" }} />
      </ListItemIcon>
      <ListItemText primary="Setting" />
    </ListItemButton>
    
  </React.Fragment>
);


