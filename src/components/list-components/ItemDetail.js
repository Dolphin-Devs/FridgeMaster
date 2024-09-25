import * as React from 'react';
import { useState,useEffect } from 'react';
import Paper from '@mui/material/Paper';



import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';



import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';



/**Date Range Picker */
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

/**Components */
 import ActionButton from '../ActionButton';
 import CategoryDialog from './CategoryDialog';
 import StorageDialog from './StorageDialog';




export default function ItemDetail({userId,selectUserItemID,selectItemID,selectedItemInfo,selectFridgeIDFromUser,handleAfterAddDeleteItemFunction}) {
  const [expanded, setExpanded] = React.useState(false);
  const today = new Date();/**Variable for today date */

  //*Final state for using AddUpdate api 
  const [itemName,setItemName]= useState('');   //*Final state for  for saving the item name 
  const [expireDate, setExpireDate] = React.useState(dayjs(today)); //*Final state for  saving user input expire date
  const [selectFridgeID,setSelectFridgeID] = useState();//*Final state for saving fridge ID
  const [selectCategoryID,setSelectCategoryID]= useState();//*Final state for saving category id
  const [selectCategoryImageID,setSelectCategoryImageID]= useState();//*Final state for saving category id
  const[userInputQuantity, setUserInputQuantity] = useState(0);   //*Final state for handling the user input Quantity, the initial value is 1
  //Error hadnling about input text filed
  const [errorUserInputItemName,setErrorUserInputItemName] = useState(''); 
  const [errorInputQuantity,setErrorInputQuantity] = useState('');
  const [errorSelectFridgeID, setErrorSelectFridgeID] = useState('');
  const [errorSelectCategoryID, setErrorSelectCategoryID] = useState('');

  const [isLoading, setIsLoading] = useState(false);//State for Checking api calling 


/**Check the selectFridgeIDFromUser is working */
useEffect(()=>{
  if(selectFridgeIDFromUser){
    //alert(selectFridgeIDFromUser); 
  }else{
    //alert("You don't have selectFridgeIDFromUser");
  }

},[selectFridgeIDFromUser])


  /**When selectedItemInfo has their own value, Update the states
   */
    // Effect to update state when selectedItemInfo changes
    useEffect(() => {
      if (selectedItemInfo) {
        setItemName(selectedItemInfo.ItemName || '');
        setExpireDate(selectedItemInfo.ExpiryDate ? dayjs(selectedItemInfo.ExpiryDate) : dayjs(today));
        setSelectFridgeID(selectedItemInfo.UserFridgeID || null);
        setSelectCategoryID(selectedItemInfo.CategoryID || null);
        setUserInputQuantity(selectedItemInfo.Quantity || 0);
      }
    }, [selectedItemInfo]);

 /**Method for save the value of user input quantity */
 /**Error handling about user input the number less than 1 */
 const handleUserInputQuantity = (e) =>{
  const tempUserInputQuantity = e.target.value
  if(tempUserInputQuantity<0){
    setErrorInputQuantity("Please enter a number greater than or equal to 1");

  }else{
    setUserInputQuantity(e.target.value)
    setErrorInputQuantity("")

  }
 }


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  /**Handling the list */
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

/**Handling the input data about item name and save the value to itemName state */
const handleInputChange = (e) =>{
  const tempUserInputItemName = e.target.value;
  setItemName(tempUserInputItemName);//Update the ItemName depennds on User's input
  if(tempUserInputItemName.trim() === ''){
    setErrorUserInputItemName("Please enter the item name")
  }else{

    setErrorUserInputItemName("")
  }
}
//If the user click the x button on the input base, call the deletInput and set the item name to null
const deleteInput = () =>{
  setItemName("");
}


//When user click the delete item, Call the api about delete item 
const handleDeleteButton = () =>{
  deleteItem(selectItemID);
}

/**When user click the save item, Call the api and update the item information */
//Validation about input and selection
const handleSaveButton = () =>{

  let isError = false;
  //Validation aboout itemName
  if (!itemName || itemName.trim() === ''){
    setErrorUserInputItemName("Item name is required");
    isError = true;
  }else{
    setErrorUserInputItemName("");
  }
  //Validation aboout Storage selection
  if(!selectFridgeID){
    setErrorSelectFridgeID("Please select a storage option");
    isError = true;
  }else{
    setErrorSelectFridgeID("");
  }
  //Validation about Category selection
  if(!selectCategoryID){
    setErrorSelectCategoryID("Please select a category option");
    isError = true;
  }else{
    setErrorSelectCategoryID("");
  }
  //Validation about userInputQuantity
  if(userInputQuantity === '' || userInputQuantity <= 0){
    setErrorInputQuantity('Quantity should be greater than 0');
    isError = true;
  }else{
    setErrorInputQuantity('');
  }
  // If there are no errors, proceed to save/update item
  if (!isError && !isLoading) {
    setIsLoading(true); //Change the isLoading state to true that postpone api calling duplicataion 
    // API call 
    try{ 
      //If the selectItemID is undefiend(User didn't click specific item on the list and add ), Call the addNewItem api 
      if(!selectItemID){
        addNewItem(userId,selectCategoryID,selectCategoryImageID,selectFridgeID,userInputQuantity,expireDate.format('YYYY-MM-DD'),itemName);
      }else{
        updateItem(userId,selectUserItemID,selectItemID,selectCategoryID,selectCategoryImageID,selectFridgeID,userInputQuantity,expireDate.format('YYYY-MM-DD'),itemName);
      }


      
    }finally{
      setIsLoading(false)//If the api calling is ended, initialize the isloading state again. 
    }
  }

}

/**Function for API that add new item */
async function addNewItem(inputUserID, inputCategoryID, inputCategoryImageID, inputUserFridgeID,inputQuantity,inputExpirationDate,inputItemName){
  try{
      axios.post('https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/item/addNewItem',{
          id: inputUserID,
          CategoryID: inputCategoryID,
          CategoryImageID: inputCategoryImageID,
          UserFridgeID: inputUserFridgeID,
          ExpiryDate:inputExpirationDate,
          Quantity:inputQuantity,
          ItemName:inputItemName,
      })

    alert(`Add New Item Successfully`);
    handleAfterAddDeleteItemFunction(true);//Change the item detail component

  }catch(error){
      console.log(error);
      console.log("Failed to get questions using ")
  }
}



/**Function for API about add and update item */
async function updateItem(inputUserID,selectUserItemID,inputItemID, inputCategoryID, inputCategoryImageID, inputUserFridgeID,inputQuantity,inputExpirationDate,inputItemName){
  try{
      const response = await axios.put('https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/item/updateItem',{
          id: inputUserID,
          UserItemID:selectUserItemID,
          ItemID: inputItemID,
          CategoryID: inputCategoryID,
          CategoryImageID: inputCategoryImageID,
          UserFridgeID: inputUserFridgeID,
          ExpiryDate:inputExpirationDate,
          Quantity:inputQuantity,
          ItemName:inputItemName,
      })
    // Check successful response data 
    const tempData = response.data;
    console.log('Success:', tempData);
    alert(`Update Item Successfully`);
    handleAfterAddDeleteItemFunction(true);//Change the item detail component

  }catch(error){
      console.log(error);
      console.log("Failed to get questions using ")
  }
}

/**Function for API about delete item */
async function deleteItem(inputID){
  try{
    await axios.delete('https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/item/deleteItem',{
      params: {
        ItemID: inputID  // Query parameters should be passed in the 'params' field
      }
    });
  alert("Success to delete item");
  handleAfterAddDeleteItemFunction(true);//Change the item detail component

  }catch(error){
    console.log(error);
    console.log("Failed to deleteItem api ")
  }
}



/**Function for selected by user */
/**Function for get the user_fridge_id by selected user */
const getSelectFridgeID = (UserSelectedFridgeID) =>{
  setSelectFridgeID(UserSelectedFridgeID);
} 
/**Function for get the category_id by selected user */
const getSelectCategoryID = (UserSelectedCategoryID) =>{
  setSelectCategoryID(UserSelectedCategoryID);
}
/**Function for get the category_image_id by selected user */
const getSelectCategoryImageID = (UserSelectedCategoryImageID) =>{
  setSelectCategoryImageID(UserSelectedCategoryImageID);
}


  return (
    <Box sx={{ width: '60%', ml:12,mr:12,mt:1 }}>
        <Grid container direction="row" spacing={4} >
            <Grid item lg={12}>
                <Paper
                    sx={{ 
                      
                      display: 'flex', 
                      alignItems: 'center',
                      
                      width: '100%', 
                      border: '1px solid #ccc', 
                      borderRadius: '4px', 
                      padding: '10px',
                      pl:2
                     }}
                    >

                    <InputBase
                        sx={{ ml: 1, flex: 1,alignItems: 'center'  }}
                        placeholder="Item Name"
                        value={itemName}
                        onChange={handleInputChange}
                        required
                        error={!!errorUserInputItemName}
                       
                                      
                    />
                    <IconButton onClick={deleteInput}  type="button" sx={{ p: '10px' }} aria-label="search">
                        <ClearIcon />
                    </IconButton>

                </Paper>
                {
                  errorUserInputItemName&&(
                    <Typography variant='caption' color="error" sx={{ mt: 1, ml: 1 }}>{errorUserInputItemName}</Typography>
                  )
                }
            </Grid>

            <Grid item  xs ={12} lg={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography  lg={6} md={6}>
                        Expiration Date
                    </Typography>
                    {/**Date Range Picker */}
                    <Box sx={{ flexBasis: '50%' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} lg={6} md={6}>
                      <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                          label=""
                          value={expireDate}
                          onChange={(expireDate) => setExpireDate(expireDate)}
                          sx={{borderRadius: '20px', width:'100%'}}
                        />
                      </DemoContainer>
                    </LocalizationProvider>   
                    </Box>             
              </Box>
            </Grid>
            <Grid item  lg={12} md={12} sx={{justifyItems: 'center'}}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                  <Typography lg={6} md={6} >
                    Storage
                  </Typography>
                  <Box sx={{ flexBasis: '50%' }}>
                    <StorageDialog 
                      selectedItemInfo={selectedItemInfo} 
                      userSelectFridgeIDFunction={getSelectFridgeID} 
                      userRealId={userId} 
                      lg={6} md={6}  
                      sx={{ width: '100%' }}/>
                    {
                      errorSelectFridgeID&&(
                        <Typography variant='caption' color="error" sx={{ mt: 1, ml: 1 }}>{errorSelectFridgeID}</Typography>
                    )}
                  </Box>

              </Box>
            </Grid>


            <Grid item  lg={12} md={12} sx={{justifyItems: 'center'}}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                  <Typography lg={6} md={6} >
                    Category
                  </Typography>
                  <Box sx={{ flexBasis: '50%' }}>
                    <CategoryDialog 
                      selectedItemInfo={selectedItemInfo} 
                      userSelectCategoryIDFunction={getSelectCategoryID} 
                      userSelectCategoryImageIDFunction={getSelectCategoryImageID} 
                      lg={6} md={6}  
                      sx={{ width: '100%' }}/>
                    {
                      errorSelectCategoryID&&(
                        <Typography variant='caption' color="error" sx={{ mt: 1, ml: 1 }}>{errorSelectCategoryID}</Typography>
                    )}
                  
                  </Box>
              </Box>
            </Grid>


            <Grid item  lg={12} md={12} sx={{justifyItems: 'center'}}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                  <Typography lg={6} md={6} >
                    Quantity 
                  </Typography>
                  <Box sx={{ flexBasis: '50%' }}>
                    <TextField
                      lg={6} md={6}
                      sx={{ width: '100%' }}
                      id="outlined-number"
                      required
                      InputProps={{ inputProps: { min: 0} }} //Input above the 0 only
                      type="number"
                      onChange={handleUserInputQuantity}
                      value={userInputQuantity}
                      error={!!errorInputQuantity}
                      helperText={errorInputQuantity}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />
                    
                  </Box>
              </Box>
            </Grid>
            <Grid item  lg={12} md={12} sx={{justifyItems: 'center'}}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                  <ActionButton  lg={6} md={6} onClick={handleDeleteButton} className='actionBtn' ActionName = "Delete Item"/>

                  <Box sx={{ flexBasis: '50%' }}>
                    <ActionButton lg={6} md={6} onClick={handleSaveButton} className='actionBtn' ActionName = "Save Item"/>
                  </Box>
              </Box>
            </Grid>


      </Grid>
    </Box>
  );
}