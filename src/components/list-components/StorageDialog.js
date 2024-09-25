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
  const { onClose, value: valueProp, open,storageInfo=[],userSelectFridgeIDFunction,selectedItemInfo, ...other } = props;
  const [value, setValue] = React.useState(valueProp); //Save the categoryName from the Dialog
  const radioGroupRef = React.useRef(null);
  const [selectedFridgeID, setSelectedFridgeID] = useState("");// Track the selected user_fridge_id

//UseEffect can start rendering when the value in the Dialog be changed.
//Track the fridge_id depends on value(fridge_name) 
useEffect((()=>{
  const selectedFridge = storageInfo.find(s=>s.fridge_name === value); //Find the selected object compare with value.
  if(selectedFridge){
    setSelectedFridgeID(selectedFridge.user_fridge_id);//Update the selectedFridgeID state to selectedFridge.user_fridge_id
  }else{
    setSelectedFridgeID(null);//Case that user didn't select the storage yet
  }
}
),[value,storageInfo])

//Send the updated selectedFridgeID value to ItemDetail Component(Parent component).
useEffect(() => {
  // if selectedFridgeID is existed, call the userSelectFridgeIDFunction
  if (selectedFridgeID) {
    userSelectFridgeIDFunction(selectedFridgeID);
  }
}, [selectedFridgeID]);


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
      <DialogTitle>Choose a storage</DialogTitle>
      <DialogContent dividers>
        <RadioGroup 
          ref={radioGroupRef}
          aria-label="storage"
          name="storage"
          value={value}
          onChange={handleChange}
        >
          {storageInfo.map((s) => (
            <FormControlLabel
              value= {s.fridge_name}
              key={s.user_fridge_id}
              control={<Radio />}
              label={s.fridge_name}
              
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

export default function ConfirmationDialog({userRealId, userSelectFridgeIDFunction,selectedItemInfo}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('none');
  const [userId,setUserId] = useState("");
  const [storageInfo, setStorageInfo] = useState([]);
  const [selectedFridgeID, setSelectedFridgeID] = useState(null);

  const handleClickListItem = () => {
    setOpen(true);
  };
 
  useEffect(()=>{

    setUserId(userRealId);
    getAllFridge(userId);//Call the getAllFridge 
  
  },[userId]);//Set rendering this component after userId was changed.

/**Function for Connecting the API can bring the All fridgeName based on the user id */
async function getAllFridge(input){
    try{
        const response = await axios.get(
          'https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/fridge/getAllFridges',
        {
          params: { id: input }  // Using key "params" and sending parameter to API.  
        });
      
        //Store the value of "response.data" to "storageInfo"
        setStorageInfo( response.data);
        
  
  
    }catch(error){
        console.log("Failed to get the data from getAllFridge API: " + error);
  
    }
  }
  // selectedItemInfo 또는 storageInfo가 변경될 때 value와 selectedFridgeID 설정
  useEffect(() => {
    if (selectedItemInfo && storageInfo.length > 0) {
      const selectedStorage = storageInfo.find(
        (s) => s.user_fridge_id === selectedItemInfo.UserFridgeID
      );
      if (selectedStorage) {
        setValue(selectedStorage.fridge_name); // UserFridgeID에 해당하는 fridge_name을 value로 설정
        setSelectedFridgeID(selectedStorage.user_fridge_id); // user_fridge_id를 selectedFridgeID로 설정
      }
    }
  }, [selectedItemInfo, storageInfo]);

    // selectedFridgeID가 변경될 때마다 부모 컴포넌트로 값 전달
    useEffect(() => {
      if (selectedFridgeID) {
        userSelectFridgeIDFunction(selectedFridgeID);
      }
    }, [selectedFridgeID]);

      // 다이얼로그 닫기 및 값 설정
  const handleClose = (newValue) => {
    setOpen(false);
    if (newValue) {
      setValue(newValue); // 선택된 fridge_name 설정
      // 선택한 fridge_name에 해당하는 user_fridge_id 찾기
      const selectedFridge = storageInfo.find(
        (s) => s.fridge_name === newValue
      );
      if (selectedFridge) {
        setSelectedFridgeID(selectedFridge.user_fridge_id); // 선택한 user_fridge_id 설정
      }
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
          storageInfo={storageInfo} 
          userSelectFridgeIDFunction={userSelectFridgeIDFunction}
          selectedItemInfo={selectedItemInfo}
        />
      </List>
    </Box>
  );
}