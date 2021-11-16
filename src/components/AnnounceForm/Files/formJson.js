import React from 'react';

const formJson = () => {

    const SLACK_LABEL = "Slack"
    const TWITTER_LABEL = "Twitter"
    const TEAMS_LABEL = "Teams"


    return (

        [{
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


    );
};

export default formJson;
