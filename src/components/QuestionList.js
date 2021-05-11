import React, { useState } from 'react'
import { ListGroup, Button, Row, Col, Form } from 'react-bootstrap'

const QuestionList = (props) => {
    const [answerList, setAnswerList] = useState([])
    const questions = props.questions || [];

    const onSelect = (question, option) => {
        var newList = answerList;
        let item = {
            question_id: question.id,
            option_id: option.id
        }

        controlAndAdd(newList, item)
    }

    const controlAndAdd = (list, item) => {
        let oldItem = list.find(x => x.question_id === item.question_id);
        if (oldItem) {
            let index = list.indexOf(oldItem);
            list.splice(index, 1)
            list.push(item)
            setAnswerList(list);
        } else {
            list.push(item)
            setAnswerList(list);
        }
    }

    const getOption = (item) => {
        return (
            item.options.map((option, i) => {
                return <Form.Check type="radio" onClick={() => onSelect(item, option)} label={option.option_title} name="formHorizontalRadios${i}" id="formHorizontalRadios${i}" />
            })
        );
    }

    const listItems = questions.map((item, index) =>
        <ListGroup style={{ paddingTop: 20 }}>
            <ListGroup.Item variant="warning">
                {index + 1 + ' : ' + item.question_title}
            </ListGroup.Item>
            <ListGroup.Item>
                <Row style={{ padding: 10 }}>
                    <Form.Group controlId="formBasicCheckbox">
                        {getOption(item)}
                    </Form.Group>
                </Row>
            </ListGroup.Item>
            <Button variant="primary" onClick={() => props.sendAnswerQuestion(answerList)}>
                Submit
            </Button>
        </ListGroup>
    );
    return (
        listItems
    );
}

export default QuestionList;