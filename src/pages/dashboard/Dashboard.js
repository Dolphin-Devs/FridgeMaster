import * as React from 'react';
import '../../assets/Dashboard.css';
import { useState,useEffect } from 'react';
import { styled, createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems} from './listItems';
import InputBase from '@mui/material/InputBase';
import { useLocation, useNavigate} from 'react-router-dom';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from 'axios';
/**Components in the Dashboard */
import UserItem from '../../components/list-components/UserItem';
import ItemDetail from '../../components/list-components/ItemDetail';

import GeneralSetting from '../../components/setting-components/GeneralSetting';
import RecipeName from '../../components/recipe-components/RecipeName';
import RecipeDetail from '../../components/recipe-components/RecipeDetail';
import OtherSetting from '../../components/setting-components/OtherSetting';
import AboutUs from '../../components/setting-components/AboutUs';
import Empty from '../../components/Empty';
import ActionButton from '../../components/ActionButton';
import Copyright from '../../components/Copyright';


import UserFridge from '../../components/storage-components/UserFridge';
import FridgeDetail from '../../components/storage-components/FridgeDetail';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import UserItemInFridge from '../../components/storage-components/UserItemInFridge';
import { red } from '@mui/material/colors';

const drawerWidth = 160;

/**About the Search Bar */
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: 'solid 1px',
  borderRadius: '30px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      backgroundColor:"orange",
      border:"none",
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);




// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  //----------------------------For Location & Screen transition --------------------------
  const location = useLocation();
  const navigate = useNavigate();
  //-----The information from ex page
  const{email,username,userId} = location.state || {};
  //-----for close button of right panel
  const [isVisible, setIsVisible] = useState(true);

  //----------------------------For Responsive Web --------------------------
  const [open, setOpen] = React.useState(false); //Control for Drawer // Mobile: Drawer closed, Desktop: Drawer open
  const theme = useTheme();//Control of mobile envrionment of the device
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); //Check for mobile environment of the device
  const [activePanel, setActivePanel] = useState("left"); // 현재 활성화된 패널 상태
  //----- 왼쪽 패널에서 아이템 클릭 시
  const handleItemClick = () => {
    setActivePanel("right"); // 오른쪽 패널 활성화
  };
  //----- 오른쪽 패널에서 X 버튼 클릭 시
  const handleClosePanel = () => {
    setActivePanel("left"); // 왼쪽 패널 활성화
  };
    //For Responsive Web : Method for setting the drawer open and close
    const toggleDrawer = () => {
      setOpen(!open); 
    };
   

  // ----------------------------For User Item List --------------------------
  const [userItemList, setUserItemList] = useState([]);
  const [selectUserItemID, setSelectUserItemID] = useState(); // State for saving the user selected item id.
  const [selectUserFridgeID, setSelecUserFridgeID] = useState(); // State for saving the user selected FridgeID.
  
  const [selectedFridgeInfo, setSelectedFridgeInfo] = useState(); // State for saving and sending the user selected item information
  const [selectFridgeID, setSelecFridgeID] = useState();

  const [selectItemID, setSelecItemID] = useState(); // State for saving the user selected itemID
  const [selectedItemInfo, setSelectedItemInfo] = useState(); // State for saving and sending the user selected item information

  const [isAddItem, setIsAddItem] = useState(false); // State for check whether click the add item button or not
  const [isSelectUserItem, setIsSelectUserItem] = useState(false); // State for check whether click the user item on the list or not
  const [isAddFridge, setIsAddFridge] = useState(false); // State for check whether click the add fridge button or not
  const [isSelectUserFridge, setIsSelectUserFridge] = useState(false); // State for check whether click the user fridge on the list or not

  const [selectedListItemNavMenu, setSelectedListItemNavMenu] = useState(1); // State for check whether click the user item on the nav menu
  const [shouldUpdate, setShouldUpdate] = useState(false); // State for handling update or not

  const [shouldUpdateFridge, setShouldUpdateFridge] = useState(false); // State for handling update or not
  const [userFridgeList, setUserFridgeList] = useState([]);
  const [selectedFridgeID, setSelectedFridgeID] = useState(null);
  const [isEditFridge, setIsEditFridge] = useState(false); // Track if edit mode is active




  // ----------------------------For Setting Page --------------------------
  const[isAboutUs, setIsAboutUs] = useState(false);//State for handling about user selects about us

  // ----------------------------For Recipe Page --------------------------
  const[firstRecipe,setFirstRecipe] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);//Send the information about selected recipe 
  //---For RecipeName Component
  const[nearItems,setNearItems] = useState([]);
  const[itemNameList,setItemNameList] = useState([]);
  //---For RecipeDetail Component
  const[recipeEmoji,setRecipeEmoji] = useState(false);
  const[recipeName,setRecipeName] = useState(false);
  const[recipeIngre,setRecipeIngre] = useState(false);
  const[recipeSteps,setRecipeSteps] = useState(false);



  
