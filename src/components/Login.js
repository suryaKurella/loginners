import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import classes from "../UI/StyleSheets/Card.module.css";
import '../UI/StyleSheets/Signup.css'
import buttoners from '../UI/StyleSheets/Buttons.module.css'
const Login = (props) => {


    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(`emailRef.current.value = ${emailRef.current.value}`)
        console.log(`passwordRef.current.value = ${passwordRef.current.value}`)

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch (e) {
            setError("Failed to login an Account")
        }

        setLoading(false)


    }


    return (
        <div>


            <Card className={classes.cardFrontPage}>
                <Card.Body>
                    <h2 className={'text-center mb-4 text-white'}>Log In</h2>
                    {error && <Alert variant={'danger'}>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id={'email'} className={'ml-5 mr-5'}>
                            <Form.Label className={'text-white'}>Email</Form.Label>
                            <Form.Control placeholder={'Email Address'} type={'email'} ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id={'password'} className={'ml-5 mr-5'}>
                            <Form.Label className={'text-white'}>Password</Form.Label>
                            <Form.Control placeholder={'Password'} type={'password'} ref={passwordRef} required/>
                        </Form.Group>

                        <Form.Group className={`signup-btn`}>

                            <Button disabled={loading} className={`${buttoners.submitBtn} submit-btn w-100 bg-success shadow-none`} type={'submit'}>Log
                                in</Button>
                        </Form.Group>

                        <div className={'w-100 text-center mt-2 text-white'}>

                            {/*Need an account ? <Link to={'/signup'}>Sign Up</Link>*/}
                            Need an account ? <Button variant={'outlined'} className={'text-white'}
                                                      onClick={() => props.onSignUpClick(false)}>Sign Up</Button>

                        </div>
                    </Form>
                </Card.Body>


            </Card>




        </div>
    );
};

export default Login;
