import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

/** NewImageForm form component
 * State:
 * - formData: { file_name, caption, description, image_file }
 * - alerts: array of strings
 *
 * RouteList -> NewImageForm
 */

function NewImageForm({ addImage }) {
  const blankForm = {
    "file_name": "",
    "caption": "",
    "description": "",
    "image_file": ""
  };
  const [formData, setFormData] = useState(blankForm);
  //const [alerts, setAlerts] = useState([]);
  const navigate = useNavigate();

  console.log("NewImageForm formData=", formData);



  /** Update form input. */

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => (
      (name === 'image_file')
        ? {
          ...fData,
          image_file:  evt.target.files[0],
        }
        : {
          ...fData,
          [name]: value
        }
    ));
  }

  /** Call parent function and clear form. */

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await addImage(formData);
      navigate("/images");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="NewImageForm">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="file_name">
            Name of Image
          </Label>
          <Input
            id="file_name"
            name="file_name"
            placeholder="Name of file stored in Pixly"
            value={formData.file_name}
            onChange={handleChange}
          />
        </FormGroup>
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
          <Label for="image_file">
            JPEG File
          </Label>
          <Input
            id="image_file"
            name="image_file"
            type="file"
            onChange={handleChange}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
}

export default NewImageForm;