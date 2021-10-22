import React, {useRef, useState} from 'react';
import './Signup.css'
import {Container, Row, Col, Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'
import classes from '../UI/Card.module.css'
import cardClasses from '../UI/generalCard.module.css'
import buttoners from '../UI/Buttons.module.css'

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(`passwordRef.current.value = ${passwordRef.current.value}`)
        console.log(`passwordConfirmRef.current.value = ${passwordConfirmRef.current.value}`)

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {

            return setError('Passwords Do not match')

        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch (e) {
            setError("Failed to create an Account")
        }

        setLoading(false)


    }


    const handleShow = () => {

        document.getElementById('password').innerText = passwordRef.current.value

        console.log(passwordRef.current.value)

    }


    return (
        <div className={'align-items-center justify-content-center'}>
            <Row>
                <Col className={`gap-padding`}>

                    <Card className={`${cardClasses.card} ml-0`}>
                        <div className={'announcement text-white' }>

                            Omg Bro
                        </div>
                    </Card>

                </Col>


                <Col xs lg="5" className={`gap-padding`}>


                    <Card className={`${classes.card} vertical-full`}>
                        <Card.Body>
                            <h2 className={'text-center mb-4 text-white'}>Sign up</h2>
                            {error && <Alert variant={'danger'}>{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id={'email'}>
                                    <Form.Label className={'text-white'}>Email</Form.Label>
                                    <Form.Control className={'boomer border border-top-0 border-left-0 border-right-0'}
                                                  placeholder={'Email Address'} type={'email'} ref={emailRef} required/>
                                </Form.Group>
                                <Form.Group id={'password'}>
                                    <Form.Label className={'text-white'}>Password</Form.Label>
                                    <Form.Control className={'boomer border border-top-0 border-left-0 border-right-0'}
                                                  placeholder={'Password'} type={'password'} ref={passwordRef}
                                                  required/>s
                                </Form.Group>
                                <Form.Group id={'password-confirm'}>
                                    <Form.Label className={'text-white'}>Password Confirmation</Form.Label>
                                    <Form.Control className='boomer border border-top-0 border-left-0 border-right-0'
                                                  placeholder={'Confirm Password'} type={'password'}
                                                  ref={passwordConfirmRef}
                                                  required/>
                                </Form.Group>

                                <Button disabled={loading}
                                        className={`${buttoners.submitBtn} w-100 bg-danger shadow-none`}
                                        type={'submit'}>Sign
                                    Up</Button>
                            </Form>
                            <div className={'w-100 text-center mt-5 text-white'}>

                                Already have an account ? <Link to={'/login'}>Login</Link>

                            </div>
                        </Card.Body>

                    </Card>
                </Col>
            </Row>




        </div>
    );
};

export default Signup;
