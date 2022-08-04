import { useContext, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import '../styles/Upload.css';
import { storage } from '../firebase';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import DataContext from '../context/DataContext';

const Upload = () => {
  const { setLocalDishList, setContinentalDishList, navigate } =
    useContext(DataContext);
  const [imageToupload, setImageToUpload] = useState(null);
  const [dishName, setDishName] = useState('');
  const [isLocal, setIsLocal] = useState(false);
  const [isVegan, setIsVegan] = useState(false);

  const category = isLocal ? 'local' : 'continental';

  const ImageObject = {
    id: v4(),
    image: imageToupload,
    name: dishName,
    category: category,
    vegan: isVegan,
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (imageToupload == null || dishName === '') {
      alert('form not completed, no image uploaded ❎');
    } else {
      const imageRef = ref(
        storage,
        `images/${ImageObject.category}/${ImageObject.name}`
      );
      uploadBytes(imageRef, ImageObject.image).then((snapshot) => {
        alert('Image Uploaded');
        const imageName = snapshot.metadata.name;
        console.log(imageName);
        getDownloadURL(snapshot.ref).then((url) => {
          ImageObject.image = url;
          ImageObject.category === 'local'
            ? setLocalDishList((prev) => [...prev, ImageObject])
            : setContinentalDishList((prev) => [...prev, ImageObject]);
        });
      });

      setImageToUpload(null);
      setDishName('');
      navigate('/');
    }
  };

  return (
    <form action="submit" className="upload">
      <h2>
        You can add any special local Ghanaian 🍲 or continental dish🍝 you have
        not seen in the Gallery
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
      <p>
        Vegan
        <input
          type="checkbox"
          onChange={(e) => setIsVegan(e.target.checked)}
          className="upload__checkbox"
        />
      </p>
      <button className="upload__button" onClick={handleUpload}>
        Upload <AiOutlineCloudUpload />
      </button>
    </form>
  );
};

export default Upload;
