import React, {useContext} from 'react';
import classes from '../StyleSheets/AnnouncementPage.module.css'
import {Grid, Paper, Card} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles';
import {useForm, FormProvider} from 'react-hook-form'
import DatePickerFunc from "../Employees/DatepickerFunc";
import {StoreContext} from '../../contexts/MobxStoreContext';
import GridUtilFormCommon from "../utils/GridUtilFormCommon";
import {yupResolver} from "@hookform/resolvers/yup";
import {PrimaryButton} from "../utils/PrimaryButton";
import {useObserver} from "mobx-react";
import {FileUploader} from '../utils/FileUploader'
import {useHistory} from "react-router-dom";
import axios from 'axios'
import {capitalizeFirstLetter} from '../utils/CommonFunctions'
//component import
import formSchemaBase from "../YupSchemas/FormSchemaBase";
import UserName from "../../components/AnnounceForm/UserName";
import Message from "../../components/AnnounceForm/Message";
import LogoBots from "../../components/AnnounceForm/LogoBots";
import CheckBoxBots from "../../components/AnnounceForm/CheckBoxBots";

const url = 'http://localhost:4000/authFlags'
const fetchAuthDBFlags = () => axios.get(url)


//constants
const BROADCAST_RIGHTNOW = "BroadCast right now"

//constants for useForm Hook
const MESSAGE = "message"

const schema = formSchemaBase()

const EmployeeForm = () => {


    const store = useContext(StoreContext)
    const history = useHistory()
    const methods = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    })
    const {control, register, formState: {errors}} = methods;

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
                    className={`p-4 ${classes['card-announce']}`}
                    variant={'elevation'}
                    elevation={24}
                >
                    <FormProvider {...methods}>
                        <form noValidate autoComplete={'off'}
                              onSubmit={methods.handleSubmit((data) => {
                                  let {Scheduler, Slack, Twitter, Teams, date_schedule, files} = data
                                  if (Scheduler === BROADCAST_RIGHTNOW) {
                                      date_schedule = new Date()
                                  }
                                  store.scheduler = Scheduler
                                  store.isScheduleLater = Scheduler !== "BroadCast right now"
                                  store.isSlackCheckBoxFlag = [true, false].includes(Slack) ? Slack : false
                                  store.isTwitterCheckBoxFlag = [true, false].includes(Twitter) ? Twitter : false
                                  store.isTeamsCheckBoxFlag = [true, false].includes(Teams) ? Teams : false
                                  store.mediaFile = files
                                  store.dateSchedule = date_schedule
                                  console.log(data)
                                  history.push('/confirm')
                              })}>
                            <UserName/>
                            {/*Message*/}
                            <Message message={MESSAGE}/>
                            {/*FileUploader*/}
                            <FileUploader name="files" control={control}/>
                            {/*DatePicker*/}
                            <DatePickerFunc/>
                            {/*Bots Logo Code*/}
                            <LogoBots/>
                            {/*Bots CheckBox Code*/}
                            <CheckBoxBots {...methods}/>

                            <PrimaryButton type={'submit'}>
                                Review
                            </PrimaryButton>
                        </form>
                    </FormProvider>
                </Paper>
            </GridUtilFormCommon>
        </Grid>
    );
};

export default EmployeeForm;
