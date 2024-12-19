import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const StyledButton = styled(Button)(({ theme, variant }) => ({
    ...(variant === 'contained' && {
      color: theme.palette.getContrastText(orange[500]),
      backgroundColor: orange[500],
      '&:hover': {
        backgroundColor: orange[700],
      },
    }),
    ...(variant === 'outlined' && {
      color: orange[500],
      border: `2px solid ${orange[500]}`,
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: orange[50],
        border: `2px solid ${orange[700]}`,
      },
    }),
    '&:focus': {
      outline: 'none',
      boxShadow: 'none',
    },
  }));
  
  // BasicButton Component
  const BasicButton = ({
    children,
    variant = 'contained',
    fullWidth = false,
    size = 'medium', // small | medium | large
    ...props
  }) => {
    return (
      <StyledButton
        variant={variant}
        fullWidth={fullWidth}
        size={size}
        {...props}
      >
        {children}
      </StyledButton>
    );
  };
  
  export default BasicButton;