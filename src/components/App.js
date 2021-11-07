import React from 'react';
import Signup from "./Signup";
import {Container} from "react-bootstrap";
import {AuthProvider} from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import DashBoard from "./DashBoard";
import Login from './Login'
import SignUpSignIn from './SignUpSignIn'
import Employees from "../Pages/Employees/Employees";
import NavBar from "../Test/NavBar";
import StoreProvider from "../contexts/MobxStoreContext";

function App() {

    return (


        <>

            {/*<NavBar/>*/}
            <StoreProvider>
                <SignUpSignIn/>
            </StoreProvider>
            {/*<Employees/>*/}


        </>
    )
}

export default App;
