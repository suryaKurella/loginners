import React from 'react';
import SignUpSignIn from './SignUpSignIn'
import StoreProvider from "../contexts/MobxStoreContext";

function App() {

    return (
        <>
            <StoreProvider>
                <SignUpSignIn/>
            </StoreProvider>
        </>
    )
}

export default App;
