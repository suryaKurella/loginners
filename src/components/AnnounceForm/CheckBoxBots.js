import React, {memo} from "react";
import {Controller} from "react-hook-form";
import {Checkbox, FormLabel} from "@material-ui/core";
import formJson from "./Files/formJson";

const formValues = formJson()

const CheckBoxBots = memo(
    ({register, formState: {isDirty}, control}) => (
        <div component="fieldset" className={'d-block mt-3 pb-3'} id={'checkBoxComponent'}>


            <FormLabel component="legend">Please Choose the platform you want the message to be
                broadcasted</FormLabel>
            {
                Object.entries(formValues).map(entry => {
                    const {label} = entry[1]
                    return (
                        <div key={'' + Math.random()} className={'d-inline'}>
                            <section className={'d-inline'}>
                                <Controller
                                    as={Checkbox}
                                    name={label}
                                    type="checkbox"
                                    control={control}
                                    render={({field}) => (
                                        <Checkbox key={'' + Math.random()}
                                                  onChange={(e) => field.onChange(e.target.checked)}
                                                  checked={field.value}
                                        />
                                    )}
                                />
                                <label>{label}</label>
                            </section>
                        </div>
                    )
                })
            }
        </div>
    ),
    (prevProps, nextProps) =>
        prevProps.formState.isDirty === nextProps.formState.isDirty
);

export default CheckBoxBots
