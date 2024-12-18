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
import Collapse  from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import { Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
/**Components */
import ActionButton from '../ActionButton';
import LoadingProgress from '../../components/LoadingProgress';

export default function MediaControlCard({UserItemID,ItemID, UserFridgeID,FridgeID ,FridgeName,FridgeImageID, ItemCount ,userId, getSelectUserItemIDFunction, getSelectUserFridgeIDFunction, getSelectFridgeIDFunction, handleAfterAddDeleteFridgeFunction, handleEditFridgeFunction}) {
  const [responseFridgeImage,setResponseFridgeImage] = useState();   
  const [responseFridgeName,setResponseFridgeName] = useState();
  const [arrowClick, setArrowClick] = useState(false);
  const [selectFridgeID,setSelectFridgeID] = useState();//*Final state for saving fridge ID
  const [loading, setLoading] = useState(true);

/**Function for Connecting the API can bring the CategoryImage used FridgeImageID */
async function getFridgeImage(FridgeImageID){
  try{
      const response = await axios.get(
        'https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/fridge/getFridgeImage',
      {
        params: { FridgeImageID }  // Using key "params" and sending parameter to API.  
      });
      setResponseFridgeImage(response.data.FridgeImage);

  }catch(error){
      console.log("Failed to get the data from getFridge API: " + error);

  }
}

/**Function for API about delete item */
async function deleteFridge(inputID){
  try {
    await axios.delete('https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/fridge/deleteStorage', {
      params: {
        FridgeID: inputID  // Query parameters should be passed in the 'params' field
      }
    });
    handleAfterAddDeleteFridgeFunction(true); 
  } catch (error) {
    console.log("Failed to deleteFridge api ", error);
    throw error; 
  }
}

/**Function for Connecting the API can bring the CategoryImage used FridgeImageID */
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
function sendSelectedUserFridge(inputItemID, inputUserFridgeID, inputFridgeID) {
  getSelectUserItemIDFunction(inputItemID);
  getSelectUserFridgeIDFunction(inputUserFridgeID);
  getSelectFridgeIDFunction(inputFridgeID);
}

const handleArrowClick = (event) => {
  event.stopPropagation(); // Prevent Card click event
  setArrowClick(!arrowClick);
};

const handleDeleteButton = () => {
  if (window.confirm("Do you want to delete this fridge?")) {  
    console.error("check FridgeID:", FridgeID);
    deleteFridge(FridgeID)
      .then(() => {
        alert("Success to delete Fridge");  
      })
      .catch((error) => {
        console.error("error delete Fridge:", error);
      });
  }
};


const handleEditButton = () => {
  getSelectUserFridgeIDFunction(UserFridgeID); 
  getSelectFridgeIDFunction(FridgeID);
  handleEditFridgeFunction();
};

const handleCardClick = () => {
  sendSelectedUserFridge(UserItemID, UserFridgeID, FridgeID);
};
/**Function for Connecting the API can bring the Storage name used UserFridgeID  */

  /** Calculate the D-day when the component starts rendering */
  useEffect(()=>{
    getFridgeImage(FridgeImageID).then(() => {
      setLoading(false); 
    });
    getFridgeName(UserFridgeID,userId);
    

  },[FridgeImageID, UserFridgeID, userId]);


  return (
    <Card sx={{ flexGrow:1, borderRadius: 5, mb:2 }}>
      {/* CardActionArea for clickable card */}
      <CardActionArea onClick={handleCardClick}>
        <Grid container spacing={1} sx={{ height: 131 }}>
          {/* Fridge Image */}
          <Grid item xs={2} sx={{ alignItems: 'top', mt: 4, ml: 6 }}>
            {loading ? ( 
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 40, width: 40 }}>
                <LoadingProgress />
                
              </Box>
            ) : (
              <CardMedia
                component="img"
                sx={{ width: 40, height: 40, objectFit: 'contain' }}
                image={responseFridgeImage}
                alt="Fridge Image"
                onLoad={() => setLoading(false)}
              />
            )}
          </Grid>

          {/* Fridge Name and Item Count */}
          <Grid item xs={5}>
            <CardContent sx={{ flex: '1 0 auto',   mt:0, ml: -5 }}>
              <Typography variant="subtitle1">{responseFridgeName}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Contains {ItemCount} items
              </Typography>
            </CardContent>
          </Grid>

          {/* Arrow Button */}
          <Grid item xs={3} sx={{ display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: '100%',
          paddingBottom: '15px'  }}>
            <IconButton
              onClick={handleArrowClick}
              size="small"
              sx={{
                padding: 0, margin: 0, width: 45, height: 45, transform: arrowClick ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.3s ease-in-out'
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActionArea>

      {/* Collapse section for Edit/Delete */}
      <Collapse in={arrowClick} timeout="auto" unmountOnExit>
        <Divider sx={{width: '95%', mx: 'auto', mb: -4, mt: -1 }} />
        <CardContent>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 25,   mt: -1, 
                    mb: -2}}>
            <ActionButton onClick ={handleEditButton}  className="actionBtn" ActionName="Edit" />
            <ActionButton onClick={handleDeleteButton} className="actionBtn" ActionName="Delete" />
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}