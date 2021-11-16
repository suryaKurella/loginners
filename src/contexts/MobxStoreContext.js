import React from "react";
import {useLocalObservable, useLocalStore} from "mobx-react";

export const StoreContext = React.createContext();

const StoreProvider = ({children}) => {
    // const store = useLocalStore(() => ({
    const store = useLocalObservable(() => ({

        message: '',
        userName: '',
        isScheduleLater: false,
        isTwitterAuthLocalMobXFlag: false,
        isSlackAuthLocalMobXFlag: false,
        isTeamsAuthLocalMobXFlag: false,
        isTwitterCheckBoxFlag: false,
        isSlackCheckBoxFlag: false,
        isTeamsCheckBoxFlag: false,
        scheduler: '',
        mediaFile: [],
        dateSchedule: new Date(),

        setMessageStore: (messageText) => {
            this.message = messageText
        }
    }));

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};
export default StoreProvider
