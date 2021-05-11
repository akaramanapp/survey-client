import React, { useState, useEffect, useRef} from 'react'
import { authenticationService, surveyService } from '../service'
import { Button, Container, Alert, Table, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Admin = () => {
    const [surveys, setSurveys] = useState([])
    const [newSurvey, setNewSurvey] = useState([])
    const surveyForm = useRef(null);

    useEffect(() => {
        getAllSurvey()
    }, [])

    const item = (survey) => {
        return (
            <tr>
                <td>{survey.surveyTopic}</td>
                <td>{survey.questions.length}</td>
                <td><Link to={{
                    pathname: '/questions',
                    survey: survey,
                    getAllSurvey: getAllSurvey
                }} className="button" style={{ marginLeft: 20 }}>Edit</Link></td>
            </tr>
        )
    }

    const onPress = () => {
        let body = {
            surveyTopic: newSurvey
        }
        surveyService.addSurvey(body).then(() => {
            getAllSurvey()
        })
        surveyForm.current.reset()
    }

    const getAllSurvey = () => {
        surveyService.getAll().then((response) => {
            if (response) {
                setSurveys(response)
            }
        }).catch(res => {
            console.log(res)
        })
    }

    return (
        <Container fluid='md' className='mt-5'>
            {!authenticationService.isAdmin() ? <Alert variant="danger">
                <Alert.Heading>No Authorization</Alert.Heading>
            </Alert> : null}
            <h2>Surveys</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Survey Name</th>
                        <th>Question Count</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        surveys && surveys.map(survey => {
                            return item(survey)
                        })
                    }
                </tbody>
            </Table>
            <Form ref={surveyForm}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Survey Name</Form.Label>
                    <Form.Control onChange={(e) => setNewSurvey(e.target.value)} type="email" placeholder="..." />
                    <Button size='sm' style={{marginTop: 10}} onClick={onPress}>Ekle</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Admin;
