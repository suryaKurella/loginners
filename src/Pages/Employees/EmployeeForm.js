import React, {useState} from 'react';
import {Grid, TextField, makeStyles} from "@material-ui/core"


const EmployeeForm = () => {

    const useStyle = makeStyles(theme => (
        {
            root: {
                '& .MuiInputBase-root': {
                    width: '80%',
                    margin: theme.spacing(1)
                }
            }
        }
    ))

    const initialValues = {
        id: 0,
        fullName: '',
        email: '',
        mobile: '',
        city: '',
        gender: 'male',
        departmentId: '',
        hireDate: new Date(),
        isPermanent: false

    }

    const [values, setValues] = useState(initialValues)
    const classes = useStyle()

    const handleInputChange = (e) => {

        const {name, value} = e.target
        setValues({
            ...values,
            [name]:value


        })

        console.log(name)
    }

    return (
        <form className={classes.root}>
            <Grid Container>
                <Grid item xs={6}>
                    <TextField
                        variant={"outlined"}
                        label={"Full Name"}
                        name={'fullName'}
                        value={values.fullName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant={"outlined"}
                        label={"Email"}
                        name={'email'}
                        value={values.email}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>

                </Grid>

            </Grid>

        </form>
    );
};

export default EmployeeForm;
