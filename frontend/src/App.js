import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { fetchImages, submitNewImage } from "./api";
import './App.css';

import RouteList from "./RouteList";
import Navigation from './Navigation';

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
  const [isLoading, setIsLoading] = useState(true);

  console.log('STATE IMAGES=', images);

  useEffect(function fetchImagesOnMount() {
    getImages();
  }, []);

  /** Get all images from the API and update Images state
   * Takes optional parameter searchTerm.
   */

  async function getImages(searchTerm) {
    const imageData = await fetchImages(searchTerm);
    setImages(imageData.images);
    setIsLoading(false);
  }

  /** Submit new image to the API and update images state
   * Takes image: { image_file, caption, description, file_name }
   */

  async function addImage(imageToAdd) {
    const imageAdded = await submitNewImage(imageToAdd);

    setImages(formerImages => [...formerImages, imageAdded]);
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        {!isLoading && (
          <RouteList
            images={images}
            addImage={addImage}
            getImages={getImages} />)}
      </BrowserRouter>
    </div>
  );
}

export default App;
