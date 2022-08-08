import '../styles/Slider.css';
import { useContext, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import DataContext from '../context/DataContext';

const Slider = () => {
  const { localDishList, continentalDishList } = useContext(DataContext);
  const allDishes = [...localDishList, ...continentalDishList];
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const isFalse = false;
  return (
    <div className="slider">
      <Carousel
        indicators={isFalse}
        activeIndex={index}
        onSelect={handleSelect}
      >
        {allDishes.map((food) => (
          <Carousel.Item key={food.id}>
            <div className="slider__card">
              <img
                className="d-block slider__image"
                src={food.image}
                alt="First slide"
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
