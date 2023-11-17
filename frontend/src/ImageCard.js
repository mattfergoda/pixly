import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap"


/**
 * Presentation focused component
 *
 * Props:
 * - image, { file_name, uploaded_at, aws_image_src, caption, description, exif_data }
 *
 * ImageList -> ImageCard
 */
function ImageCard({ image }) {

  return(
    <Card
  style={{
    width: '18rem'
  }}
>

  <img
    alt={ image.caption }
    src={`https://${ image.aws_image_src }`}
  />
  <CardBody>
    <CardTitle tag="h5">
      { image.file_name }
    </CardTitle>
    <CardSubtitle
      className="mb-2 text-muted"
      tag="h6"
    >
     { image.caption }
    </CardSubtitle>
    <CardText>
      { image.description }
    </CardText>
    <Button>
      Edit Image
    </Button>
  </CardBody>
</Card>
  )
}

export default ImageCard;