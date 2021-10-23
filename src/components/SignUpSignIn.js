import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AuthProvider} from "../contexts/AuthContext";
import Signup from "./Signup";
import Login from "./Login";


const SignUpSignIn = () => {

    const [oldUser, setOldUser] = useState(false)

    return (
        <Container className={'d-flex align-items-center justify-content-center'}
                   style={{minHeight: '100vh', minWidth: '100%'}}>

            {/*<div className={'w-100'} style={{maxWidth: '400px'}}>*/}
            <div className={'w-100'}>
                <Router>
                    <AuthProvider>
                        <Switch>
                            {/*<Route exact path={'/'} component={DashBoard}/>*/}



                            <Route path={'/signup'} component={Signup}/>


                            <Container className={'w-100 '} style={{maxWidth: '400px'}}>
                                <Route path={'/login'} component={Login}/>
                            </Container>
                        </Switch>
                    </AuthProvider>
                </Router>


                {/*<Signup/>*/}
            </div>

        </Container>
    );
};

export default SignUpSignIn;
