import React from 'react';
import {Card, Grid} from "@material-ui/core";
import classes from "../StyleSheets/AnnouncementPage.module.css";

const GridUtilFormCommon = ({children, ...props}) => {
    return (
        <Grid
            container
            direction={'row'}
            // alignContent={'center'}
            justifyContent={'center'}
            item md={6} xs={6} sm={12}
            {...props}
        >
            {children}
        </Grid>
    );
};

export default GridUtilFormCommon
