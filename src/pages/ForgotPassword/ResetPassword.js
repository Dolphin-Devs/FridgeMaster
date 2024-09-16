import React from 'react';
import { useState,useEffect } from 'react';
import {useForm} from "react-hook-form"
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField,Link, Grid, Box, Typography, Container,InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../../components/Copyright';
import axios from 'axios';
/**Icon */
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors }, setError,watch } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const {userID, questionID, question} = location.state || {};/*Store the data from forgotpassword page*/ 
    const password = watch('password');/**For confirm password */


    /**Checking the password in visible, Edit the password type*/
    /**useState for changing password type*/
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickConfirmShowPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

      /**Password Validation Form  */
        /*useState For password validation form */
        const [pwdValidateNum, setpwdValidateNum] = useState(false);
        const [pwdValidateLowerCase, setpwdValidateLowerCase] = useState(false);
        const [pwdValidateUpperCase, setpwdValidateUpperCase] = useState(false);
        const [pwdValidateSpecial, setpwdValidateSpecial] = useState(false);

        /*function for Handling the password validation form */
        const handleChange = (value) => {
            const number = new RegExp('^.{8,12}$');
            const lower = new RegExp('(?=.*[a-z])');
            const upper = new RegExp('(?=.*[A-Z])');
            const special = new RegExp('(?=.*[0-9!@#$%^&*])');

            setpwdValidateNum(number.test(value));
            setpwdValidateLowerCase(lower.test(value));
            setpwdValidateUpperCase(upper.test(value));
            setpwdValidateSpecial(special.test(value));
        };
          /**useEffect for password validation form */
        useEffect(() => {
            handleChange(password);
        }, [password]);


    async function updatePassword(userPassword){
        try{
            axios.post('https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/user/resetPassword',{
                userId: userID,
                password: userPassword
            })
            .then(function(response){
                console.log(response);
                alert("Your password has been changed successfully." );
                navigate('../Login',{
                    state:{
                        password: userPassword
                    }
                  });

            })
            .catch(function(error){
                console.error("Error response:", error.response.data);
                alert("Error: " + error.response.data); 
            })

        }catch(error){
            console.log(error);
            console.log("Faild to function updatePassword");
        }

    }



    const onSubmit = (data) =>{
        
        updatePassword(data.password);
        
      
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
              Reset Password
            </Typography>
            <Typography sx={{ mt: 2, mb: 1 }}>
                Please enter your new password for sign in
            </Typography>

                    <TextField
                    sx={{ mt: 2, mb: 1 }}
                      required
                      fullWidth
                      name="password"
                      label="New Password"
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      id="password"
                      autoComplete="new-password"
                      {...register('password',{
                        validate: {
                          required: value => value.trim().length > 0 || 'Password is required and cannot be empty.',
                        },
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
                 
                  
                    <TextField
                     sx={{ mt: 2, mb: 1 }}
                      required
                      fullWidth
                      name="confirm-password"
                      label="Confirm New Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickConfirmShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      id="confirm-password"
                      autoComplete="new-password"
                      {...register("confirmPassword", { 
                        validate: {
                          required: value => value.trim().length > 0 || 'Confirm Password is required and cannot be empty.',
                        },
                        validate: value => value === password || "Passwords do not match" 
                        })} 
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword ? errors.confirmPassword?.message : ''}
                    />
                <Grid container  sx={{ mt: 2, mb: 1 }}>
                    <span className = "pwd-validate" style={{color:"#666666"}}>
                      <li className={pwdValidateNum?'validated':'not-validated'}>
                        At least 8 to 12 Characters</li>
                      <li className={pwdValidateLowerCase?'validated':'not-validated'}>At least 1 lowercase character</li>
                      <li className={pwdValidateUpperCase?'validated':'not-validated'}>At least 1 uppercase character</li>
                      <li className={pwdValidateSpecial?'validated':'not-validated'}>At least 1 number or special character</li>
                    </span>
                </Grid>
                 

            <Button type="submit" variant='contained' fullWidth sx={{ mt: 3, mb: 2 }}>Reset Password</Button>
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
    
    export default ResetPassword;