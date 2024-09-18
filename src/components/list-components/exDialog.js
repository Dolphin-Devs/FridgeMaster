import * as React from 'react';
import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';

const emails = ['username@gmail.com', 'user02@gmail.com'];


function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
//Handling data for category 
const [category,setCategory] = useState([]);//State for category data
const [categoryImageId,setCategoryImageId] = useState();//State for category image id data
const [responseCategoryImage,setResponseCategoryImage] = useState();//State for category image data
/**Function for Connecting getAllCategory API getting category name and emoji */
async function getAllCategory(){
    try{
        const response = await axios.get('https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/category/getAllCategories');
        const parseData = JSON.parse(response.data);
        setCategory(parseData);
    }catch(error){
        console.log("Failed to get the data from getAllCategory API: " + error);
  
    }
  }

  /**Function for Connecting the API can bring the CategoryImage used CategoryImageID */
async function getCategoryImage(input){
    try{
        const response = await axios.get(
          'https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/category/getCategoryImage',
        {
          params: { CategoryImageID: input }  // Using key "params" and sending parameter to API.  
        });
        setResponseCategoryImage(response.data.CategoryImage);

    }catch(error){
        console.log("Failed to get the data from getCategory API: " + error);

    }
}

/**Connecting the API that bring the All FridgeName and All Category Name  */
useEffect(()=>{
    getAllCategory();
   },[]);



  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose a category</DialogTitle>
      <List sx={{ pt: 0 }}>
        {category.map((category) => (
          <ListItem disableGutters key={category}>
            <ListItemButton onClick={() => handleListItemClick(category.CategoryName)}>

              <ListItemText primary={category.CategoryName} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemText primary="Add account" />
          </ListItemButton>
          
        </ListItem>

      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>

      <Button variant="outlined" onClick={handleClickOpen} sx={{textTransform:'none'}}>
         {selectedValue} <ArrowDropDownIcon/>
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}