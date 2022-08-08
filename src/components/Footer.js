import '../styles/Footer.css';
import { AiFillGithub, AiOutlineCloudUpload } from 'react-icons/ai';
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const Footer = () => {
  const { navigate, setSearch } = useContext(DataContext);

  const handleNavigate = () => {
    setSearch('');
    navigate('/upload');
  };

  return (
    <footer className="row text-center container-xl">
      <div className="footer__container">
        <div className="col footer__upload" onClick={handleNavigate}>
          Upload a dish
          <i className="footer__icons">
            <AiOutlineCloudUpload />
          </i>
        </div>
        <div className="col footer__github">
          <a target="blank" href="https://github.com/destinydinam">
            GitHub
            <i className="footer__icons">
              <AiFillGithub />
            </i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
