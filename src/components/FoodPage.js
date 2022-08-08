import Card from 'react-bootstrap/Card';
import '../styles/FoodPage.css';
import { useState } from 'react';
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai';
import OrderModal from './OrderModal';

const FoodPage = () => {
  const eachFood = JSON.parse(localStorage.getItem('eachFood'));
  const [toppingList, setToppingList] = useState([]);
  const [isOrder, setIsOrder] = useState(false);
  const toppings = JSON.parse(eachFood.name.split('!')[1]);

  const handleAddtopping = (topping) => {
    setToppingList((prev) => [...prev, topping]);
  };
  const handleDeleteTopping = (topping) => {
    const newArray = toppingList.filter((food) => topping !== food);
    setToppingList(newArray);
  };

  const handleModal = () => {
    setIsOrder(true);
  };

  return (
    <div>
      <div className={`foodpage ${isOrder === true && 'darkbg'}`}>
        <div className="foodpage__card">
          <h1 className="foodpage__title">{eachFood.name.split('!')[0]}</h1>
          <div className="foodpage__image">
            <Card>
              <Card.Img variant="top" src={eachFood.image} />
            </Card>
          </div>
          {toppingList.length ? (
            <div>
              <h2 className="foodpage__selectedtoppings">Selected Toppings</h2>
              {toppingList.map((topping, index) => (
                <div key={index} className="foodpage__selectedtoppingDiv">
                  <p className="foodpage__selectedtopping">{topping}</p>
                  <AiFillDelete
                    className="foodpage__deletebutton"
                    onClick={() => handleDeleteTopping(topping)}
                  />
                </div>
              ))}
            </div>
          ) : (
            ''
          )}
          <button onClick={handleModal} className="foodpage__order">
            Order
          </button>
        </div>
        <div className="foodpage__toppings">
          <h1 className="foodpage__title__toppings">Toppings</h1>
          {toppings.map((topping) => (
            <div key={topping} className="foodpage__topping">
              <h2 className="foodpage__toppingname">{topping}</h2>
              <button
                className="foodpage__toppingplus"
                onClick={() => handleAddtopping(topping)}
              >
                <AiOutlinePlus />
              </button>
            </div>
          ))}
        </div>
      </div>
      {isOrder === true ? (
        <div className="foodpage__modal">
          <OrderModal
            setIsOrder={setIsOrder}
            toppingList={toppingList}
            eachFood={eachFood}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default FoodPage;
