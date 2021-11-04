import React from 'react';

import EmployeeForm from './EmployeeForm'

import {Grid, TextField, Paper, Card} from "@material-ui/core"
import {makeStyles} from '@material-ui/styles';
import {StoreContext} from "../../contexts/MobxStoreContext";
import StoreProvider from "../../contexts/MobxStoreContext";

const Employees = () => {


    return (

        <StoreProvider>
            <EmployeeForm/>
        </StoreProvider>
    );
};

export default Employees;
