import React, {useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
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
    Radio, Checkbox

} from '@material-ui/core'
import {useForm, Controller} from 'react-hook-form'

const ChooseBotsPublish = ({onFlagSender, authFlags}) => {


    const {register, handleSubmit, formState: {errors}, control} = useForm()


    const {isSlackAuthDB, isTwitterAuthDB, isTeamsAuthDB} = authFlags;

    const [displaySlackCheckBox, displayTwitterCheckBox, displayTeamsCheckBox] = [!isSlackAuthDB, !isTwitterAuthDB, !isTeamsAuthDB]


    // console.log(`isSlackAuthDB : ${isSlackAuthDB} & displaySlackCheckBox : ${displaySlackCheckBox}`)


    let toBeIterated = [{
        authFlag: isSlackAuthDB,
        icon: <img src="https://img.icons8.com/color/48/000000/slack-new.png"/>,
        value: "slackCheckBoxFlag",
        label: "Slack",
        labelPlacement: "slack"

    },
        {
            authFlag: isTwitterAuthDB,
            icon: <img src="https://img.icons8.com/color/48/000000/twitter-circled--v2.png"/>,
            value: "twitterCheckBoxFlag",
            label: "Twitter",
            labelPlacement: "twitter"

        },
        {
            authFlag: isTeamsAuthDB,
            icon: <img src="https://img.icons8.com/fluency/48/000000/microsoft-teams-2019.png"/>,
            value: "teamsCheckBoxFlag",
            label: "Teams",
            labelPlacement: "teams"
        }]


    const checkBoxChangeHandler = () => {

        // var cont = document.getElementById('checkBoxComponent').children;


        let checkBoxers = document.querySelectorAll('input[type=checkBox]')

        let toBeReturnedFlags = {
            "slackCheckBoxFlag": false,
            "twitterCheckBoxFlag": false,
            "teamsCheckBoxFlag": false
        }


        // console.log(`checkBoxers length = ${checkBoxers.length}`)

        for (let i = 0; i < checkBoxers.length; i++) {


            if (checkBoxers[i].checked) {
                toBeReturnedFlags[checkBoxers[i].value] = true
            }

        }


        // console.log("Updated Flags = ")
        // console.log(toBeReturnedFlags)


        // var hola = document.getElementsByTagName('input')


        // console.log("The length is ", cont.length)


        // for (var i = 0; i < cont.length; i++) {
        //     // Check if the element is a checkbox.
        //     // if (cont[i].tagName === 'input' && cont[i].type === 'checkbox') {
        //
        //         console.log(cont[i])
        //
        //
        //
        //
        //     console.log("Element here man = ")
        //     console.log("Len = ", checkBoxers.length)
        //
        //     console.log(checkBoxers)
        //
        //
        //     console.log("===============================")
        //
        //
        //
        //     if (cont[i].type === 'checkbox') {
        //
        //         console.log("Checking Bro")
        //         // Finally, check if the checkbox is checked.
        //         if (cont[i].checked) {
        //             alert(cont[i].value + ' is checked!');
        //         }
        //     }
        // }

        // return toBeReturnedFlags;
        return onFlagSender(toBeReturnedFlags);

    }


    return (
        <form>

            {(!isSlackAuthDB || !isTwitterAuthDB || !isTeamsAuthDB) ?
                <InputLabel className={'mt-3 pb-3'}>
                    Please Authorize the following Platforms for your Broadcast
                </InputLabel> : ""}


            {

                Object.entries(toBeIterated).map(entry => {
                    // const [key, value] = entry;

                    const {authFlag, icon} = entry[1]
                    // console.log(authFlag)
                    // console.log(icon)


                    return !authFlag ? <Card key={'' + Math.random()} className={'d-inline p-3 mt-3 mr-3'}>
                        {
                            < div className={'d-inline'}>
                                {icon}
                            </div>
                        }
                    </Card> : ""
                })

            }


            <FormControl component="fieldset" className={'d-block mt-3 pb-3'} id={'checkBoxComponent'}>

                {(isSlackAuthDB || isTwitterAuthDB || isTeamsAuthDB) ?
                    <FormLabel component="legend">Please Choose the platform you want the message to be
                        broadcasted</FormLabel> :
                    <FormLabel component="legend">Please Authorize any of the above platforms to broadcast your
                        message</FormLabel>}


                {

                    Object.entries(toBeIterated).map(entry => {
                        // const [key, value] = entry;

                        const {authFlag, icon, value, label, labelPlacement} = entry[1]
                        // console.log(authFlag)
                        // console.log(icon)
                        // console.log(`value = ${value}`)


                        return authFlag ?
                            <div key={'' + Math.random()} className={'d-inline'}>
                                {
                                    <FormGroup aria-label="position" row>
                                        <FormControlLabel

                                            value={value}
                                            control={<Checkbox/>}
                                            label={label}
                                            labelPlacement={labelPlacement}
                                            // onChange={onFlagSender(checkBoxChangeHandler)}
                                            onChange={checkBoxChangeHandler}
                                        />
                                    </FormGroup>
                                }
                            </div> : ""
                    })

                }


            </FormControl>


            {/*<FormControl component="fieldset" className={'d-block p-3 mt-3'}>*/}
            {/*    <FormLabel component="legend">Please Choose the platform you want the message to be*/}
            {/*        broadcasted</FormLabel>*/}
            {/*    <FormGroup aria-label="position" row>*/}

            {/*        {displaySlackCheckBox ?*/}
            {/*            <FormControlLabel*/}
            {/*                value="slack"*/}
            {/*                control={<Checkbox/>}*/}
            {/*                label="Slack"*/}
            {/*                labelPlacement="slack"*/}
            {/*            /> : ""}*/}
            {/*        {displayTwitterCheckBox ? <FormControlLabel*/}
            {/*            value="twitter"*/}
            {/*            control={<Checkbox/>}*/}
            {/*            label="Twitter"*/}
            {/*            labelPlacement="twitter"*/}
            {/*        /> : ""*/}


            {/*        }*/}
            {/*        {displayTeamsCheckBox ?*/}
            {/*            <FormControlLabel*/}
            {/*                value="teams"*/}
            {/*                control={<Checkbox/>}*/}
            {/*                label="Teams"*/}
            {/*                labelPlacement="teams"*/}

            {/*                onChange={(e) => console.log(e.target)}*/}
            {/*            /> : ""}*/}


            {/*    </FormGroup>*/}


            {/*</FormControl>*/}


        </form>
    );
};

export default ChooseBotsPublish;
