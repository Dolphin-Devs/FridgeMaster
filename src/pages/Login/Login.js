import React from 'react';
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { Container, Box, Avatar, TextField, Checkbox, Button, Link, Grid, FormControlLabel, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../../components/Copyright';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  async function login(userEmail, userPassword){
    try{
      axios.post('https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/user/signin',{
        email: userEmail,
        password: userPassword
      })
      .then(function(response){
        console.log(response);
        alert("Login Success");
        navigate('../dashboard',{
          state:{
            userId: response.data.userId,
            username: response.data.username,
            email: userEmail,
          }
        });
      })
      .catch(function(error){
        console.error("Error Response: ", error);
        alert("Error: "+ error.response.data);
      })

    }catch(error){
      console.log(error);
      console.log("Faild of login function")
    }

  }

  const onSubmit = (data) =>{

    login(data.email, data.password);


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
            Sign In
          </Typography>
          <TextField 
          sx={{ mt: 3, mb: 2 }}
            label="Email Address" 
            name="email" 
            autoComplete='email' 
            required fullWidth 
            margin="normal" 
            {...register('email',{
              pattern:{
                value:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                message: 'Email is invalid',
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email?.message : ''}
           />
          <TextField 
            label="Password" 
            type="password" 
            name="password" 
            autoComplete='current-password' 
            required fullWidth
            {...register('password',{
              minLength: {
                value: 8,
                message: 'Password is at least 8 characters.'
              },
              maxLength: {
                value: 12,
                message: 'Password is up to 12 characters.'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])/,
                message: 'Password must have at least 1 lowercase character, at least 1 uppercase character, and at least 1 number or special character.'
              }
            })}  
            error={!!errors.password}
            helperText={errors.password ? errors.password?.message : ''}
            />
            <Grid container sx={{ mt: 1, mb: 1 }}>
              {/*Please Add the Remember me feature*/ }
            {/**<FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />*/}
            </Grid>

          <Button type="submit" variant='contained' fullWidth sx={{ mt: 1, mb: 2 }}>Sign In</Button>
          <Grid container>
            <Grid item xs>
              <Link href="./forgotPassword">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link href="./signup">Sign up</Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>

      </form>

    );
  };
  
  export default Login;