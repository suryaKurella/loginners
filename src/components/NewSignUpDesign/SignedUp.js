import React, {useRef, useState} from 'react';
import '../../UI/StyleSheets/Signup.css'
import {Container, Row, Col, Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
// import classes from '../UI/StyleSheets/Card.module.css'
import materials from '../../UI/StyleSheets/FormMaterial.module.css'
import classes from '../../Pages/StyleSheets/AnnouncementPage.module.css'

import cardClasses from '../../UI/StyleSheets/generalCard.module.css'
import buttoners from '../../UI/StyleSheets/Buttons.module.css'
import boomer from '../../UI/images/wrote.png'
import Login from '../Login'
import FrontPageContent from '../FrontPageContent'
import AppBar from '../../Pages/utils/AppBar'
import { FormHelperText, Grid, InputLabel, Paper} from "@material-ui/core";
import GridUtilFormCommon from "../../Pages/utils/GridUtilFormCommon";
import {FormProvider} from "react-hook-form";
import UserName from "../AnnounceForm/UserName";
import Message from "../AnnounceForm/Message";
import {FileUploader} from "../../Pages/utils/FileUploader";
import DatePickerFunc from "../../Pages/Employees/DatepickerFunc";
import LogoBots from "../AnnounceForm/LogoBots";
import CheckBoxBots from "../AnnounceForm/CheckBoxBots";
import {PrimaryButton} from "../../Pages/utils/PrimaryButton";
import FormControl from '@mui/material/FormControl';
import {Input} from "../../Pages/utils/Input";
import IconAdornmentField from "../../Pages/utils/IconAdornmentField";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
const Signup = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const userNameRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()

    const [error, setError] = useState('')
    const [signInSuccess, setSignInSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const [isOldUser, setIsOldUser] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(`passwordRef.current.value = ${passwordRef.current.value}`)
        console.log(`passwordConfirmRef.current.value = ${passwordConfirmRef.current.value}`)

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords Do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, userNameRef.current.value)
            setSignInSuccess("Registration Successful! Please move to Sign in Page")
            history.push('/')
        } catch (e) {
            // setError("Failed to create an Account")
            setError("User Already Exists! Please Sign in")
        }
        setLoading(false)
    }


    const loginHandler = () => {

        setIsOldUser(true)

        console.log(isOldUser)

    }

    const signUpHandler = (isSignUpClick) => {

        console.log(`isSignUpClick = ${isSignUpClick}`)

        setIsOldUser(isSignUpClick)

    }

    return (
        <Grid container
              direction={'row'}
              alignContent={'center'}
              justifyContent={'center'}
        >
            <GridUtilFormCommon>
                <Card className={`${classes.frontPageImage}`}
                />
            </GridUtilFormCommon>

            <GridUtilFormCommon>
                <Paper
                    className={`p-4 ${classes['card-announce']}`}
                    variant={'elevation'}
                    elevation={24}
                    style={{maxWidth: '50%'}}
                >
                    {error && <Alert variant={'danger'}>{error}</Alert>}
                    <form noValidate autoComplete={'off'}>

                        <Input
                            label={'User Name'}
                            InputProps={{
                                startAdornment: (
                                    <IconAdornmentField>
                                        <PersonIcon/>
                                    </IconAdornmentField>
                                )
                            }}
                            ref = {userNameRef} required
                        />

                        <Input
                            autoComplete={'off'}
                            label={'Email'}
                            InputProps={{
                                startAdornment: (
                                    <IconAdornmentField>
                                        <EmailIcon/>
                                    </IconAdornmentField>
                                )
                            }}
                            type={'email'}
                            ref = {emailRef} required
                        />
                        <Input
                            label={'Password'}
                            InputProps={{
                                startAdornment: (
                                    <IconAdornmentField>
                                        <VpnKeyIcon/>
                                    </IconAdornmentField>
                                )
                            }}
                            type={'password'}
                            ref = {passwordRef} required
                        />
                        <Input
                            label={'Password Confirmation'}
                            InputProps={{
                                startAdornment: (
                                    <IconAdornmentField>
                                        <VpnKeyIcon/>
                                    </IconAdornmentField>
                                )
                            }}
                            type={'password'}
                            ref = {passwordConfirmRef} required
                        />




                        <PrimaryButton type={'submit'}>
                            Review
                        </PrimaryButton>

                        <div className={'w-100 text-center mt-5 '}>


                            {/*Already have an account ? <Link to={'/login'}>Login</Link>*/}
                            Already have an account ? <Button variant={'outlined'} className={''}
                                                              type={'button'}
                                                              onClick={loginHandler}>Login</Button>
                        </div>


                    </form>
                </Paper>
            </GridUtilFormCommon>

        </Grid>
    )


};

export default Signup;
