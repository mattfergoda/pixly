import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { fetchImages } from "./api";
import './App.css';

import RouteList from "./RouteList";

/**
 * Main logic component for Pixly
 *
 * State:
 * - images, [image, ... ] where image: *
 *  { file_name, uploaded_at, aws_image_src, caption, description, exif_data }
 *  and exif_data is JSON of variable length like { <exif-tag-name>: <value> }
 *
 * App -> { NavBar, RouteList }
 */
function App() {

  const [images, setImages] = useState([]);

  console.log('STATE IMAGES=', images);

  useEffect(function fetchImagesOnMount() {
    async function getAllImages() {
      const imageData = await fetchImages();
      setImages(imageData.images);
    }
    getAllImages();
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        {/* <NavBar /> */}
        <RouteList images={images} />
      </BrowserRouter>
    </div>
  );
}

export default App;
