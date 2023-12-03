import ImageCard from "./ImageCard";
import SearchBar from "./SearchBar";


/** Presentational component for displaying images
 * Props:
 * - images:
 *  { file_name, uploaded_at, aws_image_src, caption, description, exif_data }
 *  and exif_data is JSON of variable length like { <exif-tag-name>: <value> }
 * - searchImages: Function for handling searching images, called in ancestor.
 *
 * RouteList -> ImageList
 */

function ImageList({ images, searchImages }) {


  return (
    <>
      <div className="ImageList col-md-4 offset-md-4 m-3">
        <h1>All Images</h1>

      <SearchBar searchImages={searchImages}/>
       {images.map(image => <ImageCard image={image} key={image.file_name}/>)}
       {images.length === 0 && <h4>No images match your search.</h4>}
      </div>
    </>
  )
}

export default ImageList;