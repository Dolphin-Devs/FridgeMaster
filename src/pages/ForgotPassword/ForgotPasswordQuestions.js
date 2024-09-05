import React from 'react';
import { useState,useEffect } from 'react';
import {useForm} from "react-hook-form"
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Box, Avatar, TextField, Button, Link, Grid, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../../components/Copyright';
import axios from 'axios';

const ForgotPasswordQuestions = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const {userID, questionID, question} = location.state || {};/*Store the data from forgotpassword page*/ 
    



    async function checkAnswer(userAnswer){
        try{
            axios.post('https://qxy7nvgd2k.execute-api.ca-central-1.amazonaws.com/FridgeMaster/user/forgot_password_question',{
                userId: userID,
                questionId: questionID,
                answer: userAnswer
            })
            .then(function(response){
              console.log(response);
              /** userID, questionID, question, answer 데이터를 다음 페이지로 Navigation */
              navigate('../resetPassword',{
                state:{
                  userID: userID,
                  questionID: questionID,
                  question: question,
                  answer: userAnswer
                }
              });
            })
            .catch(function(error){
              console.error("Error response:", error.response.data);
              alert("Error: " + error.response.data); 
              setError("answer",{type:"manual",message:error.response.data})
            })
        }catch(error){
            console.log(error);
            console.log("Failed to function of checkAnswer")
        }
    }

    const onSubmit = (data) =>{
      checkAnswer(data.answer);
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
               Q: {question}
            </Typography>
            <TextField 
              
              label="Answer" 
              name="anwer" 
              
              required fullWidth 
              margin="normal" 
              {...register('answer',{
                validate: {
                  required: value => value.trim().length > 0 || 'Answer required and cannot be empty.',
                }
              })}
              error={!!errors.answer}
              helperText={errors.answer ? errors.answer.message : ""}

             />

            <Button type="submit" variant='contained' fullWidth sx={{ mt: 3, mb: 2 }}>Submit</Button>
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
    
    export default ForgotPasswordQuestions;