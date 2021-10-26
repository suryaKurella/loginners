import React from 'react';
import {Typography, TextField, Box} from "@material-ui/core";
import classes from '../UI/StyleSheets/FrontPageContent.module.css'

const FrontPageContent = () => {
    return (
        <div>

            <div className={classes['iconStyler-1']}>
                <img src="https://img.icons8.com/color/48/000000/slack-new.png"/>
            </div>
            <div className={classes['iconStyler-2']}>
                <img src="https://img.icons8.com/color/48/000000/twitter-circled--v2.png"/>
            </div>
            <div className={classes['iconStyler-3']}>
                <img src="https://img.icons8.com/fluency/48/000000/microsoft-teams-2019.png"/>
            </div>

            <Typography variant="h3" color="text.secondary">

                <div className={`${classes.frontPageDesc} `}>
                    A One Stop Solution for your
                </div>
                <div className={`${classes['frontPageDesc-bottom']}`}>
                    Broadcasting
                </div>

            </Typography>


        </div>
    );
};

export default FrontPageContent;
