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
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
/**Components in the Dashboard */
import UserItem from '../../components/list-components/UserItem';
import ItemDetail from '../../components/list-components/ItemDetail';
import Empty from '../../components/Empty';
import ActionButton from '../../components/ActionButton';
import Copyright from '../../components/Copyright';



const drawerWidth = 240;

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
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const[userItemList,setUserItemList] = useState([]);
  //State about user select item on the UserItem Component, and Display it to Item Detail Component.
  const[selectUserItemID,setSelectUserItemID] =useState(); //State for saving the user selected item id. 
  const[selectFridgeID,setSelecFridgeID] =useState(); //State for saving the user selected FridgeID. 
  const[selectItemID,setSelecItemID] =useState(); //State for saving the user selecte itemID
  const[selectedItemInfo, setSelectedItemInfo] = useState();//State for saving and sending the user selected item information 

  const[isAddItem,setIsAddItem] = useState(false);//State for check whether click the add item button or not
  const[isSelectUserItem,setIsSelectUserItem] = useState(false);//State for check whether click the user item on the list or not

  const[selectedListItemNavMenu,setSelectedListItemNavMenu] = useState(1);//State for check whether click the user item on the nAV menu
  const{email,username,userId} = location.state || {};
  const toggleDrawer = () => {
    setOpen(!open);
  };

  /**Check for the User data from the login page */
  useEffect(() => {
    try {
        getItems(userId);
    } catch (error) {
      console.log(error);
    }
  }, [userId]); 
  
  /**Function for get the item list based on the userId */
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
      console.log(error);

    }
  }

  /**When user click the specific item(get a new value in selectUserItemID), Call the getItemInfo API */
  useEffect(()=>{
    try{
      getItemInfoUserItemID(userId,selectUserItemID);

    }catch(error){
      console.log("useEffect based on selectUserItemID is error :" + error);
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
      console.log("getItemInfo api Error: " + error);
    }
  }

  /**Function for check which list item is selected by user on the Nav Menu*/
  const getSelectListItem = (UserSelectedList) =>{
    setSelectedListItemNavMenu(UserSelectedList);
  } 

  /**Function for get the user selected  user item id */
  const getSelectUserItemID = (selectedID) =>{
    setSelectUserItemID(selectedID);
    setIsSelectUserItem(true);
    setIsAddItem(false);
  } 

  /**Function for get the user selected item id */
  const getSelectUserFridgeID = (selected) =>{
    setSelecFridgeID(selected);
    setIsSelectUserItem(true);
    setIsAddItem(false);
  } 

//Function for get the selected item id
const getSelectItemID = (selected) =>{
  setSelecItemID(selected);
  setIsSelectUserItem(true);
  setIsAddItem(false);
}

/**Method that update isSelectUserItem and isAddItem after delete the item */
const handleAfterAddDeleteItem=(input)=>{

  if(input === true){
    setIsAddItem(false);
    setIsSelectUserItem(false);
  }

}

  /**Method that update the IsAddItem when user click the add item button */
  const handleAddItemClick=()=>{
    setIsAddItem(true);
    setIsSelectUserItem(false);

  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ bgcolor: "white", color:"orange" }}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
            
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <p class="font-orange">FRIDGE <a class="font-white">MASTER</a></p>
             
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
          </Search>
          {/**Edit Please:: Please add the accountCircleIcon and implement the setting pages */}
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <AccountCircleIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              bgcolor: "orange",

            }}
          >
            <IconButton onClick={toggleDrawer}  sx={{ bgcolor: "orange", color:"white"}}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <List  component="nav" sx={{ bgcolor: "orange", color:"white" }}>
            {mainListItems({getSelectListItemFunction: getSelectListItem })}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>
              {/* User Item List  */}

              <Grid item xs={6} md={6} lg={5}>
              <Paper
                  sx={{
                    p: 2,
                    display: 'block',/**  Get the space whether the size of the child components  */
                    flexDirection: 'column',
                    minHeight: '85vh',
                    maxHeight: '85vh',
                    overflow: 'auto'
                 
                 
                  }}
                >

                  {/**Conditonal Rendering  
                   * If the user click the List(selectedListItem = 1), Display the <UserItem></UserItem> and <ActionButton></ActionButton>
                   * If the user click the Setting(selectedListItem = 3), Display the components
                  */}
            
                  {selectedListItemNavMenu === 1 ? (
                      <>
                                    
                        {userItemList.map((el) =>(
                          <UserItem 
                          /**Pass the data for user item  */
                            UserItemID={el.UserItemID} 
                            ItemID={el.ItemID}
                            FridgeID={el.FridgeID}
                            UserFridgeID={el.UserFridgeID} 
                            CategoryImageID={el.CategoryImageID} 
                            ItemName={el.ItemName} 
                            Quantity={el.Quantity} 
                            ExpiryDate={el.ExpiryDate}
                          
                            /*Pass the function for setting the selected user item id and fridge id*/ 
                            getSelectUserItemIDFunction={getSelectUserItemID}
                            getSelectUserFridgeIDFunction={getSelectUserFridgeID}
                            getSelectItemIDFunction={getSelectItemID}
                           
                            /**Pass the userId for connecting API  */
                            userId = {userId}
                            
                            /> 
                        ))
                      }

                      {/*Button about Main Action such as add,save and delete*/}   
                      <div className='actionBtn-wrap' onClick={handleAddItemClick}>
                        <ActionButton className='actionBtn' ActionName = "Add Item" />
                      </div>   
                      </>


                    ):(
                      selectedListItemNavMenu === 2 ? (
                        <h6>You click 2</h6>
  
                      ):(
                        <h6>You click 3</h6>
                        //Setting Components
                      )

                    )}
                  
  
   
                </Paper>
              </Grid>
              {/* Item Detail Page */}
              <Grid item xs={6} md={6} lg={7}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '85vh',
                    maxHeight: '85vh',
                  }}
                >
                {/**Conditonal Rendering  
                   * If the user click the List(selectedListItem = 1), Display the <Empty/> or <ItemDetail/>
                   * If the user click the Setting(selectedListItem = 3), Display the components
                  */}
            
                  {
                    selectedListItemNavMenu === 1 ? (
                      <>
                        {
                          /**If the user didn't click the add item button and didn't click the specific item on the list, Show Empty component */
                          (!isAddItem && !isSelectUserItem)?(
                            <Empty/>
                          ): (
                            /**If the suer click the add item button without click the item on the list, 
                             * User can add the information about item directley
                             */
                            isAddItem && !isSelectUserItem ?(
                              <ItemDetail 
                                userId={userId} 
                                selectFridgeIDFromUser={selectFridgeID}
                                selectItemID={selectItemID} 
                                selectUserItemID={selectUserItemID}
                                handleAfterAddDeleteItemFunction ={handleAfterAddDeleteItem}
                                />

                            ):(

                            /**If a specific item is selected, show item detail page including that item information
                             * User can check the item's info and update that info 
                             */
                            
                                  <>
                                      <ItemDetail 
                                        userId={userId} 
                                        selectFridgeIDFromUser={selectFridgeID} 
                                        selectItemID={selectItemID} 
                                        selectUserItemID={selectUserItemID}
                                        selectedItemInfo={selectedItemInfo} 
                                        handleAfterAddDeleteItemFunction ={handleAfterAddDeleteItem}
                                        /> {/**Pass the userid and userSelectItem from useritem */}

                                  
                                  </>
                              
                            )
                          )
                        }
                      </>


                    ):(
                      selectedListItemNavMenu === 2 ? (
                        <h6>You click 2</h6>
  
                      ):(
                        <h6>You click 3</h6>
                        //Setting Components
                      )

                    )}
                  {/**Conditonal Rendering */}


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
