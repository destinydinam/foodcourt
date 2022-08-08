import '../styles/AddToppings.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { useContext, useState } from 'react';
import DataContext from '../context/DataContext';

const AddToppings = () => {
  const { setToppingInputList } = useContext(DataContext);
  const [toppingInput, setToppingInput] = useState('');

  const handleAddTopping = () => {
    toppingInput && setToppingInputList((prev) => [...prev, toppingInput]);
    setToppingInput('');
  };

  return (
    <div className="addToppings">
      <input
        type="text"
        placeholder=""
        value={toppingInput}
        className="addToppings__input"
        onChange={(e) => setToppingInput(e.target.value)}
      />
      <p onClick={handleAddTopping} className="addToppings__addButton">
        <AiOutlinePlus />
      </p>
    </div>
  );
};

export default AddToppings;
