import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Col, Container, Row} from 'react-bootstrap'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from "@material-ui/core/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import classes from "../../UI/StyleSheets/Card.module.css";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SpeakerPhoneIcon from '@mui/icons-material/SpeakerPhone';
import InfoIcon from '@mui/icons-material/Info';
import {FaBeer} from 'react-icons/fa';

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


                    {/*<Tabs*/}
                    {/*    fullWidth={true}*/}


                    {/*>*/}
                    {
                        currentUser &&
                        <Container className={'text-center'}>
                            <Row>
                                <Col sm ={4} md={3}>
                                    <Tab icon=<InfoIcon/> value="About" label="About"/>
                                </Col>

                                <Col sm ={4} md={3}>
                                    <Tab icon=<SpeakerPhoneIcon/> value="announcePage" label="Broadcast"/>
                                </Col>

                                <Col sm ={4} md={6}>


                                        <Tab
                                            icon={<LogoutIcon/>}
                                            value="Logout"
                                            label="Logout"
                                            onClick={async () => {

                                                try {
                                                    await logout();
                                                    history.push("/signup")

                                                } catch (err) {
                                                    console.error(err)
                                                }

                                            }}
                                        />



                                </Col>
                            </Row>
                        </Container>
                    }
                    {/*</Tabs>*/}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
