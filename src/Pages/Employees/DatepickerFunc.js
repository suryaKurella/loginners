import React, {useState} from 'react';
import {
    Grid,
    Paper,
    TextField,
    Card,
    Typography,
    Button,
    Container,
    InputLabel,
    FormControl,
    FormLabel, RadioGroup, FormControlLabel, Radio
} from '@material-ui/core'
import {

    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider, KeyboardDateTimePicker,
} from '@material-ui/pickers';
import {useForm} from 'react-hook-form'

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateAdapter from '@mui/lab/AdapterMoment';
// import DateAdapter from '@mui/lab/AdapterLuxon';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import DateFnsUtils from '@date-io/date-fns';
import {Controller} from "react-hook-form"; // choose your lib
import {StoreContext} from '../../contexts/MobxStoreContext';
import {useObserver} from "mobx-react";

const DatePickerFunc = () => {
    const store = React.useContext(StoreContext);
    const {register, handleSubmit, formState: {errors}, control} = useForm()

    return useObserver(() =>
        <form>
            <FormControl className={`mt-2 pb-3`} component="fieldset">
                <FormLabel component="legend">Schedule Your Broadcast</FormLabel>
                <Controller
                    rules={{required: true}}
                    control={control}
                    defaultValue="business"
                    name="Scheduler"
                    render={({field}) => {
                        const {name, onBlur, onChange, value} = field;
                        return (
                            <RadioGroup
                                value={value}
                                onBlur={onBlur}
                                onChange={(e) => {
                                    onChange(e);
                                    console.log(e.target.value);
                                    store.isScheduleLater = false
                                    if (e.target.value === "Schedule for later") {
                                        store.isScheduleLater = true
                                    }
                                }}
                            >
                                <FormControlLabel
                                    value="BroadCast right now"
                                    control={<Radio/>}
                                    label="BroadCast right now"
                                />
                                <FormControlLabel
                                    value="Schedule for later"
                                    control={<Radio/>}
                                    label="Schedule for later"
                                />

                            </RadioGroup>
                        );
                    }}
                />
            </FormControl>

            {store.isScheduleLater ?
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>


                        <Controller

                            render={({
                                         field: {onChange, onBlur, value, name, ref},
                                     }) => (
                                <KeyboardDateTimePicker
                                    minDate={new Date()}
                                    margin={"normal"}
                                    label={"Select Date & Time"}
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                            name={'date_schedule'}
                            defaultValue={null}
                            control={control}
                        />

                    </MuiPickersUtilsProvider>
                </div>
                : ""}
        </form>
    )
};

export default DatePickerFunc;
