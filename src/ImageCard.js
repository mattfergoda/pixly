import { Link } from "react-router-dom";
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
    <Card className=" m-4"
  style={{
    width: '18rem'
  }}
>

  <img
    alt={ image.caption }
    src={`https://${ image.aws_image_src }?${new Date().getTime()}`}
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
    <Link to={`/images/${image.file_name}/edit`}>
      <Button>
        Edit Image
      </Button>
    </Link>
  </CardBody>
</Card>
  )
}

export default ImageCard;