import React from 'react';

import EmployeeForm from './EmployeeForm'

import {Grid, TextField, Paper, Card} from "@material-ui/core"
import { makeStyles } from '@material-ui/styles';
const Employees = () => {


    // const useStyle = makeStyles(theme=>(
    //     {
    //         gridAlign: {
    //             pageContent: {
    //                 margin: theme.spacing(5),
    //                 padding: theme.spacing(3)
    //             }
    //         }
    //     }
    // ))


    // const classes = useStyle()

    return (

            <div>
                <EmployeeForm/>
            </div>
    );
};

export default Employees;
