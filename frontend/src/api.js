const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";


/** Get all images
 * Fetches all images from the api with an optional search term
 * for searching by file name and metadata.
 * Returns { images: [image, ... ] }
 * where image:
 *  { file_name, uploaded_at, aws_image_src, caption, description, exif_data }
 *  and exif_data is JSON of variable length like { <exif-tag-name>: <value> }
 */
export async function fetchImages(searchTerm) {

  const url = new URL(`${BASE_URL}/images`);

  const headers = {
    'content-type': 'application/json',
  };

  url.searchTerm = searchTerm ? new URLSearchParams(searchTerm).toString() : '';

  const response = await fetch(url, { method: 'GET', headers });

  const imagesData = await response.json();

  console.log('IMAGES DATA=', imagesData);

  return imagesData;
}
