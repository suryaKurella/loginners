import React, {useEffect, useState} from 'react';
import classes from '../StyleSheets/AnnouncementPage.module.css'


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
    Radio, Checkbox,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles';
import {useForm, Controller} from 'react-hook-form'
import ChooseBotsPublish from './ChooseBotsPublish'

import filers from '../StyleSheets/FormStyleSheet.module.css'
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";


const EmployeeForm = () => {

    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const [nameError, setNameError] = useState(false)
    const [messageError, setMessageError] = useState(false)
    const [fileUploadError, setFileUploadError] = useState(false)

    const {register, handleSubmit, formState: {errors}, control} = useForm()

    const [isScheduleLater, setIsScheduleLater] = useState(false)


    const [isSlackAuthDB, setIsSlackAuthDB] = useState(false)
    const [isTwitterAuthDB, setIsTwitterAuthDB] = useState(true)
    const [isTeamsAuthDB, setIsTeamsAuthDB] = useState(true)


    // These flags needs to be updated to DB once these get updated by
    // const [isSlackChecked, setIsSlackChecked] = useState(false)
    // const [isTwitterChecked, setIsTwitterChecked] = useState(false)
    // const [isTeamsChecked, setIsTeamsChecked] = useState(false)

    let [slackCheckBoxFlag, twitterCheckBoxFlag, teamsCheckBoxFlag] = [false, false, false]


    // console.log(watch())setIsTeamsChecked
    // console.log(errors)

    const useStyle = makeStyles(theme => (
        {
            field: {
                marginTop: 20,
                marginBottom: 20,
                display: 'block'
            },
            input: {
                // color: "white"
            },
            outlineColor: {
                border: ' 2px solid green'
            },
            submitBtn: {
                display: 'block'
            },
            scheduler: {
                display: 'block'
            },
            // alignItemsAndJustifyContent: {
            //     // width: 500,
            //     // height: 80,
            //     // display: 'flex',
            //     alignItems: 'center',
            //     justifyContent: 'center',
            //     // backgroundColor: 'pink',
            // },

        }
    ))




    const BotsCheckBoxHandler = (toBeReturnedFlags) => {

        slackCheckBoxFlag = toBeReturnedFlags["slackCheckBoxFlag"]
        twitterCheckBoxFlag = toBeReturnedFlags["twitterCheckBoxFlag"]
        teamsCheckBoxFlag = toBeReturnedFlags["teamsCheckBoxFlag"]


        // {slackCheckBoxFlag, twitterCheckBoxFlag, teamsCheckBoxFlag} = toBeReturnedFlags

        // console.log("====================================")
        //
        //
        // console.log(`slackCheckBoxFlag = ${slackCheckBoxFlag}`)
        // console.log(`twitterCheckBoxFlag = ${twitterCheckBoxFlag}`)
        // console.log(`teamsCheckBoxFlag = ${teamsCheckBoxFlag}`)
        //
        //
        // // setIsSlackChecked(slackCheckBoxFlag)
        // // setIsTwitterChecked(twitterCheckBoxFlag)
        // // setIsTeamsChecked(teamsCheckBoxFlag)
        //
        //
        // console.log("toBeReturnedFlags = ")
        // console.log(toBeReturnedFlags)
        // console.log(toBeReturnedFlags)

        // console.log("Main Form Flags Updated  = ")
        // console.log(`toBeReturnedFlags length = ${toBeReturnedFlags.length}`)


        // console.log("====================================")

    }

    const stylers = useStyle()


    return (
            <Grid container
                  direction={'row'}
                  alignContent={'center'}
                  justifyContent={'center'}
            >

                <Grid
                    container
                    direction={'row'}
                    alignContent={'center'}
                    justifyContent={'center'}
                    item md={6} xs={6} sm={6}>
                    {/*<Grid item>*/}


                    {/*<div className={`${classes["announce-image"]}`}>xs=8</div>*/}
                    <div className={`${classes.announcePageImage}`}>
                    </div>
                </Grid>

                <Grid
                    className={``}
                    container
                    direction={'row'}
                    alignContent={'center'}
                    justifyContent={'center'}
                    item md={6} xs={6} sm={6}>

                    {/*<Grid item>*/}
                    <Paper
                        className={`p-4`}
                        variant={'elevation'}
                        elevation={17}>

                    <form className={`${stylers.alignItemsAndJustifyContent}`} noValidate autoComplete={'off'}
                          onSubmit={handleSubmit((data) => {
                              console.log(data)
                              console.log("MESSAGE")
                              console.log(data["message"])
                              setMessageError(false)
                              let uploadFileName = ''


                              const message_roll = data["message"]

                              try {
                                  console.log("Message Roll = ", message_roll)
                                  uploadFileName = data["uploadableFiles"][0]["name"]
                                  console.log("Uploaded File Nmae = ", uploadFileName)
                              } catch (err) {
                                  console.log("No File Uploaded")
                                  uploadFileName = ''
                              }

                              if (!uploadFileName && !message_roll) {
                                  setMessageError(true)

                              }


                              console.log("In Handler Submitter slackCheckBoxFlag =  ", slackCheckBoxFlag)
                              console.log("In Handler Submitter twitterCheckBoxFlag =  ", twitterCheckBoxFlag)
                              console.log("In Handler Submitter teamsCheckBoxFlag =  ", teamsCheckBoxFlag)


                              // console.log("UPLOAD NAME ")
                              // console.log(data["uploadableFiles"][0]["name"])

                          })}>

                        <TextField
                            onChange={(e) => setName(e.target.value)}
                            className={`${stylers.field}`}
                            label={'user Name'}
                            variant={'outlined'}
                            color={'primary'}
                            fullWidth
                            required
                            // value={name}
                            // error={true}
                            InputProps={{
                                className: stylers.input
                            }}
                            {...register("username", {required: "First Name is Required"})}
                            error={Boolean(errors.username)}
                            helperText={errors.username?.message}
                        />
                        <TextField
                            onChange={(e) => setMessage(e.target.value)}
                            className={`${stylers.field}`}
                            label={'Message'}
                            variant={'outlined'}
                            fullWidth
                            required
                            multiline
                            rows={4}
                            // value={message}
                            {...register("message", "Either Message or a multi media file is Required")}
                            error={messageError}
                            helperText={messageError ? "Either Message or a multi media file is Required" : ""}
                        />


                        <TextField
                            // className={`${stylers.field}`}
                            id={"my-file"}
                            type="file"
                            name="picture"
                            {...register('uploadableFiles',)}
                            // error={messageError}
                            // helperText={messageError?"Either Message or a multi media file is Required":""}
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


                        <FormControl className={`mt-2 pb-3`}  component="fieldset">
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
                                                setIsScheduleLater(false)
                                                if (e.target.value === "Schedule for later") {
                                                    setIsScheduleLater(true)
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
                            {/*<RadioGroup*/}
                            {/*    aria-label="gender"*/}
                            {/*    defaultValue="BroadCast right now"*/}
                            {/*    name="radio-buttons-group"*/}
                            {/*>*/}
                            {/*    <FormControlLabel*/}
                            {/*        value="BroadCast right now"*/}
                            {/*        control={<Radio inputRef={register}/>}*/}
                            {/*        label="BroadCast right now"/>*/}
                            {/*    <FormControlLabel*/}
                            {/*        value="Schedule for later"*/}
                            {/*        control={<Radio inputRef={register}/>}*/}
                            {/*        label="Schedule for later"/>*/}
                            {/*</RadioGroup>*/}
                        </FormControl>

                        {isScheduleLater ?
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


                        <Button
                            className={classes.submitBtn}

                            variant={"contained"}
                            color={'success'}
                            style={{backgroundColor: '#0d0f53', color: '#FFFFFF'}}
                            type={'submit'}

                        >
                            Submit
                        </Button>

                    </form>
                    </Paper>
                </Grid>


            </Grid>

    );
};

export default EmployeeForm;
