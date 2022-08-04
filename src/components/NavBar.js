import '../styles/NavBar.css';
import Logo from '../assets/foodgallery.png';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import DataContext from '../context/DataContext';

const NavBar = () => {
  const { search, setSearch, navigate } = useContext(DataContext);

  useEffect(() => {
    const handleSearchNavigate = () => {
      search.length && navigate('/search');
    };
    handleSearchNavigate();
  }, [navigate, search.length]);

  return (
    <nav className="navbar fixed-top navBar">
      <div className="container-fluid">
        <Link className="navBar__homelink" to="/">
          <div className="navBar__logo">
            <img src={Logo} alt="" width="60" height="55" />
            <p>FoodGallary</p>
          </div>
        </Link>
        <form className="d-flex m-3 navBar__form" role="search" type="submit">
          <input
            className="form-control me-2"
            type="search"
            value={search}
            placeholder="search any dish"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
};
export default NavBar;
