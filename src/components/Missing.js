import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../styles/Missing.css';

const Missing = () => {
  return (
    <div className="missing">
      <h1>Ooops 😕 page does not exist</h1>
      <Link to="/">
        <button className="btn warning missing__button">
          Go to homepage <AiFillHome />
        </button>
      </Link>
    </div>
  );
};

export default Missing;
