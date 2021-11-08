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
import {useForm, Controller, useFormContext} from 'react-hook-form'
import {StoreContext} from '../../contexts/MobxStoreContext';
import Swal from "sweetalert2";
const ChooseBotsPublish = ({onFlagSender, authFlags}) => {

    const [success, setSuccess] = useState(false);

    const store = React.useContext(StoreContext);

    const methods = useFormContext();
    const {control, register} = methods;


    // const {register, handleSubmit, formState: {errors}, control} = useForm()


    const {isSlackAuthDB, isTwitterAuthDB, isTeamsAuthDB} = authFlags;

    const [displaySlackCheckBox, displayTwitterCheckBox, displayTeamsCheckBox] = [!isSlackAuthDB, !isTwitterAuthDB, !isTeamsAuthDB]


    // console.log(`isSlackAuthDB : ${isSlackAuthDB} & displaySlackCheckBox : ${displaySlackCheckBox}`)


    let toBeIterated = [{
        authFlag: isSlackAuthDB,
        icon: <img src="https://img.icons8.com/color/48/000000/slack-new.png"/>,
        value: "slackCheckBoxFlag",
        label: "Slack",
        labelPlacement: "slack",
        hrefLink: "https://slack.com/oauth/v2/authorize?client_id=920553244658.2619617391527&scope=chat:write,chat:write.public,incoming-webhook,channels:read,users:write&user_scope=channels:write,chat:write,channels:read%22><img"


    },
        {
            authFlag: isTwitterAuthDB,
            icon: <img src="https://img.icons8.com/color/48/000000/twitter-circled--v2.png"/>,
            value: "twitterCheckBoxFlag",
            label: "Twitter",
            labelPlacement: "twitter",
            hrefLink: "https://slack.com/oauth/v2/authorize?client_id=920553244658.2619617391527&scope=chat:write,chat:write.public,incoming-webhook,channels:read,users:write&user_scope=channels:write,chat:write,channels:read%22><img"


        },
        {
            authFlag: isTeamsAuthDB,
            icon: <img src="https://img.icons8.com/fluency/48/000000/microsoft-teams-2019.png"/>,
            value: "teamsCheckBoxFlag",
            label: "Teams",
            labelPlacement: "teams",
            hrefLink: "https://slack.com/oauth/v2/authorize?client_id=920553244658.2619617391527&scope=chat:write,chat:write.public,incoming-webhook,channels:read,users:write&user_scope=channels:write,chat:write,channels:read%22><img"

        }]


    const checkBoxChangeHandler = () => {
        let toBeReturnedFlags = {
            "slackCheckBoxFlag": false,
            "twitterCheckBoxFlag": false,
            "teamsCheckBoxFlag": false
        }


        return onFlagSender(toBeReturnedFlags);

    }
    const [checkemail, setcheckemail] = useState(true);

    const botClickHandler = async () => {
        const formData = new FormData();

        formData.append("Teams Flag", "true")

        const res = await fetch("http://localhost:4000/botflags", {
            method: "POST",
            body: formData,
        });
        if (res.status === 200) {
            setSuccess(true);
        }
    }


    return (
        <form>

            {(!isSlackAuthDB || !isTwitterAuthDB || !isTeamsAuthDB) ?
                <InputLabel className={'mt-3 pb-3'}>
                    Please Authorize the following Platforms for your Broadcast
                </InputLabel> : ""}


            {

                Object.entries(toBeIterated).map(entry => {

                    const {authFlag, icon} = entry[1]

                    return !authFlag ? <Card key={'' + Math.random()} className={'d-inline p-3 mt-3 mr-3'}>
                        {
                            < Button
                                onClick={botClickHandler}

                                // href={entry[1].hrefLink}
                                className={'d-inline'}
                                target="_blank">
                                {icon}
                            </Button>
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

                        const {authFlag, icon, value, label, labelPlacement} = entry[1]


                        return authFlag ?
                            <div key={'' + Math.random()} className={'d-inline'}>
                                {
                                    <FormGroup aria-label="position" row className={'d-inline'}>
                                        <section className={'d-inline'}>
                                            <Controller
                                                name={label}
                                                control={control}
                                                render={({field}) => (
                                                    <Checkbox
                                                        onChange={(e) => field.onChange(e.target.checked)}
                                                        checked={field.value}
                                                    />
                                                )}
                                            />
                                            <label>{label}</label>
                                        </section>
                                    </FormGroup>
                                }
                            </div> : ""
                    })
                }
            </FormControl>
        </form>
    );
};

export default ChooseBotsPublish;
