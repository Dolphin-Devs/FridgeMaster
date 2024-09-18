import * as React from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';


export default function Empty() {
    const grayColor = "#DADADA";

  return (
    <Grid container   
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{mt:18}}
        >
      <Grid item >
        <ProductionQuantityLimitsIcon sx={{fontSize:'150px',color:grayColor}}/>
       </Grid>
       <Grid item >
         <Typography variant="h4" sx={{color:grayColor}}>The list is empty.</Typography>
       </Grid>

    </Grid>

  );
}