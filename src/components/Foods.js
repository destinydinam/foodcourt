import '../styles/Foods.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const Foods = ({ dishToDisplay }) => {
  const { navigate, setSearch } = useContext(DataContext);

  const handleFoodPage = (food) => {
    localStorage.setItem('eachFood', JSON.stringify(food));
    setSearch('');
    navigate('/foodpage');
  };

  return (
    <div className="foods">
      <Row xs={1} md={3} className="g-4">
        {dishToDisplay.map((food) => (
          <Col key={food.id}>
            <Card>
              <Card.Img variant="top" src={food.image} />
              <Card.Body className="food__cardinfo">
                <Card.Title>{food.name.split('!')[0]}</Card.Title>
                {food.category && (
                  <Card.Text className="foods__category">
                    {food.category}
                  </Card.Text>
                )}
              </Card.Body>
              <p className="food__buttonDiv">
                <button
                  className="foods__button"
                  onClick={() => handleFoodPage(food)}
                >
                  Add more options
                </button>
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Foods;
