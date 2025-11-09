import { Group } from "@mui/icons-material";
import { AppBar, Box, Container, LinearProgress, MenuItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../Lib/hooks/useStore";
import { Observer } from "mobx-react-lite";

export default function NavBar() {
    const {uiStore} = useStore();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" 
            sx={{
                backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)',
                position: 'relative'
            }}
        >
                <Container maxWidth='xl'>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Box>
                            <MenuItem component={NavLink} to='/' sx={{display: 'flex', gap: 2}}>
                                <Group fontSize="large"/>
                                <Typography variant="h4" fontWeight='bold'>BAUST ACTIVITIES</Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{display: 'flex'}}>
                            <MenuItemLink to='/activities'>
                                Activities
                            </MenuItemLink>

                            <MenuItemLink to='/createActivity'>
                                Create Activity
                            </MenuItemLink>
                             
                        </Box>
                        <MenuItem>
                            User Menu
                        </MenuItem>
                    </Toolbar>
                </Container>

                <Observer>
                    {() => uiStore.isLoading ? (
                        <LinearProgress
                            color="secondary"
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 4
                            }}
                        />
                    ) : null}
                </Observer>

            </AppBar>
        </Box>
    )
}





// import { Group, Add, Logout, Person } from "@mui/icons-material";
// import { AppBar, Box, Container, Toolbar, Typography, Button, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
// import { NavLink } from "react-router";
// import { useState } from "react";
// import RegisterForm from "./RegisterForm";
// import LoginForm from "./LoginForm";


// export default function NavBar() {
//   const [stage, setStage] = useState<"register" | "login" | "loggedIn">("register");
//   const [user, setUser] = useState<{name: string; email: string} | null>(null);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   const open = Boolean(anchorEl);
//   const handleUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
//   const handleCloseMenu = () => setAnchorEl(null);
//   const handleLogout = () => {
//     setUser(null);
//     setStage("login");
//     handleCloseMenu();
//   }

//   return (
//     <>
//       {stage === "register" && (
//         <RegisterForm 
//           onRegister={data => setStage("login")} 
//           onClose={() => setStage("login")} 
//         />
//       )}

//       {stage === "login" && (
//         <LoginForm 
//           onLogin={data => {setUser(data); setStage("loggedIn")}} 
//           onClose={() => {}} 
//         />
//       )}

//       {stage === "loggedIn" && (
//         <Box sx={{ flexGrow: 1 }}>
//           <AppBar position="static" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)', position: 'relative' }}>
//             <Container maxWidth='xl'>
//               <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
//                 <Box>
//                   <Button component={NavLink} to='/' sx={{display: 'flex', gap: 2, color: 'white'}}>
//                     <Group fontSize="large" />
//                     <Typography variant="h4" fontWeight='bold'>BAUST ACTIVITIES</Typography>
//                   </Button>
//                 </Box>

//                 <Box sx={{display: 'flex', gap: 2}}>
//                   <Button component={NavLink} to='/activities' color="inherit">Activities</Button>
//                   <Button component={NavLink} to='/createActivity' color="inherit">Create Activity</Button>
//                   <Button component={NavLink} to='/counter' color="inherit">Counter</Button>
//                 </Box>

//                 <Box>
//                   <Button color="inherit" onClick={handleUserMenu}>
//                     {user?.name}
//                   </Button>
//                   <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
//                     <MenuItem>
//                       <ListItemIcon><Person /></ListItemIcon>
//                       <ListItemText>{user?.name}</ListItemText>
//                     </MenuItem>
//                     <MenuItem>
//                       <ListItemIcon><Person /></ListItemIcon>
//                       <ListItemText>{user?.email}</ListItemText>
//                     </MenuItem>
//                     <MenuItem onClick={handleLogout}>
//                       <ListItemIcon><Logout /></ListItemIcon>
//                       <ListItemText>Logout</ListItemText>
//                     </MenuItem>
//                   </Menu>
//                 </Box>
//               </Toolbar>
//             </Container>
//           </AppBar>
//         </Box>
//       )}
//     </>
//   )
// }
