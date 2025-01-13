import * as React from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import InfoIcon from '@mui/icons-material/Info';
import CloseButton from '../CloseButton';

export default function AboutUs({handleTermsandConditionsFunction, setIsVisible,handleClosePanel}) {

  const navigate = useNavigate();

  const handleTermsAndCondition = () =>{
    navigate('/termsAndConditions');
    handleTermsandConditionsFunction(true);
  }
  const handleClose = () => {
    setIsVisible(false); 
    if (handleClosePanel) {
      handleClosePanel(); // 부모 컴포넌트에서 전달받은 메서드 호출
    }
  };

  return (
    <Card
        sx={{
          ml: 1,
          mr: 1,
          overflowY: 'auto', //If the content is too much, Using Scroll bar
        }}
      >
      <CloseButton onClick={handleClose} CloseName="other"/>
      <CardHeader 
        avatar={
          <Avatar sx={{ border: 'solid 2px orange', width:80,height:80,  backgroundColor: 'transparent',fontSize:'40px',mr:2}}  >
            🐬
          </Avatar>
        }
        titleTypographyProps={{variant:'h6' }}
        title="Dolphin Devs"
        subheader={
            <>
              <span style={{ display: 'block' }}>Version 1.0</span>
              <span style={{ display: 'block', fontSize:'8px' }}>Icons by Icon8</span>
            </>
          }
      />

      <CardContent>
        <Typography variant="body2" >
            Fridge Master is designed to revolutionize how you manage your kitchen.<br /> 
            With Fridge Master, you can easily track the expiration dates of items in your fridge, freezer, and pantry. <br />
            Our system allows you to categorize items, set expiration alerts, and ensure you never waste food again. 
        </Typography>

      </CardContent>
      <CardContent>
        <Typography variant="body2" >
            <Typography variant='subtitle2'>Our Values</Typography>
        <li>Innovation: We are committed to developing creative solutions that make life easier and enjoyable.</li>
        <li>Efficiency: Our goal is to help you save time and reduce waste with intelligent, user-friendly technology.</li>
        <li>Community: We believe in the power of collaboration and are dedicated to creating tools that benefit everyone.</li>
        </Typography>
      </CardContent>
      <CardContent>

      </CardContent>

    </Card>
  );
}