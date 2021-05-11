import React, { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { authenticationService } from '../service'
import { useHistory } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const onSubmit = () => {
        authenticationService.login(username, password)
        .then(resp => {
            history.push('/')
        }
        );
    }

    const getUser = () => {
        const currentUser = authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            return { Authorization: `Bearer ${currentUser.token}` };
        } else {
            return {};
        }
    }

    return (
        <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e) => setUsername(e.target.value)} type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group controlId="buttons" style={{ paddingTop: 10 }}>
                    <Button variant="success" onClick={onSubmit}>Login</Button>
                    <Link to="/signup" className="button" style={{ marginLeft: 20}}>
                        <Button variant="primary" to="/signup">Sign Up</Button>
                    </Link>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Login