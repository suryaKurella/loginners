import React, {useContext, useEffect, useReducer, useState} from 'react';
import classes from '../StyleSheets/AnnouncementPage.module.css'
import greenImg from 'D://Surya//Software LEarning//loginners//src//UI//images//green.jpeg';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
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
    FormLabel,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio, Checkbox, Modal,

} from '@material-ui/core'

import {makeStyles} from '@material-ui/styles';
import {useForm, Controller} from 'react-hook-form'
import ChooseBotsPublish from './ChooseBotsPublish'


import filers from '../StyleSheets/FormStyleSheet.module.css'
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@mui/material/Box";
import ModalAnnouncePage from "./ModalAnnouncePage";
import Loginreducer from "../../reducers/Loginreducer";

import {useAuth} from '../../contexts/AuthContext'
import AnnouncePageReducer from "../../reducers/AnnouncePageReducer";
import DatePickerFunc from "../Employees/DatepickerFunc";
import {StoreContext} from '../../contexts/MobxStoreContext';
import GridUtilFormCommon from "../utils/GridUtilFormCommon";
import {yupResolver} from "@hookform/resolvers/yup";

import * as yup from 'yup'
import {Input} from "../utils/Input";
import IconAdornmentField from "../utils/IconAdornmentField";
import {PrimaryButton} from "../utils/PrimaryButton";
import {useObserver} from "mobx-react";


const schema = yup.object().shape({
    userName:
        yup.string().matches(/^([^0-9]*)$/, "User Name should not contain numbers")
            .required("Please enter your User Name"),
    message:
        yup.string().required("Please enter your message")
})

