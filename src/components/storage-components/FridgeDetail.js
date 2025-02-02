import * as React from 'react';
import { useState,useEffect } from 'react';
import Paper from '@mui/material/Paper';

import {
    Box,
    FormControlLabel,
  } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';



import Grid from '@mui/material/Grid';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';



/**Components */
import ActionButton from '../ActionButton';
import LoadingProgress from '../../components/LoadingProgress';
import CloseButton from '../CloseButton';

export default function FridgeDetail({ FridgeName,
  FridgeImageID,userId,selectFridgeIDFromUser,selectUserFridgeID,selectedFridgeInfo, handleAfterAddDeleteFridgeFunction, setIsVisible, handleClosePanel}) {
  const [expanded, setExpanded] = React.useState(false);

  //*Final state for using AddUpdate api 
  const [fridgeName,setFridgeName]= useState('');   //*Final state for  for saving the item name 
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(''); // the user select fridge image
  const [selectFridgeID,setSelectFridgeID] = useState();//*Final state for saving fridge ID
  const [selectFridgeImageID,setSelectFridgeImageID]= useState();//*Final state for saving Fridge id

  //Error hadnling about input text filed
  const [errorUserInputFridgeName,setErrorUserInputFridgeName] = useState(''); 
  const [errorSelectFridgeID, setErrorSelectFridgeID] = useState('');
  const [value, setValue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);//State for Checking api calling 
 
  const [imagesLoading, setImagesLoading] = useState({});

  const handleClose = () => {
    setIsVisible(false); 
    if (handleClosePanel) {
      handleClosePanel(); // 부모 컴포넌트에서 전달받은 메서드 호출
    }
  };

  useEffect(() => {
      if (selectedFridgeInfo && images.length > 0) {
        const selectedStorage = images.find(
          (s) => s.user_fridge_id === images.UserFridgeID
        );
        if (selectedStorage) {
          setValue(selectedStorage.fridge_name); // UserFridgeID에 해당하는 fridge_name을 value로 설정
          setSelectFridgeID(selectedStorage.user_fridge_id); // user_fridge_id를 selectedFridgeID로 설정
        }
      }
    }, [selectedFridgeInfo, images]);


/**Handling the input data about item name and save the value to FridgeName state */
const handleInputChange = (e) =>{
  const tempUserInputFridgeName = e.target.value;
  setFridgeName(tempUserInputFridgeName);//Update the FridgeName depennds on User's input
  if(tempUserInputFridgeName.trim() === ''){
    setErrorUserInputFridgeName("Please enter the Fridge name")
  }else{

    setErrorUserInputFridgeName("")
  }
}
//If the user click the x button on the input base, call the deletInput and set the item name to null
const deleteInput = () =>{
  setFridgeName("");
}


//When user click the delete item, Call the api about delete item 
const handleDeleteButton = () =>{
  deleteFridge(selectedFridgeInfo?.fridgeID);
}

/**When user click the save item, Call the api and update the item information */
//Validation about input and selection
const handleSaveButton = () =>{
  const fridgeID = selectedFridgeInfo?.fridgeID;

  let isError = false;
  //Validation aboout FridgeName
  if (!fridgeName || fridgeName.trim() === ''){
    setErrorUserInputFridgeName("Fridge name is required");
    isError = true;
  }else{
    setErrorUserInputFridgeName("");
  }
  // If there are no errors, proceed to save/update item
  if (!isError && !isLoading) {
    setIsLoading(true); //Change the isLoading state to true that postpone api calling duplicataion 
    // API call 
    try{ 
      //If the selectFridgeID is undefiend(User didn't click specific item on the list and add ), Call the addNewFridge api 
      if(!fridgeID){
        addNewStorage(userId,selectFridgeImageID,fridgeName);

      }else{
        console.log('Call updateStorage method');
        updateStorage(userId,fridgeID, selectFridgeImageID,selectUserFridgeID,fridgeName);

      }


      
    }finally{
      setIsLoading(false)//If the api calling is ended, initialize the isloading state again. 
    }
  }

}

/**Function for API that add new item */
async function addNewStorage(inputUserID, inputFridgeImageID,inputFridgeName){

  try{
      axios.post('https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/fridge/addNewStorage',
        {
        id: inputUserID,
        FridgeImageID: inputFridgeImageID,
        FridgeName: inputFridgeName,
      })
      .then(response => {
        console.log('Success:', response.data);
    })


    alert(`Add New Fridge Successfully`);
    handleAfterAddDeleteFridgeFunction(true);//Change the item detail component

  }catch(error){
      console.log(error);
      console.log("Failed to get questions using ")
  }
}



/**Function for API about add and update item */
async function updateStorage(inputUserID,inputFridgeID,inputFridgeImageID, inputUserFridgeID, inputFridgeName){
  try{
      await axios.put('https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/fridge/updateStorage',{
          id: inputUserID,
          FridgeID: inputFridgeID,
          FridgeImageID: inputFridgeImageID,
          UserFridgeID: inputUserFridgeID,
          FridgeName:inputFridgeName,
      })

    alert(`Update Fridge Successfully`);
    handleAfterAddDeleteFridgeFunction(true);//Change the Fridge detail component

  }catch(error){
      console.log(error);
      console.log("Failed to get questions using ")
  }
}

/**Function for API about delete item */
async function deleteFridge(inputID){
  try{
    await axios.delete('https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/fridge/deleteStorage',{
      params: {
        FridgeID: inputID  // Query parameters should be passed in the 'params' field
      }
    });
  alert("Success to delete Fridge");
  handleAfterAddDeleteFridgeFunction(true);//Change the Fridge detail component
  setIsVisible(false);
  
  }catch(error){
    console.log(error);
    console.log("Failed to deleteFridge api ")
  }
}

const fetchImages = async () => {
    try {
      const response = await axios.get(
        'https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/fridge/getAllFridgeImages'
      );

      const respondFridgeImage = Array.isArray(response.data)
      ? response.data
      : JSON.parse(response.data);
  

      setImagesLoading(false);

      setImages(respondFridgeImage); 
      handleAfterAddDeleteFridgeFunction(true);//Change the Fridge detail component

    } catch (error) {
      console.error('Failed images:', error);

    }
  };

/**Function for selected by user */
/**Function for get the user_fridge_id by selected user */
const getSelectFridgeID = (UserSelectedFridgeID) =>{
  setSelectFridgeID(UserSelectedFridgeID);
} 

/**Function for get the Fridge_image_id by selected user */
const getSelectFridgeImageID = (UserSelectedFridgeImageID) =>{
  setSelectFridgeImageID(UserSelectedFridgeImageID);
}

const handleImageClick = (imageId) => {
    setSelectedImage(imageId);
    getSelectFridgeImageID(imageId); 
    console.log("Selected FridgeImageID:", imageId);
  
  };

  useEffect(() => {
    if (selectedFridgeInfo) {
      // selectedFridgeInfo가 유효하면 상태를 업데이트
      setFridgeName(selectedFridgeInfo.fridgeName || '');
      setSelectFridgeID(selectedFridgeInfo.fridgeID || null);
      setSelectFridgeImageID(selectedFridgeInfo.fridgeImageID || null);
      setSelectedImage(selectedFridgeInfo.fridgeImageID || '');
      console.log("selectedFridgeInfo 업데이트:", selectedFridgeInfo);
    } else {
      // selectedFridgeInfo가 null이면 초기 상태로 설정
      setFridgeName('');
      setSelectFridgeID(null);
      setSelectFridgeImageID(null);
      setSelectedImage('');
      console.log("selectedFridgeInfo가 null로 초기화됨");
    }
  }, [selectedFridgeInfo]);

  useEffect(() => {
      fetchImages();
    }, []);



  return (
    <Box sx={{ width: '70%', ml:12,mr:12,mt:1 }}>
      <CloseButton onClick={handleClose} CloseName="Normal"/>
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
                        placeholder="Fridge Name"
                        value={fridgeName}
                        onChange={handleInputChange}
                        required
                        error={!!errorUserInputFridgeName}
                                      
                    />
                    <IconButton onClick={deleteInput}  type="button" sx={{ p: '10px' }} aria-label="search">
                        <ClearIcon />
                    </IconButton>

                </Paper>
                {
                  errorUserInputFridgeName&&(
                    <Typography variant='caption' color="error" sx={{ mt: 1, ml: 1 }}>{errorUserInputFridgeName}</Typography>
                  )
                }
            </Grid>

            <Divider sx={{ width: '110%', mb: -2, mt: 8 }} />
            <Grid item  lg={12} md={12} sx={{justifyItems: 'center'}}>
                
                <Typography>Images</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly', 
                        alignItems: 'center',
                        gap: 3, //Adjust spacing on both sides
                        mt: 2, // Adjust the top and bottom spacing
                    }}
                    >
                    {images.map((img, index) => (
                        <Paper
                        key={index}
                        elevation={selectedImage === img.FridgeImageID ? 8 : 2}
                        sx={{
                            borderRadius: '50%',
                            overflow: 'hidden',
                            width: 60,
                            height: 60,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: selectedImage === img.FridgeImageID ? 'lightgray' : 'transparent', // 선택된 이미지 배경 강조
                        }}
                        >
                        <IconButton
                            onClick={() => handleImageClick(img.FridgeImageID)} 
                            sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            backgroundColor: selectedImage === img.FridgeImage ? 'lightgray' : 'transparent',
                            }}
                        >
                            {imagesLoading[img.FridgeImageID] ? (
                              <LoadingProgress />
                            ) : (
                              <img
                              src={img.FridgeImage}
                              alt={`Fridge ${index}`}
                              style={{ width: '70%', height: '70%', objectFit: 'contain' }}
                              onLoad={() => setImagesLoading(false)}
                             
                              />
                            )}
                        </IconButton>
                        </Paper>
                    ))}
                    </Box>
            </Grid>


            <Grid item  lg={12} md={12} sx={{justifyItems: 'center'}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
                  <ActionButton  lg={6} md={6} onClick={handleDeleteButton} className='actionBtn' ActionName = "Delete Fridge"/>
                  </Box>
                  <Box sx={{ flexBasis: '50%' }}>
                    <ActionButton lg={6} md={6} onClick={handleSaveButton} className='actionBtn' ActionName = "Add Fridge"/>
                  </Box>
              
            </Grid>


      </Grid>
    </Box>
  );
}