import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import classes from "../UI/Card.module.css";


const Login = () => {





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



            <Card className={classes.card}>
                <Card.Body>
                    <h2 className={'text-center mb-4 text-white'}>Log In</h2>
                    {error && <Alert variant={'danger'}>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id={'email'}>
                            <Form.Label className={'text-white'}>Email</Form.Label>
                            <Form.Control placeholder={'Email Address'} type={'email'} ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id={'password'}>
                            <Form.Label className={'text-white'}>Password</Form.Label>
                            <Form.Control placeholder={'Password'} type={'password'} ref={passwordRef} required/>
                        </Form.Group>

                        <Button disabled={loading} className='submit-btn w-100 bg-danger' type={'submit'}>Log in</Button>
                    </Form>
                </Card.Body>

            </Card>

            <div className={'w-100 text-center mt-2'}>

                Need an account ? <Link to={'/signup'}>Sign Up</Link>

            </div>


        </div>
    );
};

export default Login;
