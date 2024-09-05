import React from 'react';
import { useState,useEffect } from 'react';
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { Container, Box, Avatar, TextField, Button, Link, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../../components/Copyright';
import axios from 'axios';


const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const navigate = useNavigate();

    /**Function for Bring the Question ID,Question and UserId based on the email address from the API 
     * If the user enter the correct email used in sign up, Move to the next page
    */
    async function checkEmail(inputEmail){
        try{
            axios.post('https://qxy7nvgd2k.execute-api.ca-central-1.amazonaws.com/FridgeMaster/user/forgot_password_email',{
                email: inputEmail
            })
            .then (function(response){
                const userData = response.data;
                navigate('../forgotPasswordQuestions',{
                  state:{
                    userID: userData.UserID,
                    questionID: userData.QuestionID,
                    question: userData.Question
                  }
                });
            })
            .catch(function(error){
                console.log(error)
                const errorMsg = "The email you entered does not exist"
                alert(errorMsg);
                setError("email",{type: "manual",message: errorMsg});
            });
            


        }catch(error){
            console.log(error);
            console.log("Failed to get questions using ")
        }
    }

    const onSubmit = (data) =>{
      checkEmail(data.email);
    }
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container id="container" component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Typography sx={{ mt: 3, mb: 1 }}>
                Please enter the email address you used to sign up
            </Typography>
            <TextField 
              
              label="Email Address" 
              name="email" 
              autoComplete='email' 
              required fullWidth 
              margin="normal" 
              {...register('email',{
                validate: {
                  required: value => value.trim().length > 0 || 'Email Address is required and cannot be empty.',
                },
                pattern:{
                  value:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                  message: 'Email is invalid',
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}

             />

            <Button type="submit" variant='contained' fullWidth sx={{ mt: 3, mb: 2 }}>Continue</Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <Link href="./login">Back to Sign in</Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
  
        </form>
  
      );
    };
    
    export default ForgotPassword;