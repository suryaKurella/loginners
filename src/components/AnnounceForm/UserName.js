import React, {useContext} from 'react';
import {Input} from "../../Pages/utils/Input";
import IconAdornmentField from "../../Pages/utils/IconAdornmentField";
import PersonIcon from "@mui/icons-material/Person";
import {Controller, useFormContext} from "react-hook-form";


const UserName = () => {
    const {control, register, formState: {errors}} = useFormContext();

    return (
        <Controller
            control={control}
            name="userName"
            render={({field}) => {
                return (
                    <Input
                        label={'User Name'}
                        InputProps={{
                            startAdornment: (
                                <IconAdornmentField>
                                    <PersonIcon/>
                                </IconAdornmentField>
                            )
                        }}
                        {...register("userName")}
                        error={!!errors.userName}
                        helperText={errors?.userName?.message}
                    />
                )
            }}
        />
    );
};

export default UserName;
