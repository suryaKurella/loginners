import React, {useContext} from 'react';
import {Input} from "../../Pages/utils/Input";
import {capitalizeFirstLetter} from "../../Pages/utils/CommonFunctions";
import IconAdornmentField from "../../Pages/utils/IconAdornmentField";
import MessageIcon from "@mui/icons-material/Message";
import {Controller, useFormContext} from "react-hook-form";
import {StoreContext} from "../../contexts/MobxStoreContext";

const Message = ({message}) => {

    const {control, register, formState: {errors}} = useFormContext();
    const store = useContext(StoreContext)


    return (
        <Controller
            control={control}
            name={message}
            render={({field}) => {
                return <Input
                    label={capitalizeFirstLetter(message)}
                    multiline
                    rows={4}
                    InputProps={{
                        startAdornment: (
                            <IconAdornmentField>
                                <MessageIcon/>
                            </IconAdornmentField>
                        )
                    }}
                    {...register(message)}
                    error={!!errors.message}
                    helperText={errors?.message?.message}
                    onChange={e => store.message = e.target.value
                    }
                />
            }}
        />
    );
};

export default Message;
