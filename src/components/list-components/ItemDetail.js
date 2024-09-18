import * as React from 'react';
import { useState,useEffect } from 'react';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

/**List  */

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

/**Date Range Picker */
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

/**Components */
 import ActionButton from '../ActionButton';
 import CategoryDialog from './CategoryDialog';
 import StorageDialog from './StorageDialog';




export default function ItemDetail(userId) {
  const [expanded, setExpanded] = React.useState(false);
  const userRealId = Object.values(userId);
  const [category,setCategory] = useState([]);//State for category data
  const [itemName,setItemName]= useState(); //State for saving the item name 

  const today = new Date();/**Variable for today date */
 /**Methods for handling date range picker  */
 const [expireDate, setExpireDate] = React.useState(dayjs(today));



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  /**Handling the list */
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

/**Handling the input data about item name and save the value to itemName state */
const handleInputChange = (e) =>{
  setItemName(e.target.value);
  console.log(itemName)
}
//If the user click the x button on the input base, call the deletInput and set the item name to null
const deleteInput = () =>{
  setItemName("");
}

/**Function for Connecting the API can bring the All fridgeName based on the user id */
async function getAllFridge(input){
  try{
      const response = await axios.get(
        'https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/fridge/getAllFridges',
      {
        params: { id: input }  // Using key "params" and sending parameter to API.  
      });
      console.log(response.data);


  }catch(error){
      console.log("Failed to get the data from getFridgeImage API: " + error);

  }
}


/**Connecting the API that bring the All FridgeName and All Category Name  */

  useEffect(()=>{
    console.log(userRealId)
   // getAllFridge(userRealId[0]);
  },[]);

  return (
    <Box sx={{ width: '60%', ml:20,mt:1 }}>
        <Grid container direction="row" spacing={4} >
            <Grid item lg={12}>
                <Paper
                    sx={{ 
                      
                      display: 'flex', 
                      alignItems: 'center',
                      
                      width: '100%', 
                      border: '1px solid #ccc', 
                      borderRadius: '4px', 
                      padding: '10px',
                      pl:2
                     }}
                    >

                    <InputBase
                        sx={{ ml: 1, flex: 1,alignItems: 'center'  }}
                        placeholder="Item Name"
                        value={itemName}
                        onChange={handleInputChange}
                                      
                    />
                    <IconButton onClick={deleteInput}  type="button" sx={{ p: '10px' }} aria-label="search">
                        <ClearIcon />
                    </IconButton>
                </Paper>
            </Grid>

            <Grid item  xs ={12} lg={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography  lg={6} md={6}>
                        Expiration Date
                    </Typography>
                    {/**Date Range Picker */}
                    <Box sx={{ flexBasis: '50%' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} lg={6} md={6}>
                      <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                          label=""
                          value={expireDate}
                          onChange={(expireDate) => setExpireDate(expireDate)}
                          sx={{borderRadius: '20px', width:'100%'}}
                        />
                      </DemoContainer>
                    </LocalizationProvider>   
                    </Box>             
              </Box>
            </Grid>

            <Grid item  lg={12} md={12} sx={{justifyItems: 'center'}}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                  <Typography lg={6} md={6} >
                    Category
                  </Typography>
                  <Box sx={{ flexBasis: '50%' }}>
                    <CategoryDialog lg={6} md={6}  sx={{ width: '100%' }}/>
                  </Box>
              </Box>
            </Grid>
            <Grid item  lg={12} md={12} sx={{justifyItems: 'center'}}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                  <Typography lg={6} md={6} >
                    Storage
                  </Typography>
                  <Box sx={{ flexBasis: '50%' }}>
                   <CategoryDialog lg={6} md={6}  sx={{ width: '100%' }}/>
                  </Box>
              </Box>
            </Grid>

            <Grid item  lg={12} md={12} sx={{justifyItems: 'center'}}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                  <Typography lg={6} md={6} >
                    Quantity
                  </Typography>
                  <Box sx={{ flexBasis: '50%' }}>
                    <CategoryDialog lg={6} md={6}  sx={{ width: '100%' }}/>
                  </Box>
              </Box>
            </Grid>
            <Grid item  lg={12} md={12} sx={{justifyItems: 'center'}}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                  <ActionButton  lg={6} md={6} className='actionBtn' ActionName = "Delete Item"/>

                  <Box sx={{ flexBasis: '50%' }}>
                    <ActionButton lg={6} md={6} className='actionBtn' ActionName = "Save Item"/>
                  </Box>
              </Box>
            </Grid>


      </Grid>
    </Box>
  );
}