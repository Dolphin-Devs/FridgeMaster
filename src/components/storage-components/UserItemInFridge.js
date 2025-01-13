import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { Alert } from '@mui/material';
import CloseButton from '../CloseButton';

export default function UserItemInFridge({ 
  UserFridgeID, FridgeID, userId , selectedFridgeInfo, setIsVisible, handleClosePanel  
}) {

  const [userItemList, setUserItemList] = useState([]);

  const today = new Date();

  const handleClose = () => {
    setIsVisible(false); 
    if (handleClosePanel) {
      handleClosePanel(); // 부모 컴포넌트에서 전달받은 메서드 호출
    }
  };

  const calculateDDay = (expirationDate) => {
    const diffTime = (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    const dDayLabel = diffTime >= 0 ? `D - ${Math.ceil(diffTime)}` : `D + ${Math.abs(Math.ceil(diffTime))}`;
    const bgColor = diffTime >= 0 ? 'orange' : '#B8B8B8';
    return { dDayLabel, bgColor };
  };

  const getUserItemsInFridge = async () => {
    try {
      const response = await axios.get(
        'https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/fridge/getFridgeItems',
        { params: { fid: UserFridgeID, id: userId } }
      );
      const items = response.data;

      const updatedItems = await Promise.all(
        items.map(async (item) => {
          if (item.CategoryImageID) {
            try {
              const categoryImageResponse = await axios.get(
                'https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/category/getCategoryImage',
                { params: { CategoryImageID: item.CategoryImageID } }
              );
              item.CategoryImage = categoryImageResponse.data.CategoryImage;
            } catch (error) {
              console.error(`Failed to get the category image for CategoryImageID: ${item.CategoryImageID}`, error);
              item.CategoryImage = null; 
            }
          }
          const expirationDate = new Date(item.ExpiryDate);
          const { dDayLabel, bgColor } = calculateDDay(expirationDate);
          item.dDayLabel = dDayLabel;
          item.bgColor = bgColor;
          return item;
        })
      );

      setUserItemList(updatedItems);
    } catch (error) {
      console.error('Failed to user items in the fridge:', error);
    }
  };


  useEffect(() => {
    if (userId && UserFridgeID) {
      getUserItemsInFridge();
    }
  }, [userId, UserFridgeID]);


  return (
    <Box>
       <CloseButton onClick={handleClose} CloseName="In Fridge" />
      {userItemList.length === 0 ? (
        <Alert severity="info" color="warning">
          No items found in this fridge.
        </Alert>
      ) : (
        userItemList.map((item) => {

          return (
            <Card key={item.UserItemID} sx={{ flexGrow: 1, borderRadius: 5, mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={3} sx={{ mt: 1, ml: 1 }}>
                    <Chip label={item.dDayLabel} variant="outlined" sx={{ color: item.bgColor, border: 1.5, fontWeight: 'bold' }} />
                  </Grid>
                  <Grid item xs={5}>
                    <CardContent sx={{ mt: 0, ml: 1 }}>
                      <Typography variant="subtitle1">{item.ItemName}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        <p>{`You have ${item.Quantity} in stock`}</p>
                      </Typography>
                    </CardContent>
                  </Grid>
                  <Grid item xs ={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <CardContent sx={{ flex: '1 0 auto' ,textAlign:"center"}}>
                        <Typography  variant="subtitle1" >
                                {item.CategoryImage}
                        </Typography>     
                        <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary' }}
                            
                        >
                            <p>{item.CategoryName}</p>        
                        </Typography>       
                      </CardContent>

                  </Grid>
                </Grid>
            
            </Card>
          );
        })
      )}
    </Box>
  );
}
