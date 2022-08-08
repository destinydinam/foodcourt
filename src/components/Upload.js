import { useContext, useState } from 'react';
import { AiFillDelete, AiOutlineCloudUpload } from 'react-icons/ai';
import '../styles/Upload.css';
import { storage } from '../firebase';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import DataContext from '../context/DataContext';
import AddToppings from './AddToppings';

const Upload = () => {
  const {
    setLocalDishList,
    setContinentalDishList,
    navigate,
    toppingInputList,
    setToppingInputList,
    envPassword,
  } = useContext(DataContext);
  const [imageToupload, setImageToUpload] = useState(null);
  const [dishName, setDishName] = useState('');
  const [isLocal, setIsLocal] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const handleDelete = (topping) => {
    const newArray = toppingInputList.filter((food) => topping !== food);
    setToppingInputList(newArray);
  };

  const category = isLocal ? 'local' : 'continental';

  const ImageObject = {
    id: v4(),
    image: imageToupload,
    name: dishName,
    category: category,
    toppings: toppingInputList,
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (imageToupload == null || dishName === '') {
      alert('form not completed, no image uploaded ❎');
    } else {
      const imageRef = ref(
        storage,
        `images/${ImageObject.category}/${ImageObject.name}!${JSON.stringify(
          ImageObject.toppings
        )}`
      );
      uploadBytes(imageRef, ImageObject.image).then((snapshot) => {
        alert('Image Uploaded');
        getDownloadURL(snapshot.ref).then((url) => {
          const newObject = {
            id: ImageObject.id,
            image: url,
            name: `${ImageObject.name}!${JSON.stringify(ImageObject.toppings)}`,
            category: ImageObject.category,
          };
          newObject.category === 'local'
            ? setLocalDishList((prev) => [...prev, newObject])
            : setContinentalDishList((prev) => [...prev, newObject]);
        });
      });

      setImageToUpload(null);
      setDishName('');
      navigate('/');
      setToppingInputList([]);
    }
  };

  const handleAuth = () => passwordInput === envPassword && setIsPassword(true);

  return (
    <div>
      {isPassword === false ? (
        <div>
          <h2>Enter Password to access upload page</h2>
          <input
            type="text"
            value={passwordInput}
            className="upload__password"
            placeholder="password"
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button className="upload__passwordbutton" onClick={handleAuth}>
            Enter
          </button>
        </div>
      ) : (
        <form action="submit" className="upload">
          <h2>
            You can add any special local Ghanaian 🍲 or continental dish🍝 you
            have not seen in the Gallery
          </h2>
          <label>Food Image</label>
          <input
            type="file"
            className="upload__file"
            onChange={(e) => setImageToUpload(e.target.files[0])}
          />
          <label>Name of dish</label>
          <input
            type="text"
            placeholder="dish name"
            value={dishName}
            className="upload__name"
            onChange={(e) => setDishName(e.target.value)}
          />
          <h2>Categories</h2>
          <p>
            Local
            <input
              type="checkbox"
              checked={isLocal}
              onChange={(e) => setIsLocal(e.target.checked)}
              onClick={() => setIsLocal((current) => !current)}
              className="upload__checkbox"
            />
          </p>
          <p>
            Continental
            <input
              type="checkbox"
              checked={!isLocal}
              onChange={(e) => setIsLocal(!e.target.checked)}
              onClick={() => setIsLocal((current) => !current)}
              className="upload__checkbox"
            />
          </p>
          {toppingInputList.length ? (
            <div>
              <h1>Toppings List</h1>
              {toppingInputList.map((topping) => (
                <div key={topping} className="Upload__toppinglist">
                  <li>{topping}</li>
                  <AiFillDelete onClick={() => handleDelete(topping)} />
                </div>
              ))}
            </div>
          ) : (
            ''
          )}
          <div className="upload__toppings">
            <h2>Add Toppings</h2>
          </div>
          <AddToppings />
          <button className="upload__button" onClick={handleUpload}>
            Upload <AiOutlineCloudUpload />
          </button>
        </form>
      )}
    </div>
  );
};

export default Upload;
