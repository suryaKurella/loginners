import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@material-ui/core/Button";
import classes from "../../UI/StyleSheets/Card.module.css";
import {useState} from "react";
import {useHistory} from "react-router-dom";

export default function AppBarr() {

    const history = useHistory()

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
                    <Button variant="h6" color="inherit" component="div"
                            style={{position: "relative", right: "300px", left: '75rem', backgroundColor: 'gray'}}>
                        About
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
