import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StorageIcon from '@mui/icons-material/Storage';
import RouterIcon from '@mui/icons-material/Router';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router';
import { Switch } from 'react-router-dom';
import Create from './Create/Create';
import Accounts from './Accounts/Accounts';
import Endpoints from './Endpoints/Endpoints';
import Guide from './Guide/Guide';
import Form from './Create/Form/Form';
import Logout from './Logout/Logout';
import ProtectedRoute from './ProtectedRoute';
import ManageApi from './ManageApi/ManageApi'
// import axios from "axios";
// import { useEffect } from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import UTable from './Create/Table/UTable';
const drawerWidth = 240;

export const UserName = React.createContext();
export const ApiKey = React.createContext();

export default function PermanentDrawerLeft() {

  const [name,changeName]=React.useState("Riddham");
  const [api,changeApi]=React.useState("");
  const history = useHistory();
  const menuItems = [
    {
      text: 'Create database',
      icon: <StorageIcon />,
      path: '/dashboard/create'
    },
    {
      text: 'Get Endpoints',
      icon: <RouterIcon />,
      path: '/dashboard/endpoints'
    },
    {
      text: 'Accounts',
      icon: <AccountCircleIcon />,
      path: '/dashboard/accounts'
    },
    {
      text: 'Manage API',
      icon: <AccountCircleIcon />,
      path: '/dashboard/manageApi'
    },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      path: '/dashboard/logout'
    },
  ]

  // useEffect(() => {
  //   console.log(localStorage.getItem("id"));
  //   if(localStorage.getItem("isAuthenticated"))
  //   axios.post("https://backend-fyp.herokuapp.com/api/frontend/genAuthToken",{
  //       "id": localStorage.getItem("id"),
  //   }).then(
  //       response=>{
  //           console.log(response);
  //           localStorage.setItem("token",response.data.token);
  //           // localStorage.setItem('');
  //           // changeName(response.data.username);
  //           // changeApi(response.body.api);
  //           changeSending(true);
  //       }
  //   ).catch(error=>{console.log(error);changeSending(true)});
// },[])

  return (
    <div>
      <UserName.Provider value={name}>
        <ApiKey.Provider value={api}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
              <Toolbar>
                <Typography variant="h6" noWrap component="div">
                  {name}'s Dashboard
                </Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              variant="permanent"
              anchor="left">
              <Toolbar>
                <h3>{name}</h3>
              </Toolbar>
              <Divider />
              <List>
                {
                  menuItems.map((item) => (
                    <ListItemButton key={item.text} button onClick={() => history.push(item.path)}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  )
                  )
                }
              </List>
            </Drawer>

            <Box
              component="main"
              sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
              <Toolbar />
              <Switch>
                <ProtectedRoute exact path='/dashboard/' component={Guide} />
                <ProtectedRoute exact path='/dashboard/endpoints' component={Endpoints} />
                <ProtectedRoute exact path='/dashboard/create' component={Create} />
                <ProtectedRoute exact path='/dashboard/accounts' component={Accounts} />
                <ProtectedRoute exact path='/dashboard/logout' component={Logout} />
                <ProtectedRoute exact path='/dashboard/form' component={Form} />
                <ProtectedRoute exact path='/dashboard/manageApi' component={ManageApi} />
                {/* <Route exact path="/dashboard/table/:id" component={UTable}/> */}
              </Switch>
            </Box>
          </Box>
        </ApiKey.Provider>
      </UserName.Provider>
    </div>



  );
}
