import * as React from 'react';
import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import { Typography } from '@mui/material';



function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp); //Save the categoryName from the Dialog
  const radioGroupRef = React.useRef(null);
//Handling data for category 
const [category,setCategory] = useState([]);//State for category data
const [categoryImageId,setCategoryImageId] = useState();//State for category image id data
const [responseCategoryImage,setResponseCategoryImage] = useState("");//State for category image data

/**Function for Connecting getAllCategory API getting category name and emoji */
async function getAllCategory(){
    try{
        const response = await axios.get('https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/category/getAllCategories');
        const parseData = JSON.parse(response.data);
        setCategory(parseData);
        //Set the value of the categoryImageId
        const imageIds = parseData.map(c => c.CategoryImageID_id);
        setCategoryImageId(imageIds);
      // CategoryImageID로 각 이모지를 가져옴
      fetchCategoryEmojis(imageIds);  // 이 함수가 모든 이모지를 불러옴
        
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
        // 이모지 데이터를 상태에 업데이트 (동적으로 추가)
        setResponseCategoryImage(prevEmojis => ({
            ...prevEmojis,
            [input]: response.data.CategoryImage  // 입력된 ID에 맞는 이모지 저장
        }));

    }catch(error){
        console.log("Failed to get the data from getCategory API: " + error);

    }
}
  /** CategoryImageId 배열을 순회하여 각각의 이모지를 가져옴 */
  async function fetchCategoryEmojis(imageIds) {
    const emojiPromises = imageIds.map(id => getCategoryImage(id));  // 각 ID로 API 호출
    await Promise.all(emojiPromises);  // 모든 이모지 가져오는 API 호출이 완료될 때까지 기다림

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

export default function ConfirmationDialog() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('none');

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
        />
      </List>
    </Box>
  );
}