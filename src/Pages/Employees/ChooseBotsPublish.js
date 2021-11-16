import React, {useState} from 'react';
import {
    InputLabel,
    FormControl,
    FormLabel
    , Checkbox

} from '@material-ui/core'
import {Controller, useFormContext} from 'react-hook-form'
import classes from '../StyleSheets/ChooseBotsPublish.module.css'
import {useObserver} from "mobx-react";

const SLACK_LABEL = "Slack"
const TWITTER_LABEL = "Twitter"
const TEAMS_LABEL = "Teams"

export default ({control}) => {

    const methods = useFormContext();

    let toBeIterated = [{
        icon: <img src="https://img.icons8.com/color/48/000000/slack-new.png"/>,
        value: "slackCheckBoxFlag",
        label: SLACK_LABEL,
        labelPlacement: "slack",
    },
        {
            icon: <img src="https://img.icons8.com/color/48/000000/twitter-circled--v2.png"/>,
            value: "twitterCheckBoxFlag",
            label: TWITTER_LABEL,
            labelPlacement: "twitter",
        },
        {
            icon: <img src="https://img.icons8.com/fluency/48/000000/microsoft-teams-2019.png"/>,
            value: "teamsCheckBoxFlag",
            label: TEAMS_LABEL,
            labelPlacement: "teams",
        }]


    return useObserver(() =>
        <>
            {
                <InputLabel className={'mt-3 pb-3'}>
                    You have authorized the following platforms for Broadcast
                </InputLabel>}

            {
                Object.entries(toBeIterated).map(entry => {
                    let {icon} = entry[1]
                    return (
                        <div key={'' + Math.random()} className={`d-inline p-3 mt-5 mr-3 `}>
                            <div className={`d-inline ${classes.zoom}`}>
                                {icon}
                            </div>

                        </div>
                    )
                })
            }

            <div component="fieldset" className={'d-block mt-3 pb-3'} id={'checkBoxComponent'}>


                <FormLabel component="legend">Please Choose the platform you want the message to be
                    broadcasted</FormLabel>
                {
                    Object.entries(toBeIterated).map(entry => {
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
                                                      checked={Boolean(field.value)}
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
        </>
    );
};
