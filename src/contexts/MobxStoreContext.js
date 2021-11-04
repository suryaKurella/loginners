import React from "react";

import {useLocalStore, useObserver} from "mobx-react";

export const StoreContext = React.createContext();


const StoreProvider = ({children}) => {
    const store = useLocalStore(() => ({
        bugs: ["Centipede"],
        addBug: bug => {
            store.bugs.push(bug);
        },
        get bugsCount() {
            return store.bugs.length;
        },
        message:'',
        userName:'',
        isScheduleLater:false
    }));

    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};
export default StoreProvider
