import { useEffect, useState, useRef, createContext } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../firebase';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const envPassword = process.env.REACT_APP_SUPER_SECRET_CODE;

  const effectRun = useRef(false);
  const [localDishList, setLocalDishList] = useState([]);
  const [continentalDishList, setContinentalDishList] = useState([]);
  const localImageListRef = ref(storage, 'images/local/');
  const continentalImageListRef = ref(storage, 'images/continental/');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [toppingInputList, setToppingInputList] = useState([]);

  useEffect(() => {
    if (effectRun.current === false) {
      listAll(localImageListRef).then((response) => {
        response.items.forEach((item) => {
          const imageName = item._location.path_.split('images/local/')[1];
          getDownloadURL(item).then((url) => {
            const imageList = {
              id: v4(),
              image: url,
              name: imageName,
              category: 'local',
              vegan: false,
            };
            setLocalDishList((prev) => [...prev, imageList]);
          });
        });
      });
      return () => {
        effectRun.current = true;
      };
    }
  }, [localImageListRef]);

  useEffect(() => {
    if (effectRun.current === false) {
      listAll(continentalImageListRef).then((response) => {
        response.items.forEach((item) => {
          const imageName = item._location.path_.split(
            'images/continental/'
          )[1];
          getDownloadURL(item).then((url) => {
            const imageList = {
              id: v4(),
              image: url,
              name: imageName,
              category: 'continental',
              vegan: false,
            };
            setContinentalDishList((prev) => [...prev, imageList]);
          });
        });
      });
      return () => {
        effectRun.current = true;
      };
    }
  }, [continentalImageListRef]);

  return (
    <DataContext.Provider
      value={{
        localDishList,
        continentalDishList,
        setLocalDishList,
        setContinentalDishList,
        search,
        setSearch,
        navigate,
        envPassword,
        toppingInputList,
        setToppingInputList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
