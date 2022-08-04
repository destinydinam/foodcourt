import '../styles/Foods.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Foods = ({ dishToDisplay }) => {
  return (
    <div className="foods">
      <Row xs={1} md={3} className="g-4">
        {dishToDisplay.map((food) => (
          <Col key={food.id}>
            <Card>
              <Card.Img variant="top" src={food.image} />
              <Card.Body>
                <Card.Title>{food.name}</Card.Title>
                {food.category && (
                  <Card.Text className="foods__category">
                    {`${food.category} ${food.vegan ? ',vegan' : ''}`}
                  </Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Foods;
