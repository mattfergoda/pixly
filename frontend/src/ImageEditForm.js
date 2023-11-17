import { useState } from "react";
import { useParams } from "react-router-dom";

import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { editImage } from "./api";
import "./ImageEditForm.css";

function ImageEditForm({ images, getAllImages }) {

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

  console.log("ImageEditForm, formData=", formData)

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
      await getAllImages();
    } catch (errs) {
      console.log("There was an error");
    }
  }

  return (
    <div className="ImageEditForm">
      <h1>Edit {image.file_name}</h1>
      <img
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

    </div>
  );
}

export default ImageEditForm;