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
    getAllImages()
  }, []);

  async function getAllImages() {
      const imageData = await fetchImages();
      setImages(imageData.images);
      setIsLoading(false);
    }

  /** Submit new image to the API and update images state
   * Takes image: { image_file, caption, description, file_name }
   */

  async function addImage(imageToAdd) {
    const imageAdded = await submitNewImage(imageToAdd)

    setImages(formerImages => [...formerImages, imageAdded])
  }


  /**
   * Handle image search
   */

  async function searchImages(term) {
    const filteredImageData = await fetchImages(term);
    console.log('FILTERED IMAGE DATA=', filteredImageData)
    setImages(filteredImageData.images)
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        { !isLoading && (
        <RouteList
          images={images}
          addImage={addImage}
          searchImages={searchImages}
          getAllImages={getAllImages}/>)}
      </BrowserRouter>
    </div>
  );
}

export default App;
