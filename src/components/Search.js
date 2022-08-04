import { useContext } from 'react';
import DataContext from '../context/DataContext';
import '../styles/Search.css';
import Foods from './Foods';

const Search = () => {
  const { localDishList, continentalDishList, search } =
    useContext(DataContext);
  const allDishes = [...localDishList, ...continentalDishList];

  const result = allDishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(search.toLowerCase()) ||
      dish.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search">
      <Foods dishToDisplay={result} />
    </div>
  );
};

export default Search;
