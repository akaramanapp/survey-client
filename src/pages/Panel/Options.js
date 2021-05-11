import React, { useState, useRef } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap'
import { questionService } from '../../service'

const Options = (props) => {
    const [options, setOptions] = useState(props.location.options ? props.location.options : [])
    const [newOption, setNewOption] = useState([])
    const optionForm = useRef(null);

    const item = (options) => {
        return (
            <tr>
                <td>{options.option_title}</td>
                <td></td>
                <td></td>
            </tr>
        )
    }

    const onPress = () => {
        let body = {
            "question_id": props.location.question_id,
            "option_title": newOption
        }

        questionService.addOption(body).then((res) => {
            setOptions(options => [...options, res])
        })

        optionForm.current.reset()
    }

    return (
        <Container fluid='md' className='mt-5'>
            <h2>Options</h2>
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
                        options && options.map((option,i) => {
                            return item(option)
                        })
                    }
                </tbody>
            </Table>
            <Form ref={optionForm}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Question Name</Form.Label>
                    <Form.Control onChange={(e) => setNewOption(e.target.value)} type="email" placeholder="..." />
                    <Button size='sm' style={{ marginTop: 10 }} onClick={onPress}>Ekle</Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default Options;
