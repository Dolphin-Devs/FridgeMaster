import * as React from 'react';
import { useState,useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Alert } from '@mui/material';

export default function MediaControlCard({UserItemID, ItemID, UserFridgeID, CategoryImageID, ItemName, Quantity,ExpiryDate,getSelectUserIDFunction,userId}) {
  const [responseCategoryImage,setResponseCategoryImage] = useState();
  const [responseFridgeName,setResponseFridgeName] = useState();
  const today = new Date();//The variable for calculatin the duration from today until the expiration date
  const expirationDate = new Date(ExpiryDate);
  const [dDay, setDDay] = useState();
  /**Function for calculate the day from today to expiryDate */
  const calculateDDay = () =>{

  // Calculate the difference between today and expirationDate 
  //Convert the units from milliseconds to days 
  const diffTime = (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  // Set the dDay to round the diffTime value  
  if(diffTime>=0){
    setDDay("D - " + Math.ceil(diffTime));
  }else{
    setDDay("D + " + -(Math.ceil(diffTime)));
  }

};

/**Function for Connecting the API can bring the CategoryImage used CategoryImageID */
async function getCategoryImage(input){
    try{
        const response = await axios.get(
          'https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/category/getCategoryImage',
        {
          params: { CategoryImageID: input }  // Using key "params" and sending parameter to API.  
        });
        setResponseCategoryImage(response.data.CategoryImage);

    }catch(error){
        console.log("Failed to get the data from getCategory API: " + error);

    }
}

/**Function for Connecting the API can bring the CategoryImage used CategoryImageID */
async function getFridgeName(inputFridgeID, inputUserID){
  try{
      const response = await axios.get(
        'https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/fridge/getFridgeName',
      {
        params: { UserFridgeID: inputFridgeID, id:inputUserID  }  // Using key "params" and sending parameter to API.  
      });
      setResponseFridgeName(response.data.FridgeName);//Save the fridgename data to respondFridgeName state

  }catch(error){
     console.log("Failed to get the data from getFridgeName API: " + error);

  }
}



/**Function for sending selected user item id to dashboard.js(Parent Component) */
function sendUserID(selectedID){
  getSelectUserIDFunction(selectedID);  
}

/**Function for Connecting the API can bring the Storage name used UserFridgeID  */

  /** Calculate the D-day when the component starts rendering */
  useEffect(()=>{
    calculateDDay();
    getCategoryImage(CategoryImageID);
    getFridgeName(UserFridgeID,userId);
    

  },[]);

  return (
    <Card onClick={()=>sendUserID(ItemID)} sx={{ flexGrow:1, borderRadius: 5, mb:2  }}>
      <CardActionArea>
      <Grid container spacing={6}>

        <Grid  item xs ={3} sx={{ alignItems: 'top', mt:1, ml:1 }}>
            <Chip label = {dDay} variant="outlined" sx={{ color: 'orange', borderColor: 'orange', border: 1.5,  fontWeight: 'bold'}} />
        </Grid>
        <Grid item xs ={5}>
            <CardContent sx={{ flex: '1 0 auto',   mt:0, ml:1 }}>
              <Typography  variant="subtitle1" sx={{}}>
                      {ItemName}
              </Typography>     
              <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary' }}
              >
                  <p>You have {Quantity} in stock</p>        
              </Typography>       
            </CardContent>
        </Grid>

        <Grid item xs ={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <CardContent sx={{ flex: '1 0 auto' ,textAlign:"center"}}>
              <Typography  variant="subtitle1" >
                      {responseCategoryImage}
              </Typography>     
              <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary' }}
                  
                  
              >
                  <p>{responseFridgeName}</p>        
              </Typography>       
            </CardContent>

        </Grid>
      </Grid>
      </CardActionArea>
    </Card>
  );
}