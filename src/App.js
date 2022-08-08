import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Slider from './components/Slider';
import Filter from './components/Filter';
import Footer from './components/Footer';
import Upload from './components/Upload';
import './styles/App.css';
import { Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import Missing from './components/Missing';
import { DataProvider } from './context/DataContext';
import FoodPage from './components/FoodPage';

const App = () => {
  return (
    <div className="container-xl app">
      <DataProvider>
        <NavBar />
        <div className="app__space" />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Slider />
                <Filter />
              </div>
            }
          ></Route>
          <Route path="/foodpage" element={<FoodPage />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/upload" element={<Upload />}></Route>
          <Route path="*" element={<Missing />}></Route>
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
};

export default App;
