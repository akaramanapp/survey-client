import { ListGroup, Button } from 'react-bootstrap'

const SurveyList = (props) => {
    const surveys = props.surveys;
    const listItems = surveys.map((item) =>
        <ListGroup.Item onClick={() => props.setSelectedSurvey(item)} action variant="light">
            {item.surveyTopic}
        </ListGroup.Item>
    );
    return (
        <ListGroup>
            <ListGroup.Item as="li" active>
                Survey List
            </ListGroup.Item>
            {listItems}
        </ListGroup>
    );
}

export default SurveyList;