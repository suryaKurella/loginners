import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from "@material-ui/core/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import classes from "../../UI/StyleSheets/Card.module.css";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FaBeer } from 'react-icons/fa';
export default function AppBarr() {

    const history = useHistory()
    const {logout, currentUser} = useAuth()

    const handleClick = () => {


        history.push("/")
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="flex"
                    style={{
                        backgroundColor: '#000000',
                        color: 'white',
                        width: '100vw'
                        // backgroundImage:url('http://i.stack.imgur.com/kx8MT.gif');
                    }}
            >
                <Toolbar>


                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                        {/*<AccountCircleIcon/>*/}
                    </IconButton>

                    <div className={'d-inline'} onClick={handleClick}>

                        <Typography className={'d-inline'} variant="h6" color="inherit" component="div">
                            1
                        </Typography>
                        <Typography className={'d-inline'} variant="h6" color="red" component="div">
                            A
                        </Typography>
                        <Typography className={'d-inline'} variant="h6" color="inherit" component="div">
                            nnounce
                        </Typography>
                    </div>


                    <Tabs

                    >
                        <FaBeer/><Tab value="About" label="About"/>

                        <Tab value="announcePage" label="Broadcast"/>


                    {/*<Button variant="h6" color="inherit" component="div"*/}
                    {/*        style={{backgroundColor: 'green'}}*/}
                    {/*>*/}
                    {/*    About*/}
                    {/*</Button>*/}


                        {currentUser &&

                        <div>
                            <IconButton

                                edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                                <LogoutIcon/>
                                {/*<AccountCircleIcon/>*/}
                            </IconButton>

                            <Button variant={'outlined'}
                                    className={'text-white bg bg-danger text-center'}
                                    type={'button'}

                                    onClick={async () => {

                                        try {
                                            await logout();
                                            history.push("/signup")

                                        } catch (err) {
                                            console.error(err)
                                        }

                                    }}>Logout
                            </Button>
                        </div>
                        }
                    </Tabs>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
