import *  as React from 'react';
import { useState,useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField,Link, Grid, Box, Typography, Container,InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../../components/Copyright';
import '../../assets/signup.css';/** css file*/
/**Icon */
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';






// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const { register, handleSubmit, formState: { errors },watch } = useForm();
  const navigate = useNavigate();
  const password = watch('password');/**For confirm password */


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


  /**Checking the password in visible, Edit the password type*/
  /**useState for changing password type*/
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickConfirmShowPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  /**Check the console, if the user input valid input  */
  const onSubmit = (data) =>{
    console.log("email:", data.email);
    console.log("user-name:", data.username);
    console.log("password:", data.password);

    navigate('./questions',{
      state:{
        email: data.email,
        userName: data.username,
        password: data.password
      }
    });
  };

  return (
    
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
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
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
                      helperText={errors.email ? errors.email?.message : ''}

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="User Name"
                      name="username"
                      {...register('username',{
                        validate: {
                          required: value => value.trim().length > 0 || 'User Name is required and cannot be empty.',
                        }
                      })}
                      error={!!errors.username}
                      helperText={errors.username ? errors.username?.message : ''}
                      
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirm-password"
                      label="Confirm Password"
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
                  </Grid>
                  <Grid item xs={12}>
                    <span className = "pwd-validate" style={{color:"#666666"}}>
                      <li className={pwdValidateNum?'validated':'not-validated'}>
                        At least 8 to 12 Characters</li>
                      <li className={pwdValidateLowerCase?'validated':'not-validated'}>At least 1 lowercase character</li>
                      <li className={pwdValidateUpperCase?'validated':'not-validated'}>At least 1 uppercase character</li>
                      <li className={pwdValidateSpecial?'validated':'not-validated'}>At least 1 number or special character</li>
                    </span>

                  </Grid>

                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  
                >
                  NEXT
                </Button>

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="./login" variant="body2">
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