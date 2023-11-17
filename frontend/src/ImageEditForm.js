import { useState } from "react";
import { useParams } from "react-router-dom";

import { Card, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { editImage } from "./api";
//import "./ImageEditForm.css";

/** Form component for editing an image
 * Props
 * - images:
 *  { file_name, uploaded_at, aws_image_src, caption, description, exif_data }
 *  and exif_data is JSON of variable length like { <exif-tag-name>: <value> }
 *
 * RouteList -> ImageEditForm
 */

function ImageEditForm({ images, getImages }) {

  const params = useParams();
  const fileName = params['name'];
  console.log("ImageEditForm, FILENAME=", fileName);

  const image = images.filter(i => i.file_name === fileName)[0];
  console.log("ImageEditForm image=", image);

  const [formData, setFormData] = useState({
    caption: image.caption,
    description: image.description,
    makeBW: false
  });

  console.log("ImageEditForm, formData=", formData);

  /** Update form input. */

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }


  /** Call parent function and clear form. */

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await editImage(
        {
          ...formData,
          file_name: image.file_name,
          makeBW: formData.makeBW === 'on'
        }
      );
      await getImages();
    } catch (errs) {
      console.log("There was an error");
    }
  }

  return (
    <Card className="NewImageForm border-light col-md-4 offset-md-4">
      <CardBody>
        <h1>Edit {image.file_name}</h1>
        <img
          className="w-75"
          alt={image.caption}
          src={`https://${image.aws_image_src}?${new Date().getTime()}`}
        />

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="caption">
              Caption
            </Label>
            <Input
              id="caption"
              name="caption"
              placeholder="Image Caption"
              value={formData.caption}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              placeholder="Image Description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              id="makeBW"
              name="makeBW"
              type="switch"
              checked={formData.makeBW}
              onChange={handleChange}
            />
            <Label for="makeBW">
              Make Black and White?
            </Label>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </CardBody>
    </Card>
  );
}

export default ImageEditForm;