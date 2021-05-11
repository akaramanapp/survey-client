import React, { useState, useEffect, useRef } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap'
import { questionService } from '../../service'
import { Link } from 'react-router-dom'

const Questions = (props) => {
    const [questions, setQuestions] = useState(props.location.survey && props.location.survey.questions)
    const [newQuestion, setNewQuestion] = useState([])
    const questionForm = useRef(null);

    useEffect(() => {

    }, [])

    const item = (question) => {
        return (
            <tr>
                <td>{question.question_title}</td>
                <td>{question.options && question.options.length}</td>
                <td><Link to={{
                    pathname: '/options',
                    options: question.options,
                    question_id: question.id
                }} className="button" style={{ marginLeft: 20 }}>Edit</Link></td>
            </tr>
        )
    }


    const onPress = () => {
        let body = {
            "survey_id": props.location.survey.id,
            "question_title": newQuestion
        }

        questionService.addQuestion(body).then(res => {
            setQuestions(questions => [...questions, res]);
        })

        questionForm.current.reset()
    }

    return (
        <Container fluid='md' className='mt-5'>
            <h2>Questions</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Question Desc</th>
                        <th>Option Count</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions && questions.map((question, i) => {
                            return item(question)
                        })
                    }
                </tbody>
            </Table>
            <Form ref={questionForm}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Question Name</Form.Label>
                    <Form.Control onChange={(e) => setNewQuestion(e.target.value)} type="email" placeholder="..." />
                    <Button size='sm' style={{ marginTop: 10 }} onClick={onPress}>Ekle</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Questions;
