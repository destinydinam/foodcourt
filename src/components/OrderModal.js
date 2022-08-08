import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import '../styles/OrderModal.css';

const OrderModal = ({ eachFood, toppingList, setIsOrder }) => {
  return (
    <div>
      <Modal.Dialog className="ordermodal">
        <Modal.Title>
          Congratulations 🥳 you have placed your order successfully
        </Modal.Title>
        <Modal.Body className="ordermodal__body">
          <div className="ordermodal__image">
            <Card>
              <Card.Img variant="top" src={eachFood.image} />
            </Card>
          </div>
          {toppingList.length ? (
            <div>
              <h2 className="ordermodal__selectedtoppings">
                Selected Toppings
              </h2>
              {toppingList.map((topping, index) => (
                <div key={index} className="ordermodal__selectedtoppingDiv">
                  <p className="ordermodal__selectedtopping">{topping}</p>
                </div>
              ))}
            </div>
          ) : (
            ''
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsOrder(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default OrderModal;
