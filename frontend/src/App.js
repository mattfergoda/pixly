import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';

/**
 *
 */

function App() {

  const [images, setImages] = useState([]);

  useEffect(function fetchImagesOnMount() {
    async function getAllImages() {
      const images = await fetchImages();
    }
  })

  return (
    <div className="App">

    </div>
  );
}

export default App;
