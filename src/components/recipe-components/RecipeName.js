import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


export default function RecipeName({recipeKey,firstRecipe, handleRecipeClickFunction, sendIngreStepsFunction}) {
  const[recipeContents, setRecipeContents] = useState([]);
  const emoji = ['🍲','🥗','🥙','🥪','🍜',"🥘"]
  const [randomEmoji,setRandomEmoji] = React.useState(false);


  //Split out the data 
  useEffect(() => {
    const tempContents = firstRecipe.split("≈").slice(0,3);
    setRecipeContents(tempContents);
  }, [firstRecipe]);

  useEffect(() => {
    const randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];
    setRandomEmoji(randomEmoji)
  }, [firstRecipe]);


  //Handler about click the each recipe component 
  const handleRecipeClick = () =>{
    handleRecipeClickFunction(recipeKey);
    sendIngreStepsFunction(recipeContents[0],recipeContents[1],recipeContents[2],randomEmoji);
    
  }


  return (
    <Card sx={{  flexGrow: 1, borderRadius: 5, mb: 2, p:1, flexDirection: "column", justifyContent: "center" }}>
    <CardActionArea  onClick={handleRecipeClick}> 
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

      <CardHeader 
        avatar={
          <Avatar sx={{  bgcolor: '#FFCC00' }} aria-label="recipe">
            {randomEmoji}
          </Avatar>
        }
        title={recipeContents[0]}
      />
        <ArrowRightIcon sx={{mr:3,color: 'text.secondary'}}></ArrowRightIcon>
      
    </Box>  
    </CardActionArea> 
    </Card>
  );
}