const EmployeeForm = () => {
    const store = React.useContext(StoreContext);

    console.log(`bugs = ${store.bugs} and message = ${store.message}`)

    const {register, handleSubmit, formState: {errors}, control} = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    })

    // const [state, dispatch] = useReducer(AnnouncePageReducer, initialState)
    // let {email, error, loading, isLoggedIn, password, isScheduleLater} = state

    // const [name, setName] = useState('')
    // const [message, setMessage] = useState('')

    // const [nameError, setNameError] = useState(false)
    const [isMessageError, setIsMessageError] = useState(false)
    const [isFileUpload, setIsFileUpload] = useState(false)


    // const [isScheduleLater, setIsScheduleLater] = useState(false)


    const [isSlackAuthDB, setIsSlackAuthDB] = useState(false)
    const [isTwitterAuthDB, setIsTwitterAuthDB] = useState(true)
    const [isTeamsAuthDB, setIsTeamsAuthDB] = useState(false)


    // These flags needs to be updated to DB once these get updated by
    // const [isSlackChecked, setIsSlackChecked] = useState(false)
    // const [isTwitterChecked, setIsTwitterChecked] = useState(false)
    // const [isTeamsChecked, setIsTeamsChecked] = useState(false)

    let [slackCheckBoxFlag, twitterCheckBoxFlag, teamsCheckBoxFlag] = [false, false, false]


    const useStyle = makeStyles(theme => (
        {
            field: {
                marginTop: 20,
                marginBottom: 20,
                display: 'block'
            },
            // input: {
            //     color: "white"
            // },
            outlineColor: {
                border: ' 2px solid green'
            },
            submitBtn: {
                display: 'block'
            },
            scheduler: {
                display: 'block'
            },
            paperContainer: {
                // border: "1px solid",
                // padding: "10px",
                // boxShadow: "5px 10px black"
                // backgroundImage: `url(https://i.pinimg.com/originals/0c/f5/d3/0cf5d3ed289c82a21407845377159ac2.gif)`,
                // backgroundRepeat: "no-repeat",
                // backgroundPosition: "center center",
                // backgroundSize: "cover",
                // backgroundAttachment: "fixed",
                // backgroundImage: `url(${greenImg})`
            }

        }
    ))


    const BotsCheckBoxHandler = (toBeReturnedFlags) => {

        slackCheckBoxFlag = toBeReturnedFlags["slackCheckBoxFlag"]
        twitterCheckBoxFlag = toBeReturnedFlags["twitterCheckBoxFlag"]
        teamsCheckBoxFlag = toBeReturnedFlags["teamsCheckBoxFlag"]
    }

    const stylers = useStyle()

    const {userName, message} = store

    console.log(`userName = ${userName} and message = ${message}`)

    return useObserver(() =>
        <Grid container
              direction={'row'}
              alignContent={'center'}
              justifyContent={'center'}
        >

            <GridUtilFormCommon>
                <Card className={`${classes.announcePageImage}`}/>
            </GridUtilFormCommon>


            <GridUtilFormCommon>
                <Paper
                    className={`p-4 ${stylers.paperContainer} ${classes['card-announce']}`}
                    variant={'elevation'}
                    elevation={24}
                >

                    <form className={`${stylers.alignItemsAndJustifyContent}`} noValidate autoComplete={'off'}
                          onSubmit={handleSubmit((data) => {
                              console.log(data)
                              console.log("MESSAGE")
                              console.log(data["message"])
                              setIsMessageError(false)
                              let uploadFileName = ''


                              const message_roll = data["message"]

                              try {
                                  console.log("Message Roll = ", message_roll)
                                  uploadFileName = data["uploadableFiles"][0]["name"]
                                  console.log("Uploaded File Nmae = ", uploadFileName)
                                  setIsFileUpload(true)
                              } catch (err) {
                                  console.log("No File Uploaded")
                                  uploadFileName = ''
                                  setIsFileUpload(false)
                              }

                              {
                                  console.log(`isFileUpload = ${isFileUpload}`)
                              }

                              if (!uploadFileName && !message_roll) {
                                  setIsMessageError(true)
                              }


                              console.log("In Handler Submitter slackCheckBoxFlag =  ", slackCheckBoxFlag)
                              console.log("In Handler Submitter twitterCheckBoxFlag =  ", twitterCheckBoxFlag)
                              console.log("In Handler Submitter teamsCheckBoxFlag =  ", teamsCheckBoxFlag)


                          })}>

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


                        <Controller
                            control={control}
                            name="message"
                            render={({field}) => {
                                return <Input
                                    label={'Message'}
                                    multiline
                                    rows={4}
                                    InputProps={{
                                        startAdornment: (
                                            <IconAdornmentField>
                                                <MessageIcon/>
                                            </IconAdornmentField>
                                        )
                                    }}
                                    {...register("message")}
                                    error={!!errors.message}
                                    helperText={errors?.message?.message}
                                    onChange={e => store.message = e.target.value
                                    }
                                />
                            }}


                        />


                        <TextField
                            // className={`${stylers.field}`}
                            id={"my-file"}
                            type="file"
                            name="picture"
                            {...register('uploadableFiles',)}
                            // error={isMessageError}
                            // helperText={isMessageError?"Either Message or a multi media file is Required":""}
                            hidden
                        />


                        <Grid
                            // container
                            direction={'row'}
                            alignContent={'center'}
                            justifyContent={'center'}
                        >
                            <Paper>
                                <InputLabel
                                    className={`${filers.fileUploadBtn} text-center`}
                                    for="my-file"
                                    variant={"contained"}

                                    // style={{backgroundColor: '#0d0f53', color: '#FFFFFF'}}
                                    // color={"secondary"}


                                >
                                    Upload Media
                                </InputLabel>

                            </Paper>

                        </Grid>


                        {/*<InputLabel*/}
                        {/*    className={filers.fileUploadBtn}*/}

                        {/*    variant={"standard"}*/}

                        {/*>Please CLick ME</InputLabel>*/}


                        <DatePickerFunc/>
                        {/*<FormControl className={`mt-2 pb-3`} component="fieldset">*/}
                        {/*    <FormLabel component="legend">Schedule Your Broadcast</FormLabel>*/}
                        {/*    <Controller*/}
                        {/*        rules={{required: true}}*/}
                        {/*        control={control}*/}
                        {/*        defaultValue="business"*/}
                        {/*        name="Scheduler"*/}
                        {/*        render={({field}) => {*/}
                        {/*            const {name, onBlur, onChange, value} = field;*/}
                        {/*            return (*/}
                        {/*                <RadioGroup*/}
                        {/*                    value={value}*/}
                        {/*                    onBlur={onBlur}*/}
                        {/*                    onChange={(e) => {*/}
                        {/*                        onChange(e);*/}
                        {/*                        console.log(e.target.value);*/}
                        {/*                        dispatch({type: 'IS_SCHEDULE_FALSE'})*/}
                        {/*                        // setIsScheduleLater(false)*/}
                        {/*                        if (e.target.value === "Schedule for later") {*/}
                        {/*                            // setIsScheduleLater(true)*/}
                        {/*                            dispatch({type: 'IS_SCHEDULE_TRUE'})*/}
                        {/*                        }*/}

                        {/*                    }}*/}
                        {/*                >*/}
                        {/*                    <FormControlLabel*/}
                        {/*                        value="BroadCast right now"*/}
                        {/*                        control={<Radio/>}*/}
                        {/*                        label="BroadCast right now"*/}
                        {/*                    />*/}
                        {/*                    <FormControlLabel*/}
                        {/*                        value="Schedule for later"*/}
                        {/*                        control={<Radio/>}*/}
                        {/*                        label="Schedule for later"*/}
                        {/*                    />*/}

                        {/*                </RadioGroup>*/}
                        {/*            );*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</FormControl>*/}

                        {/*{isScheduleLater ?*/}
                        {/*    <div>*/}
                        {/*        <MuiPickersUtilsProvider utils={DateFnsUtils}>*/}


                        {/*            <Controller*/}

                        {/*                render={({*/}
                        {/*                             field: {onChange, onBlur, value, name, ref},*/}
                        {/*                         }) => (*/}
                        {/*                    <KeyboardDateTimePicker*/}
                        {/*                        minDate={new Date()}*/}
                        {/*                        margin={"normal"}*/}
                        {/*                        label={"Select Date & Time"}*/}
                        {/*                        value={value}*/}
                        {/*                        onChange={onChange}*/}
                        {/*                    />*/}
                        {/*                )}*/}
                        {/*                name={'date_schedule'}*/}
                        {/*                defaultValue={null}*/}
                        {/*                control={control}*/}
                        {/*            />*/}

                        {/*        </MuiPickersUtilsProvider>*/}
                        {/*    </div>*/}
                        {/*    : ""}*/}


                        {/*<FormGroup>*/}
                        {/*    <FormControlLabel control={<Checkbox defaultChecked/>} label="Label"/>*/}
                        {/*    <FormControlLabel disabled control={<Checkbox/>} label="Disabled"/>*/}
                        {/*</FormGroup>*/}


                        {/*<DatePickerFunc/>*/}


                        <ChooseBotsPublish
                            onFlagSender={BotsCheckBoxHandler}
                            authFlags={{isSlackAuthDB, isTwitterAuthDB, isTeamsAuthDB}}


                        />


                        {/*<FormControl component="fieldset">*/}
                        {/*    <FormLabel component="legend">Please Choose the platform you want the message to be*/}
                        {/*        broadcasted</FormLabel>*/}
                        {/*    <FormGroup aria-label="position" row>*/}


                        {/*        <FormControlLabel*/}
                        {/*            value={{valueAsBoolean: true}[0]}*/}
                        {/*            control={<Checkbox/>}*/}
                        {/*            label="Slack"*/}
                        {/*            labelPlacement="slack"*/}
                        {/*            {...register("SLACK_FLAG")}*/}
                        {/*        />*/}
                        {/*        <FormControlLabel*/}
                        {/*            value={{valueAsBoolean: true}[0]}*/}
                        {/*            control={<Checkbox/>}*/}
                        {/*            label="Teams"*/}
                        {/*            labelPlacement="teams"*/}
                        {/*            {...register("TEAMS_FLAG")}*/}
                        {/*        />*/}
                        {/*        <FormControlLabel*/}
                        {/*            value={{valueAsBoolean: true}[0]}*/}
                        {/*            control={<Checkbox/>}*/}
                        {/*            label="Twitter"*/}
                        {/*            labelPlacement="twitter"*/}
                        {/*            {...register("TWITTER_FLAG")}*/}
                        {/*        />*/}

                        {/*    </FormGroup>*/}


                        {/*</FormControl>*/}


                        <PrimaryButton type={'submit'}>
                            Submit
                        </PrimaryButton>


                        <ModalAnnouncePage/>


                    </form>
                </Paper>
            </GridUtilFormCommon>


        </Grid>
    );
};

export default EmployeeForm;
