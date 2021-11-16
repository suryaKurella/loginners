import React from 'react';
import {
    FormControl,
    FormLabel, RadioGroup, FormControlLabel, Radio
} from '@material-ui/core'
import {
    MuiPickersUtilsProvider, KeyboardDateTimePicker,
} from '@material-ui/pickers';
import {Controller, useFormContext} from 'react-hook-form'
import DateFnsUtils from '@date-io/date-fns';
import {StoreContext} from '../../contexts/MobxStoreContext';
import {useObserver} from "mobx-react";

const DatePickerFunc = () => {

    const {control} = useFormContext();

    const store = React.useContext(StoreContext);

    return useObserver(() =>
        <form>
            <FormControl className={`mt-2 pb-3`} component="fieldset">
                <FormLabel component="legend">Schedule Your Broadcast</FormLabel>
                <Controller
                    render={({field}) => {
                        const {name, onBlur, onChange, value} = field;
                        return (
                            <RadioGroup aria-label="scheduler" {...field}

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
                                    label="Schedule for later"/>
                            </RadioGroup>
                        )
                    }}
                    name="Scheduler"
                    control={control}
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
