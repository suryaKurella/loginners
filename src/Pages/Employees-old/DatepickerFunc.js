import React, {useState} from 'react';
import {Grid,Paper, TextField, Card ,  Typography, Button, Container, InputLabel} from '@material-ui/core'

import {

    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateAdapter from '@mui/lab/AdapterMoment';
// import DateAdapter from '@mui/lab/AdapterLuxon';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib

const DatePickerFunc = () => {
    const [selectedDate, handleDateChange] = useState(new Date());

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <DateTimePicker value={selectedDate} onChange={handleDateChange} />
            </MuiPickersUtilsProvider>

            <LocalizationProvider dateAdapter={DateAdapter} >
                <DatePicker
                    value={new Date()}
                    onChange={console.log}
                    renderInput={(props) => (
                        <TextField {...props} helperText="valid mask" />
                    )}
                />


            </LocalizationProvider>

        </div>

    );
};

export default DatePickerFunc;
