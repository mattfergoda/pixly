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
  console.log('SEARCH TERM=', searchTerm)

  const url = new URL(`${BASE_URL}/images`);

  const headers = {
    'content-type': 'application/multiform',
  };

  url.searchParams.set('searchTerm', searchTerm || '') 
  console.log('URL=', url)
  const response = await fetch(url, { method: 'GET', headers });

  const imagesData = await response.json();

  console.log('IMAGES DATA=', imagesData);

  return imagesData;
}

/** Submit a new image to the API
 * Takes multipart data: { image_file, caption, description, file_name }
 * Returns { image } where image is
 *  { file_name, uploaded_at, aws_image_src, caption, description, exif_data }
 *  and exif_data is JSON of variable length like { <exif-tag-name>: <value> }
 */

export async function submitNewImage(data) {
  const formData  = new FormData();

  for(const name in data) {
    formData.append(name, data[name]);
  }

  const url = new URL(`${BASE_URL}/images`);
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });

  const imageAdded = await response.json();

  return imageAdded

}