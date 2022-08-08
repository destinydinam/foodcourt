import '../styles/NavBar.css';
import Logo from '../assets/foodcourt.png';
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

  const handleHomePage = () => {
    setSearch('');
    navigate('/');
  };

  return (
    <nav className="navbar fixed-top navBar">
      <div className="container-fluid">
        <div className="navBar__logo" onClick={handleHomePage}>
          <img src={Logo} alt="" width="60" height="55" />
          <p>FoodCourt</p>
        </div>
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
