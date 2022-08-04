import '../styles/Filter.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Foods from './Foods';
import { useState, useEffect, useContext } from 'react';
import DataContext from '../context/DataContext';

const Filter = () => {
  const { localDishList, continentalDishList } = useContext(DataContext);
  const [dishCategory, setDishCategory] = useState('All');
  const [dishToDisplay, setDishToDisplay] = useState([]);

  useEffect(() => {
    setDishToDisplay([...localDishList, ...continentalDishList]);
  }, [continentalDishList, localDishList]);

  return (
    <div className="filter">
      <Dropdown>
        <Dropdown.Toggle
          className="filter__button"
          variant="warning"
          id="dropdown-basic"
        >
          Categories
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setDishToDisplay([...localDishList, ...continentalDishList]);
              setDishCategory('All');
            }}
          >
            All
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setDishToDisplay(localDishList);
              setDishCategory('Local Ghanain Dishes');
            }}
          >
            Local Ghanain Dishes
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setDishToDisplay(continentalDishList);
              setDishCategory('Continental Dishes');
            }}
          >
            Continental Dishes
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <h2>{dishCategory}</h2>
      <Foods dishToDisplay={dishToDisplay} />
    </div>
  );
};

export default Filter;