/**Function for Sign out and go to the Login Page */
const signOut = (input) => {
  if (input === true) {
    // Initialize all the state from the User
    setUserItemList([]);
    setSelectUserItemID(null);
    setSelecUserFridgeID(null);
    setSelecFridgeID(null);
    setSelecItemID(null);
    setSelectedItemInfo(null);
    setSelectedFridgeInfo(null);
    setIsAddItem(false);
    setIsAddFridge(false);
    setIsEditFridge(false);
    setIsSelectUserItem(false);
    setIsSelectUserFridge(false);
    setIsVisible(true);
    setSelectedListItemNavMenu(1);
    setUserFridgeList([]);
    alert("Sign-out Success");
    navigate('/login', {
      replace: true,
      state: null, // Initialize state
    });
  }
};

/**Function if user click the logo, go back to the first page */
//Initialize All click state
const handleLogoClick = () =>{
  setSelectedListItemNavMenu(1);
  setIsAddItem(false);
  setIsSelectUserItem(false);
  setIsAboutUs(false);
  setIsAddFridge(false);
  setIsEditFridge(false);
  setIsVisible(true);
  setSelectedRecipeId(null);

}

//Function for check that user click the RecipeName component 
const handleRecipeClick = (recipeKey) => {
  setSelectedRecipeId(recipeKey);
  setActivePanel("right"); // 오른쪽 패널 활성화
};

const sendIngreSteps = (recipeName,ingredients, steps, emoji) =>{
    setRecipeEmoji(emoji);
    setRecipeName(recipeName);
    setRecipeIngre(ingredients);
    setRecipeSteps(steps);
    setIsVisible(true);
}

/**Function for check that user click the about us in the General Setting component */
const handleAboutUs = (input) =>{
  if(input === true){
    setIsAboutUs(true);
    setIsVisible(true);
    setActivePanel("right"); // 오른쪽 패널 활성화
  }
}
/**Function when user check the terms and conditioins, 
 * After click the back button in the terms and condition page, maintain ex page
 */
const handleTermsandConditions = (input) => {
  if (input === true) {
    setSelectedListItemNavMenu(3);
    setIsVisible(true);
    setIsAboutUs(true);
    navigate('/termsAndConditions', {
      state: { isAboutUs: true }, // Convey the current state in "isAboutUs" page
    });
  }
};

useEffect(() => {
  if (location.state && location.state.isAboutUs) {
    setIsAboutUs(location.state.isAboutUs);
    setSelectedListItemNavMenu(3);
  }
}, [location.state]);



  /**Check for the User data from the login page */
  useEffect(() => {
    try {
        getItems(userId);
    } catch (error) {
      //console.log(error);
    }
  }, [userId]); 
  
  /**Function for get the item list based on the userId */
  //Save the value from the getAllItemList API and call the sendItemToRecipe function to calculate nearest exire date item to the sortedItem 
  async function getItems(input) {
    try {
      const response = await axios.get(
        'https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/item/getAllItemList',
        {
          params: { id: input }  // Using key "params" and sending parameter to API.  
        }
      );
      setUserItemList(response.data); //update the userItemList variable
    } 
    catch (error) {
      //console.log(error);

    }
  }

//******************************  Fridge List ****************************//
useEffect(() => {
  try {
    getFridge(userId);
  } catch (error) {
    //console.log(error);
  }
}, [userId]); 

async function getFridge(input) {
  try {
    const response = await axios.get(
      'https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/fridge/getAllFridges',
      {
        params: { id: input }  // Using key "params" and sending parameter to API.  
      }
    );
    setUserFridgeList(response.data); //update the userItemList variable
  } 
  catch (error) {
    //console.log(error);

  }
}

