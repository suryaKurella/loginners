import React, {useCallback, useContext, useEffect, useReducer, useState} from 'react';
import classes from '../StyleSheets/AnnouncementPage.module.css'
import greenImg from 'D://Surya//Software LEarning//loginners//src//UI//images//green.jpeg';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import {
    Grid,
    Paper,
    Card,
} from '@material-ui/core'


import {makeStyles} from '@material-ui/styles';
import {useForm, Controller, FormProvider, useFormContext} from 'react-hook-form'
import ChooseBotsPublish from './ChooseBotsPublish'
import DatePickerFunc from "../Employees/DatepickerFunc";
import {StoreContext} from '../../contexts/MobxStoreContext';
import GridUtilFormCommon from "../utils/GridUtilFormCommon";
import {yupResolver} from "@hookform/resolvers/yup";

import * as yup from 'yup'
import {Input} from "../utils/Input";
import IconAdornmentField from "../utils/IconAdornmentField";
import {PrimaryButton} from "../utils/PrimaryButton";
import {useObserver} from "mobx-react";
import {FileUploader} from '../utils/FileUploader'
import {useHistory} from "react-router-dom";

import axios from 'axios'
import {autorun} from "mobx";

const url = 'http://localhost:4000/authFlags'
const fetchAuthDBFlags = () => axios.get(url)


const schema = yup.object().shape({
    userName:
        yup.string().matches(/^([^0-9]*)$/, "User Name should not contain numbers")
            .required("Please enter your User Name"),
    message:
        yup.string().required("Please enter your message"),
    item_ids: yup.array()
        .transform(ids => {
            return ids.filter(id => {
                return id === 0 || id;
            });
        })
        .min(1, "Please choose atleast one platform for the message to be broadcasted")
})

const EmployeeForm = () => {
    const store = useContext(StoreContext)
    const [isFileUpload, setIsFileUpload] = useState(false)


    const history = useHistory()


    console.log(`bugs = ${store.bugs} and message = ${store.message}`)
    const methods = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    })

    const {control, register, formState: {errors}, getValues} = methods;


    const useStyle = makeStyles(theme => (
        {
            field: {
                marginTop: 20,
                marginBottom: 20,
                display: 'block'
            },
            outlineColor: {
                border: ' 2px solid green'
            },
            submitBtn: {
                display: 'block'
            },
            scheduler: {
                display: 'block'
            }

        }
    ))


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
                    <FormProvider {...methods}>
                        <form className={`${stylers.alignItemsAndJustifyContent}`} noValidate autoComplete={'off'}
                              onSubmit={methods.handleSubmit((data) => {

                                  let {
                                      Scheduler,
                                      Slack,
                                      Twitter,
                                      Teams,
                                      date_schedule,
                                      files
                                  } = data

                                  if (Scheduler === "BroadCast right now") {
                                      date_schedule = new Date()
                                  }

                                  store.scheduler = Scheduler
                                  store.isScheduleLater = Scheduler !== "BroadCast right now"


                                  // store.isSlackCheckBoxFlag = typeof Slack === "undefined" ? false : Slack
                                  console.log(`Slack flag = ${Slack}`)
                                  console.log(`Twitter flag = ${Twitter}`)
                                  console.log(`Teams flag = ${Teams}`)

                                  store.isSlackCheckBoxFlag = [true, false].includes(Slack) ? Slack : false
                                  // store.isTwitterCheckBoxFlag = typeof Twitter === "undefined" ? false : Twitter
                                  store.isTwitterCheckBoxFlag = [true, false].includes(Twitter) ? Twitter : false
                                  // store.isTeamsCheckBoxFlag = typeof Teams === "undefined" ? false : Teams
                                  store.isTeamsCheckBoxFlag = [true, false].includes(Teams) ? Teams : false
                                  store.mediaFile = files
                                  store.dateSchedule = date_schedule


                                  console.log(data)
                                  console.log("MESSAGE")
                                  console.log(data["message"])
                                  let uploadFileName = ''


                                  const message_roll = data["message"]

                                  try {
                                      console.log("Message Roll = ", message_roll)
                                      uploadFileName = data["uploadableFiles"][0]["name"]
                                      console.log("Uploaded File Nmae = ", uploadFileName)
                                      setIsFileUpload(true)
                                  } catch (err) {
                                      console.log("No File Uploaded")
                                      setIsFileUpload(false)
                                  }

                                  {
                                      console.log(`isFileUpload = ${isFileUpload}`)
                                  }
                                  history.push('/confirm')
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
                            <FileUploader name="files" control={control}/>

                            {/* Date Picker */}

                            <DatePickerFunc control={control}/>

                            <ChooseBotsPublish
                                control={control}
                            />

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
