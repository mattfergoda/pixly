import ImageCard from "./ImageCard";
import SearchBar from "./SearchBar";
import { fetchImages } from "./api";

/**
 *
 */
function ImageList({ images, searchImages }) {


  return (
    <>
      <div className="ImageList">
        <h1>All Images</h1>

      <SearchBar searchImages={searchImages}/>
       {images.map(image => <ImageCard image={image} key={image.file_name}/>)}

      </div>
    </>
  )
}

export default ImageList;