/**Function for get the user selected user item id */
const getSelectUserItemID = (selectedID) => {
  setSelectUserItemID(selectedID);
  setIsSelectUserItem(true);
  setIsSelectUserFridge(true);
  setIsAddFridge(false);
  setIsEditFridge(false);
  setIsVisible(true);
  setIsAddItem(false);
};

//Method for when user click the specific fridge in the userFridge component. 
const getSelectUserFridgeID = (selected) => {
  console.log("Selected User Fridge ID:", selected);
  setSelecUserFridgeID(selected);
  setIsSelectUserFridge(true);
  setIsSelectUserItem(true);
  setIsAddFridge(false);
  setIsEditFridge(false);
  setIsVisible(true);
  setIsAddItem(false);
  setActivePanel("right"); // 오른쪽 패널 활성화
};

const getSelectFridgeID = (selected) => {
  console.log("Selected Fridge ID:", selected);
  setSelecFridgeID(selected);
  setIsSelectUserFridge(true);
  setIsAddFridge(false);
  setIsEditFridge(false);
  setIsVisible(true);
  setIsAddItem(false);
  setIsAboutUs(false);
};




  // useEffect to detect changes in userItemList and then call sendItemsToRecipe
    useEffect(() => {
      if (userItemList.length > 0) {
        postRecipe(userItemList);
      }
    }, [userItemList]);
  
  //Function for post the userItemList data to the recipe.py, Call the sendItemsToRecipe
  async function postRecipe(userItemList){
    //Filtering 5 items with the nearest expiry date
    const today = new Date();
    // Filter out items where ExpiryDate is before today
    const validItems = userItemList.filter(item => new Date(item.ExpiryDate) >= today);
    // Sort the valid items by ExpiryDate and take the top 5
    const sortedItems = validItems.sort((a, b) => new Date(a.ExpiryDate) - new Date(b.ExpiryDate)).slice(0, 5);

    if(userItemList.length>=1){
      try{
        const response = await axios.post('https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/recipe/postRecipe',{
          userItemList: sortedItems
        })
  
        const parsedBody = JSON.parse(response.data.body);
        //Save the item name for creating recipe;
        setNearItems(parsedBody.receivedItems);
        //Parshing Each Recipe depends on the Delimiters
        //Save Each Recipes to each state
        const recipes = parsedBody.recipe.split("|").slice(1, 4);
        setFirstRecipe(recipes)
        //setThirdRecipe(parsedBody.recipe.split("|")[3]);
        //console.log('Recipe received:', parsedBody.recipe);//Check the recipe data
  
      }catch(error){
          
      } 
      
    }else{
      setFirstRecipe(false);//If the user have any item, set the first recipe is false.
    }


}


//Setting the item name list from the nearItems from the api result
useEffect(()=>{
  setItemNameList(nearItems.map((item,index)=><a key={index}>{item} </a>))

},[nearItems])

  /**When user click the specific item(get a new value in selectUserItemID), Call the getItemInfo API */
  useEffect(()=>{
    try{
      getItemInfoUserItemID(userId,selectUserItemID);

    }catch(error){
      //console.log("useEffect based on selectUserItemID is error :" + error);
    }
  },[selectUserItemID])


  /**Function for get the item information(item name, expiredate,storage,category,quantity) based on the UserItemID */
  async function getItemInfoUserItemID(inputID, inputUserItemID){
    try{
      const response = await axios.get(
        'https://5182cy26fk.execute-api.ca-central-1.amazonaws.com/prod/item/getItemInfo',
        {
          params: {id:inputID, UserItemID:inputUserItemID}
        }
      )
      setSelectedItemInfo(response.data);//Update state with new item info

    }catch(error){
      //console.log("getItemInfo api Error: " + error);
    }
  }

  /**Function for check which list item is selected by user on the Nav Menu*/
  const getSelectListItem = (UserSelectedList) =>{
    setSelectedListItemNavMenu(UserSelectedList);
  } 





//Function for get the selected item id
const getSelectItemID = (selected) =>{
  setSelecItemID(selected);
  setIsSelectUserItem(true);
  setIsAddItem(false);
  setIsAboutUs(false);
  setIsAddFridge(false);
  setIsEditFridge(false);
  setIsVisible(true);
}








