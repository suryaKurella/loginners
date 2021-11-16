import React, {useContext} from 'react';
import {Input} from "../../Pages/utils/Input";
import IconAdornmentField from "../../Pages/utils/IconAdornmentField";
import PersonIcon from "@mui/icons-material/Person";
import {Controller, useFormContext} from "react-hook-form";
import {StoreContext} from "../../contexts/MobxStoreContext";


const UserName = () => {
    const {control, register, formState: {errors}} = useFormContext();
    const store = useContext(StoreContext)

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
                        onChange={e => store.userName = e.target.value}
                    />
                )
            }}
        />
    );
};

export default UserName;
