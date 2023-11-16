import { Form, FormGroup, Label, Input, Card } from "reactstrap";

function NewImageForm() {
  return (
    <div className="NewImageForm">
      <Form>
      <FormGroup>
          <Label for="filename">
            Name of Image
          </Label>
          <Input
            id="filename"
            name="filename"
            placeholder="Name of file stored in Pixly"
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
          />
        </FormGroup>
        <FormGroup>
          <Label for="imageFile">
            JPEG File
          </Label>
          <Input
            id="imageFile"
            name="imageFile"
            type="file"
          />
        </FormGroup>
      </Form>
    </div>
  );
}

export default NewImageForm;