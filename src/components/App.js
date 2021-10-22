import React from 'react';
import Signup from "./Signup";
import {Container} from "react-bootstrap";
import {AuthProvider} from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import DashBoard from "./DashBoard";
import Login from './Login'

function App() {

    return (

        <>

            <Container className={'d-flex align-items-center justify-content-center'}
                       style={{minHeight: '100vh', minWidth: '100%'}}>

                {/*<div className={'w-100'} style={{maxWidth: '400px'}}>*/}
                <div className={'w-100'}>
                    <Router>
                        <AuthProvider>
                            <Switch>
                                <Route exact path={'/'} component={DashBoard}/>
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
        </>
    )
}

export default App;