/**Update the userItemList when hadnleAfterAddDeleteItem got a true parameter from Item Detail(Chiled Component) */

  /**Method that update the IsAddItem when user click the add item button */
  const handleAddItemClick=()=>{
    setIsAddItem(true);
    setIsSelectUserItem(false);
    setIsAboutUs(false);
    setIsAddFridge(false);
    setIsEditFridge(false);
    setIsVisible(true);
    setActivePanel("right");//For Mobile Screen, Active the right panel if the user click the add item button on the left panel. 
  }

    /**Method that update the IsAddFridge when user click the add Fridge button */
    const handleAddFridgeClick = () => {
      setIsAddFridge(true);
      setIsSelectUserFridge(false);
      setIsEditFridge(false);
      setIsVisible(true);
      setIsAboutUs(false);
      setIsAddItem(false);
  
      //Initialize of status of frige
      setSelectedFridgeInfo(null);
      setActivePanel("right");//For Mobile Screen, Active the right panel if the user click the add item button on the left panel. 
    };

    useEffect(() => {
    }, [selectedFridgeInfo]);

/**Method that update isSelectUserItem and isAddItem after delete the item */
const handleAfterAddDeleteItem=(input)=>{

  if(input === true){
    setIsAddItem(false);
    setIsSelectUserItem(false);
    setShouldUpdateFridge(false);
    setShouldUpdate(true);//Set the true that update userItemList
  }

}

const handleEditFridgeFunction = (fridgeID, userFridgeID, fridgeName, fridgeImageID) => {
  console.log("handleEditFridgeFunction triggered for fridge ID:", fridgeID);
  setIsAddFridge(false);
  setIsSelectUserFridge(false);
  setIsAboutUs(false);
  setIsAddItem(false);
  setIsVisible(true);
  setIsEditFridge(true); // Enable edit mode
  setSelectedFridgeInfo({
    fridgeID,
    userFridgeID,
    fridgeName,
    fridgeImageID,
  });
  setActivePanel("right");
  console.log("isEditFridge 상태:", true);
  console.log("selectedFridgeInfo 설정 완료:", {
    fridgeID,
    userFridgeID,
    fridgeName,
    fridgeImageID,
  });
};

const handleAfterAddDeleteFridge=(input)=>{

  if(input === true){

    setIsSelectUserFridge(false);
    setShouldUpdateFridge(true);
    setShouldUpdate(false);
  }

  

} 


/** Update userItemList when shouldUpdate changes */
useEffect(() => {
  if (shouldUpdate) {
    getItems(userId);
   
    setShouldUpdate(false); // After update set the shouldupdate state to false
  }
}, [shouldUpdate, userId]);



