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
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { mainListItems} from './listItems';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate} from 'react-router-dom';
/**Components in the Dashboard */
import UserItem from '../../components/list-components/UserItem';
import ItemDetail from '../../components/list-components/ItemDetail';
import Empty from '../../components/Empty';
import ActionButton from '../../components/ActionButton';

import Copyright from '../../components/Copyright';
import axios from 'axios';




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
  const[userSelectItem,setUserSelectItem] =useState(); //State for saving the user selected item id. 
  const[isAddItem,setIsAddItem] = useState(false);//State for check whether click the add item button or not
  const[isSelectUserItem,setIsSelectUserItem] = useState(false);//State for check whether click the user item on the list or not
  const[selectedListItem,setSelectedListItem] = useState(1);//State for check whether click the user item on the list or not
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

  /**Function for check which list item is selected by user */
  const getSelectListItem = (UserSelectedList) =>{
    setSelectedListItem(UserSelectedList);
  } 

  /**Function for get the user selected item id */
  const getSelectUserID = (selectedID) =>{
    setUserSelectItem(selectedID);
    setIsSelectUserItem(true);
    setIsAddItem(false);
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
            
                  {
                    selectedListItem === 1 ? (
                      <>
                        <h6>You click 1</h6>                    
                        {userItemList.map((el) =>(
                          <UserItem 
                          /**Pass the data for user item  */
                            UserItemID={el.UserItemID} 
                            ItemID={el.ItemID}
                            UserFridgeID={el.UserFridgeID} 
                            CategoryImageID={el.CategoryImageID} 
                            ItemName={el.ItemName} 
                            Quantity={el.Quantity} 
                            ExpiryDate={el.ExpiryDate}
                            /*Pass the function for setting the selected user item id*/ 
                            getSelectUserIDFunction={getSelectUserID}
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
                      selectedListItem === 2 ? (
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
                  {/**Conditonal Rendering */}
                  {
                    /**If the user didn't click the add item button and didn't click the specific item on the list, Show Empty component */
                    (!isAddItem && !isSelectUserItem)?(
                      <Empty/>
                    ): (
                      /**If the suer click the add item button without click the item on the list, 
                       * User can add the information about item directley
                       */
                      isAddItem && !isSelectUserItem ?(<ItemDetail userId={userId} />

                      ):(

                      /**If a specific item is selected, show item detail page including that item information
                       * User can check the item's info and update that info 
                       */
                        <ItemDetail userId={userId} />
                      )
                    )
                  }

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
