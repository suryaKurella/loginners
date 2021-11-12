import React from "react";

import {useLocalStore, useObserver} from "mobx-react";

export const StoreContext = React.createContext();


const StoreProvider = ({children}) => {
    const store = useLocalStore(() => ({

        message:'',
        userName:'',
        isScheduleLater:false,
        isTwitterAuthLocalMobXFlag:false,
        isSlackAuthLocalMobXFlag:false,
        isTeamsAuthLocalMobXFlag:false,
        isTwitterCheckBoxFlag:false,
        isSlackCheckBoxFlag:false,
        isTeamsCheckBoxFlag:false,
        scheduler:'',
        mediaFile:[],
        dateSchedule:new Date()
    }));

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};
export default StoreProvider