/** Update userItemList when shouldUpdate changes */
useEffect(() => {
  if (shouldUpdateFridge) {
    getFridge(userId);
    setShouldUpdateFridge(false);

  }
}, [shouldUpdateFridge, userId]);



  useEffect(() => {
    console.log("isVisible state changed:", isVisible);
  }, [isVisible]);



  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ bgcolor: "white", color: "orange" }}>
          <Toolbar sx={{ pr: '24px' }}>
            {/* Hambuger and ChevronLeftIcon */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label={open ? "close drawer" : "open drawer"}
              onClick={toggleDrawer}
              sx={{ marginRight: "36px" }}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />} {/* Transfer each icon depends on the status */}
            </IconButton>
            {/* Logo of Fridge Master */}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, cursor: 'pointer' }}
              onClick={handleLogoClick}
            >
              <p class="font-orange">FRIDGE <a class="font-white">MASTER</a></p>
            </Typography>
          </Toolbar>
        </AppBar>
    
        <Drawer
          variant='permanent' 
          open={open}
          onClose={toggleDrawer} 
          isMobile={isMobile} 
        >
           {/* Toolbar in the Drawer */}
          <Toolbar 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-end', 
              px: [1], 
              bgcolor: "orange",
               }}
            >
          </Toolbar>
          {/* The menu in the Drawer*/}
          <List component="nav" sx={{ bgcolor: "orange", color: "white" }}>
            {mainListItems({ getSelectListItemFunction: getSelectListItem })}
          </List>
        </Drawer>
    
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
               {/*-------------------------Left Panel---------------------------------*/}
               <Grid
                  item
                  xs={activePanel === "left" && isMobile ? 12 : activePanel === "right" && isMobile ? 0 : 6} // For Mobile screen transition
                  md={6}
                  lg={5}
                  sx={{ display: activePanel === "right" && isMobile ? "none" : "block" }} // In Mobile screen, Hide the right pannel. 
                >
                <Paper
                  sx={{
                    p: 2,
                    display: 'block',
                    flexDirection: 'column',
                    minHeight: '85vh',
                    maxHeight: '85vh',
                    overflow: 'auto',
                  }}
                >
                  {/*-------------------------Left Side: The List Item ---------------------------------*/}
                  {selectedListItemNavMenu === 1 ? (
                    <>
                      {userItemList.length === 0 ? (
                        <Alert severity="info" color="warning">
                          Your fridge is empty. Add items from the List and fill up your fridge!
                        </Alert>
                      ) : (
                        <>
                          {userItemList
                            .slice()
                            .sort((a, b) => new Date(a.ExpiryDate) - new Date(b.ExpiryDate))
                            .map((el) => (
                              <UserItem
                                key={el.UserItemID}
                                UserItemID={el.UserItemID}
                                ItemID={el.ItemID}
                                FridgeID={el.FridgeID}
                                UserFridgeID={el.UserFridgeID}
                                CategoryImageID={el.CategoryImageID}
                                ItemName={el.ItemName}
                                Quantity={el.Quantity}
                                ExpiryDate={el.ExpiryDate}
                                getSelectUserItemIDFunction={getSelectUserItemID}
                                getSelectUserFridgeIDFunction={getSelectUserFridgeID}
                                getSelectItemIDFunction={getSelectItemID}
                                userId={userId}
                                handleClick={handleItemClick} // For moobile page, If User click the item, Active the right panel. 
                              />
                            ))}
                        </>
                      )}
                      <div className="actionBtn-wrap" onClick={handleAddItemClick}>
                        <ActionButton className="actionBtn" ActionName="Add Item" />
                      </div>
                    </>
                  ) : selectedListItemNavMenu === 2 ? (
                    <>
                      {userFridgeList
                        .slice()
                        .sort((a, b) => a.user_fridge_id - b.user_fridge_id)
                        .map((el) => (
                          <UserFridge
                            key={el.user_fridge_id}
                            UserItemID={el.user_item_id}
                            UserFridgeID={el.user_fridge_id}
                            FridgeID={el.fridge_id}
                            FridgeName={el.fridge_name}
                            FridgeImageID={el.fridge_image_id}
                            ItemCount={el.item_count}
                            userId={userId}
                            getSelectUserItemIDFunction={getSelectUserItemID}
                            getSelectUserFridgeIDFunction={getSelectUserFridgeID}
                            getSelectFridgeIDFunction={() => getSelectFridgeID(el.fridge_id)}
                            handleEditFridgeFunction={() => {
                              handleEditFridgeFunction(el.fridge_id, el.user_fridge_id, el.fridge_name, el.fridge_image_id);
                            }}
                            handleAfterAddDeleteFridgeFunction={handleAfterAddDeleteFridge}
                            handleClick={handleItemClick} // For moobile page, If User click the item, Active the right panel. 
                          />
                        ))}
                      <div className="actionBtn-wrap" onClick={handleAddFridgeClick}>
                        <ActionButton className="actionBtn" ActionName="Add Fridge" />
                      </div>
                    </>
                  ) : selectedListItemNavMenu === 4 ? (
                    <>
                      {userItemList.length === 0 ? (
                        <Alert severity="info" color="warning">
                          Your fridge is empty. Add items from the List and fill up your fridge!
                        </Alert>
                      ) : (
                        <>
                          <Typography variant="caption">
                            &nbsp;Foods are nearing their expiration date – let’s use them up with this tasty recipe!
                          </Typography>
                          <Typography variant="h6">&nbsp;{itemNameList} 🍳</Typography>
                          <Box mb={2} />
                          {firstRecipe.map((el, index) => (
                            <RecipeName
                              key={index}
                              recipeKey={index}
                              firstRecipe={el}
                              handleRecipeClickFunction={handleRecipeClick}
                              sendIngreStepsFunction={sendIngreSteps}
                              handleClick={handleItemClick} // For moobile page, If User click the item, Active the right panel. 
                            />
                          ))}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Typography variant="h6" mt={2} mb={2}>
                        &nbsp;&nbsp;Hi, {username} 👋
                      </Typography>
                      <GeneralSetting signOutFunction={signOut} />
                      <OtherSetting 
                        handleAboutUsFunction={handleAboutUs}
                        handleClick={handleItemClick} // For moobile page, If User click the item, Active the right panel.  
                      />
                    </>
                  )}
                </Paper>
              </Grid>
              {/*------------------------- Right Panel---------------------------------*/}
              <Grid
                item
                xs={activePanel === "right" && isMobile ? 12 : activePanel === "left" && isMobile ? 0 : 6} // 모바일 전환
                md={6}
                lg={7}
                sx={{ display: activePanel === "left" && isMobile ? "none" : "block" }} // 모바일에서 왼쪽 패널 활성화 시 숨김
              >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '85vh',
                    maxHeight: '85vh',
                  }}
                >
                  {selectedListItemNavMenu === 1 ? (
                    <>
                      {!isAddItem && !isSelectUserItem && !isVisible  ? (
                        <Empty />
                      ) : isAddItem && !isSelectUserItem && isVisible ? (
                        <ItemDetail
                          userId={userId}
                          selectFridgeIDFromUser={selectUserFridgeID}
                          selectItemID={selectItemID}
                          selectUserItemID={selectUserItemID}
                          handleAfterAddDeleteItemFunction={handleAfterAddDeleteItem}
                          setIsVisible={setIsVisible} 
                          handleClosePanel={handleClosePanel} //Close 버튼 클릭 시 Panel 전환 메소드
                        />
                      ) : !isAddItem && isSelectUserItem && isVisible ?(
                        <ItemDetail
                          userId={userId}
                          selectFridgeIDFromUser={selectUserFridgeID}
                          selectItemID={selectItemID}
                          selectUserItemID={selectUserItemID}
                          selectedItemInfo={selectedItemInfo}
                          handleAfterAddDeleteItemFunction={handleAfterAddDeleteItem}
                          setIsVisible={setIsVisible} 
                          handleClosePanel={handleClosePanel} //Close 버튼 클릭 시 Panel 전환 메소드
                        />
                      ): (
                          <Empty />
                        )}
                    </>
                  ) : selectedListItemNavMenu === 2 ? (
                    <>
                       {isAddFridge && !isSelectUserFridge && !isEditFridge && isVisible ? (
                          <FridgeDetail
                            userId={userId}
                            selectUserFridgeID={selectUserFridgeID}
                            selectFridgeID={selectedFridgeInfo?.userFridgeID}
                            selectedFridgeInfo={selectedFridgeInfo}
                            handleAfterAddDeleteFridgeFunction={handleAfterAddDeleteFridge}
                            setIsVisible={setIsVisible} 
                            handleClosePanel={handleClosePanel} //Close 버튼 클릭 시 Panel 전환 메소드
                          />
                        ) : !isAddFridge && isSelectUserFridge && !isEditFridge && isVisible? (
                          <UserItemInFridge
                            userId={userId}
                            UserFridgeID={selectUserFridgeID}
                            FridgeID={selectFridgeID}
                            setIsVisible={setIsVisible} 
                            handleClosePanel={handleClosePanel} //Close 버튼 클릭 시 Panel 전환 메소드
                          />
                        ) : isEditFridge && !isAddFridge && !isSelectUserFridge && isVisible?(
                          <FridgeDetail
                            userId={userId}
                            selectFridgeIDFromUser={selectedFridgeInfo?.fridgeID}
                            selectUserFridgeID={selectedFridgeInfo?.userFridgeID}
                            selectedFridgeInfo={selectedFridgeInfo}
                            handleAfterAddDeleteFridgeFunction={handleAfterAddDeleteFridge}
                            setIsVisible={setIsVisible} 
                            handleClosePanel={handleClosePanel} //Close 버튼 클릭 시 Panel 전환 메소드
                          />
                        ) : (
                          <Empty />
                        )}
                    </>
                  ) : selectedListItemNavMenu === 4 ? (
                    (selectedRecipeId !== null) && isVisible ? (
                      <RecipeDetail
                        recipeEmoji={recipeEmoji}
                        recipeName={recipeName}
                        recipeIngre={recipeIngre}
                        recipeSteps={recipeSteps}
                        setIsVisible={setIsVisible}
                        handleClosePanel={handleClosePanel} //Close 버튼 클릭 시 Panel 전환 메소드
                      />
                    ) : (
                      <Empty />
                    )
                  ) : isAboutUs && isVisible? (
                    <AboutUs 
                      handleTermsandConditionsFunction={handleTermsandConditions}
                      setIsVisible={setIsVisible}
                      handleClosePanel={handleClosePanel} //Close 버튼 클릭 시 Panel 전환 메소드
                    />
                  ) : (
                    <Empty />
                  )}
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    
  );
}
