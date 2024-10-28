import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function GeneralSetting({ userId, signOutFunction }) {
  const [open, setOpen] = React.useState(false);

  // Functions to handle modal open and close
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Function for Sign Out action
  const handleSignOut = () => {
    handleClickOpen(); // Open dialog when Sign Out is clicked
  };

// Updated Button click handler with proper function call
const handleSignOutConfirm = () => {
    signOutFunction(true); 
    handleClose(); // Close dialog after sign out
    };

  return (
    <Card sx={{  flexGrow: 1, borderRadius: 5, mb: 2, flexDirection: "column", justifyContent: "center" }}>
      <CardHeader 
        avatar={
          <Avatar sx={{  bgcolor: '#FFCC00' }} aria-label="recipe">
            <SettingsIcon />
          </Avatar>
        }
        titleTypographyProps={{variant:'subtitle2' }}
        title="Settings"
      />
      <Divider />

      <CardContent>
        <CardActionArea>
          <Typography  variant='body2' onClick={handleSignOut} component="div" >
            Sign Out
          </Typography>
        </CardActionArea>
      </CardContent>

      {/* Dialog Component for confirmation */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Sign Out"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleSignOutConfirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}