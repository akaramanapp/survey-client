import React, { useState, useRef } from 'react'
import { Form, Button, Col, Container, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { userService } from '../service'
import { useHistory } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthyear, setBirthyear] = useState(undefined)
    const [address, setAddress] = useState('')
    const [showAlert, setShowAlert] = useState(false);

    const history = useHistory();
    const signupForm = useRef(null);

    const formOnSubmit = (event) => {
        let user = {
            username: email,
            password: password,
            birth_year: birthyear,
            address: address
        }
        userService.signup(user).then((resp) => {
            setShowAlert(true)
            signupForm.current.reset()
        }).catch(err => {
            console.log(err)
        });
        event.preventDefault();
    }

    return (
        <Container style={{ paddingTop: 50 }}>
            {showAlert ? <Alert variant="success">
                <Alert.Heading>Successful member registration.</Alert.Heading>
                <p>
                    <Link to="/" className="button" style={{ marginLeft: 20}}>Go to login page</Link>
                </p>
            </Alert> : null}
            <Form onSubmit={formOnSubmit} ref={signupForm}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridBirthYear">
                    <Form.Label>Birth Year</Form.Label>
                    <Form.Control onChange={(e) => setBirthyear(e.target.value)} placeholder="19xx" required />
                </Form.Group>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control onChange={(e) => setAddress(e.target.value)} placeholder="1234 Main St" required />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ marginTop: 20 }}>
                    Sign Up
            </Button>

            </Form>
        </Container>
    )
}

export default SignUp;