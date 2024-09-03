import * as React from 'react';
import { useState,useEffect } from 'react';
import { useForm, Controller } from "react-hook-form"
import { useLocation } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField,FormHelperText, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container,Select,FormControl,MenuItem,InputLabel,OutlinedInput, Menu } from '@mui/material';

import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../components/Copyright';
import axios from 'axios';


/**
 * 해야할거. 
 * signup 페이지에서 보낸 데이터 받기
 * User가 고른 question 의 key값 저장, 
 * User가 Input한 Answer저장. 
 * 그 signup페이지에서 보낸 데이터와 User가 고른 Question, Answer 모두 합해서 JSON형태의 Object로 통합해서 API로 보내주기 
 */


const defaultTheme = createTheme();

/*Selection */

const SignUpQustions = () =>{
    const { register,handleSubmit, formState: { errors }, control} = useForm();
    const location = useLocation();//For bring the data from signup page.
    const {email,userName,password} = location.state || {}; /**Store the data from signup page */



    /**Bring the Question from the API */
    const[question,setQuestion] = useState([]);
    /**When the rendering is working, call the getQuestion function, */
    useEffect(()=>{
        try{
            getQuestion();

        }catch(error){
            console.log(error);
        }
    },[]);
    /**getQustion function bring the data from API and store the value of the API to state */
    async function getQuestion(){
        try{
            
            const response = await axios.get('https://qxy7nvgd2k.execute-api.ca-central-1.amazonaws.com/FridgeMaster/getAllQuestions');
            const parsedData = JSON.parse(response.data); // Parse a JSON string into an array.
            setQuestion(parsedData);

        }catch(error){
            /**If the request is failed, check the error in the console */
            console.log(error);
            console.log("Failed to getQuestion function");
        }
    }









    /** For Submit Button - Edit Plase */
    /**Check the console, if the user input valid input  */
    const onSubmit = (data) =>{
        if(data.question1Id === data.question2Id){
            alert("Please choose different questions for Question 1 and Question 2.");
            return;
        }

        console.log("email:", email);
        console.log("user-name:", userName);
        console.log("password:", password);
        console.log("question1Id",data.question1Id);
        console.log("question1Answer",data.question1Answer);
        console.log("question2Id",data.question2Id);
        console.log("question2Answer",data.question2Answer);

        const userData = {
            email: email,
            password: password,
            username: userName,
            userQuestion: [
                { questionId: data.question1Id, answer: data.question1Answer },
                { questionId: data.question2Id, answer: data.question2Answer }
            ]
        }

        /**Post the data to API server */
        axios.post("https://qxy7nvgd2k.execute-api.ca-central-1.amazonaws.com/FridgeMaster/user/signup",userData)
        .then((response) => {
            console.log(response.data);
            alert("Sign up Success");
        })
        .catch(error =>{
            alert("Error:" + error);
        })
    
        

    }      
    return(

        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}> 
                <Grid item xs={12}>


                <p>Question 1</p>
                <FormControl fullWidth required error={!!errors.question1Id}>
                <InputLabel id="demo-simple-select-required-label">Question 1</InputLabel>
                    <Controller
                        name="question1Id"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Please select a question for Question 1' }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="demo-simple-select-required-label"
                                label="Question 1 *"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {question.map((q) => (
                                    <MenuItem key={q.QuestionID} value={q.QuestionID}>
                                        {q.Question}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                        />
                    <Typography variant="caption" color="error">
                        {errors.question1Id && <span>{errors.question1Id.message}</span>}
                    </Typography>
                </FormControl>
                    <p><TextField 
                        required 
                        fullWidth 
                        id="question1Answer"
                        name="question1Answer" 
                        label="Answer" 
                        variant="outlined" 
                        {...register('question1Answer',{
                            validate: {
                              required: value => value.trim().length > 0 || 'Answer is required and cannot be empty.',
                            }
                          })}
                          error={!!errors.question1Answer}
                          helperText={errors.question1Answer ? errors.question1Answer?.message : ''}
                          /></p>
                </Grid>
          
                
                <Grid item xs={12}>
                    <p>Question 2</p>
                    <FormControl fullWidth required error={!!errors.question2Id}>
                    <InputLabel id="demo-simple-select-required-label">Question 2</InputLabel>
                        <Controller
                            name="question2Id"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Please select a question for Question 2' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    labelId="demo-simple-select-required-label"
                                    label="Question 2 *"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {question.map((q) => (
                                        <MenuItem key={q.QuestionID} value={q.QuestionID}>
                                            {q.Question}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                            />
                    <Typography variant="caption" color="error">
                        {errors.question2Id && <span>{errors.question2Id.message}</span>}
                    </Typography>
                </FormControl>
                    <p><TextField 
                        required 
                        fullWidth 
                        id="question2Answer"
                        name="question2Answer" 
                        label="Answer" 
                        variant="outlined" 
                        {...register('question2Answer',{
                            validate: {
                              required: value => value.trim().length > 0 || 'Answer is required and cannot be empty.',
                            }
                          })}
                          error={!!errors.question2Answer}
                          helperText={errors.question2Answer ? errors.question2Answer?.message : ''}
                          /></p>

                </Grid>
                
                <Grid item xs={12}>
                    <FormControlLabel
                    control={
                    <Checkbox 
                        name= "acceptTerms"
                        color="primary"
                        {...register("acceptTerms",{required:"Agreement is required"})}
                        />}
                    label="I agree to all terms"
                    />
                    <div>
                    <Typography  variant="caption" color="error">
                        {errors.acceptTerms && <span>{errors.acceptTerms.message}</span>}
                    </Typography>
                    </div>

                    <p>I have read and agreed to the Fridge Master's <a href="../termsConditions">Terms and Conditions</a> </p>
                    
                </Grid>
            </Grid>

            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="../login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
                
            </Box>
            </Box>
        <Copyright sx={{ mt: 5 }} />
        </Container>
        </ThemeProvider>

    );


}

export default SignUpQustions;