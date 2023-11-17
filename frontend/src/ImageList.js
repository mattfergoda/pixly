import ImageCard from "./ImageCard";
import SearchBar from "./SearchBar";


/**
 *
 */
function ImageList({ images, searchImages }) {


  return (
    <>
      <div className="ImageList col-md-4 offset-md-4 m-3">
        <h1>All Images</h1>

      <SearchBar searchImages={searchImages}/>
       {images.map(image => <ImageCard image={image} key={image.file_name}/>)}

      </div>
    </>
  )
}

export default ImageList;