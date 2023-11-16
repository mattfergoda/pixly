const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

class PixlyApi {
  /** Get all companies
   * Fetches all companies from the api with an optional search term
   * for searching by file name and metadata.
   * Returns { images: [image, ... ] }
   * where image:
   *  { file_name, uploaded_at, aws_image_src, caption, description, exif_data }
   *  and exif_data is JSON of variable length like { <exif-tag-name>: <value> }
   */
}