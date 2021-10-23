import React from 'react';

import EmployeeForm from './EmployeeForm'

import {Grid, TextField, makeStyles, Paper} from "@material-ui/core"

const Employees = () => {


    const useStyle = makeStyles(theme=>(
        {
            pageContent:{
                margin:theme.spacing(5),
                padding: theme.spacing(3)
            }
        }
    ))


    const classes = useStyle()

    return (
        <div>

            <Paper className={classes.pageContent}>
                <EmployeeForm/>
            </Paper>

        </div>
    );
};

export default Employees;
