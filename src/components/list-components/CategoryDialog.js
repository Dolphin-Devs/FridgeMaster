import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import axios from 'axios';



function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open,userSelectCategoryIDFunction,userSelectCategoryImageIDFunction,selectedItemInfo,categoryBefore, ...other } = props;
  const [value, setValue] = React.useState(valueProp); //Save the categoryName from the Dialog
  const radioGroupRef = React.useRef(null);
//Handling data for category 
const [category,setCategory] = useState(categoryBefore);//State for category data
const [categoryImageId,setCategoryImageId] = useState();//State for category image id data
const [responseCategoryImage,setResponseCategoryImage] = useState("");//State for category image data
const [selectedCategoryID, setSelectedCategoryID] = useState("");// Track the selected CategoryID
const [selectedCategoryImageID, setSelectedCategoryImageID] = useState("");// Track the selected CategoryImageID


// UseEffect for updating selected category based on selectedItemInfo
useEffect(() => {

  if (selectedItemInfo) {
    const selectedCategory = category.find((c) => c.CategoryID === selectedItemInfo.CategoryID);
    if (selectedCategory) {
      setValue(selectedCategory.CategoryName); // CategoryID에 해당하는 CategoryName을 value로 설정
    }
  }
}, [selectedItemInfo]);


//UseEffect for Send the updated selectedCategoryID value to ItemDetail Component(Parent component).
useEffect((()=>{
  const selectedCategory = category.find(c=>c.CategoryName === value); //Find the selected object compare with value.
  if(selectedCategory){
    setSelectedCategoryID(selectedCategory.CategoryID);//Update the selectedCategoryID state to selectedCategory.CategoryID
    setSelectedCategoryImageID(selectedCategory.CategoryImageID_id)//Update the selectedCategoryImageID
  }else{
    setSelectedCategoryID(null);//Case that user didn't select the category yet
    setSelectedCategoryImageID(null);
  }
}
),[value,category])

//Send the updated selectedCategoryID and selectedCategoryImageID value to ItemDetail Component(Parent component).
useEffect(() => {
  // if selectedCategory is existed, call the userSelectFridgeIDFunction
  if (selectedCategoryID) {
    userSelectCategoryIDFunction(selectedCategoryID);
    userSelectCategoryImageIDFunction(selectedCategoryImageID);
  }
}, [selectedCategoryID]);

/**Function for Connecting getAllCategory API getting category name and emoji */
async function getAllCategory(){
    try{
        const response = await axios.get('https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/category/getAllCategories');
        const parseData = JSON.parse(response.data);
        setCategory(parseData);
        //Set the value of the categoryImageId
        const imageIds = parseData.map(c => c.CategoryImageID_id);
        setCategoryImageId(imageIds);
        fetchCategoryEmojis(imageIds);//Get emoji using CategoryImageID
        
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
        
        //Update emoji data 
        setResponseCategoryImage(prevEmojis => ({
            ...prevEmojis,
            [input]: response.data.CategoryImage  //Save emoji base on the updating
        }));

    }catch(error){
        console.log("Failed to get the data from getCategory API: " + error);

    }
}
  /** Bring the each emoji cycle the CategoryImageId array */
  async function fetchCategoryEmojis(imageIds) {
    const emojiPromises = imageIds.map(id => getCategoryImage(id));  // Call API using each emoji
    await Promise.all(emojiPromises);  // Wait until all emoji will be deliviered

  }

/**Connecting the API that bring the All FridgeName and All Category Name  */
useEffect(()=>{
    getAllCategory();
    
   },[]);

//Handling the dialog action
  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {

    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Choose a category</DialogTitle>
      <DialogContent dividers>
        <RadioGroup 
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          defaultValue={value}
          onChange={handleChange}
        >
          {category.map((c) => (
            <FormControlLabel
              value= {c.CategoryName}
              key={c.CategoryID}
              control={<Radio />}
              label={responseCategoryImage[c.CategoryID] + "  "+ c.CategoryName}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function ConfirmationDialog({userSelectCategoryIDFunction, userSelectCategoryImageIDFunction,selectedItemInfo}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("none");
  const [category,setCategory] = useState([]);//State for category data

  /**Connecting the API that bring the Category  */
useEffect(()=>{
  getAllCategory();
  
 },[]);


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
// UseEffect for updating selected category based on selectedItemInfo
useEffect(() => {

  if (selectedItemInfo) {
    const selectedCategory = category.find((c) => c.CategoryID === selectedItemInfo.CategoryID);
    if (selectedCategory) {
      setValue(selectedCategory.CategoryName); // CategoryID에 해당하는 CategoryName을 value로 설정
    }
  }
}, [selectedItemInfo]);

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Box  sx={{ bgcolor: 'background.paper' }}>

      <List component="div" role="group">

        <ListItemButton
          sx={{
            width: '100%', 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            padding: '10px',
            pl:2
          }}
          divider
          
          aria-haspopup="true"
          aria-controls="ringtone-menu"
          aria-label="phone ringtone"
          onClick={handleClickListItem}
        >
          <ListItemText primary={value} />
          <ArrowDropDownIcon/>

        </ListItemButton>

        <ConfirmationDialogRaw
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
          userSelectCategoryIDFunction={userSelectCategoryIDFunction}
          userSelectCategoryImageIDFunction={userSelectCategoryImageIDFunction}
          selectedItemInfo={selectedItemInfo}
          categoryBefore={category}
        />
      </List>
    </Box>
  );
}