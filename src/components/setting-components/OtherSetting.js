import React, { useState } from 'react';
import { Card, CardHeader, Avatar, Divider, CardContent, CardActionArea, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import emailjs from 'emailjs-com';

export default function OtherSetting({ handleAboutUsFunction }) {
  const [open, setOpen] = useState(false);
  const [userName, setName] = useState(''); 
  const [userEmail, setEmail] = useState('');
  const [userMessage, setMessage] = useState('');

  //Handler about click the about us
  const handleAboutUs = () =>{
    handleAboutUsFunction(true);
  }

  //Handler about close and open the Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //If the user click "Contact Us", Open the Dialog
  const handleSignOut = () => {
    handleClickOpen();
  };

  //Handler about email submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = 'service_95qqtxw';
    const templateId = 'template_0s93rpx';
    const publicKey = 'u_KMUOF4fVddiednl';

    //Parameter about emailjs 
    const templateParams = {
      from_name: userName,
      from_email: userEmail,
      to_name: 'Dolphin Devs',
      message: userMessage,
    };

    //Sending Email 
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        alert('Email sent successfully!', response);
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });

    //Close the Dialog, After Sending the email 
    handleClose();
  };

  return (
    <Card sx={{ flexGrow: 1, borderRadius: 5, mb: 2, flexDirection: "column", justifyContent: "center" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#FFCC00' }} aria-label="recipe">
            <MoreHorizIcon />
          </Avatar>
        }
        titleTypographyProps={{variant:'subtitle2' }}
        title="Others"
      />
      <Divider />
      <CardContent >
        <CardActionArea onClick={handleSignOut}>
          <Typography component="div" sx={{ mb: 1 }}>
            Contact Us
          </Typography>
        </CardActionArea>
        <CardActionArea>
          <Typography onClick={handleAboutUs} component="div" sx={{ mt: 1}}>
            About Us
          </Typography>
        </CardActionArea>
      </CardContent>
      {/* Dialog Component */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Contact Us"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please fill out the form below and we will get back to you.
          </DialogContentText>
          {/* Form Elements */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ display: 'block', width: '100%', margin: '10px 0', padding: '10px' }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ display: 'block', width: '100%', margin: '10px 0', padding: '10px' }}
            />
            <textarea
              cols="30"
              rows="10"
              placeholder="Your Message"
              value={userMessage}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={{ display: 'block', width: '100%', margin: '10px 0', padding: '10px' }}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" autoFocus>
                Send
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
