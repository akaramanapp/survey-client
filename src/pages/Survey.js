import { Button, ListGroup, Container, Accordion, Card, Row, Col, Alert } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { surveyService } from '../service'
import SurveyList from '../components/SurveyList'
import QuestionList from '../components/QuestionList'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'

const Survey = () => {
    const [surveys, setSurveys] = useState([])
    const [selectedSurvey, setSelectedSurvey] = useState(undefined)
    const [showAlert, setShowAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false)
    const history = useHistory()

    useEffect(() => {
        surveyService.getAll().then((response) => {
            if (response) {
                setSurveys(response)
            } else {
                setShowAlert(true)
            }
        }).catch(res => {
            console.log(res)
        })
    }, [])

    const sendAnswerQuestion = (answers) => {
        let request = {
            surveyId: selectedSurvey.id,
            userSurveyResponseItems: answers
        }
        surveyService.userResponse(request).then((res) => {
            console.log(res)
        })

        setIsSuccess(true)
    }

    if (surveys && surveys.length > 0) {
        if (isSuccess) {
            return (
                <Container fluid='md' className='mt-5'>
                    <Alert variant="success">
                        <Alert.Heading>Save survey successful.</Alert.Heading>
                        <p>
                            <Link onClick={() => setIsSuccess(false)} className="button" style={{ marginLeft: 20 }}>Go to survey page</Link>
                        </p>
                    </Alert>
                </Container>
            )
        } else {
            return (
                <Container fluid='md' className='mt-5'>
                    <SurveyList setSelectedSurvey={setSelectedSurvey} surveys={surveys} />
                    <Col>{selectedSurvey && selectedSurvey.questions.length > 0 ? <QuestionList sendAnswerQuestion={sendAnswerQuestion} questions={selectedSurvey.questions} /> : null}</Col>
                </Container>
            )
        }
    } else {
        return (
            <Container fluid='md' className='mt-5'>
                <Alert variant="warning">
                    <Alert.Heading>No survey found</Alert.Heading>
                </Alert>
            </Container>
        )
    }
}

export default Survey;