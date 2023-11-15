import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request

from models import db, connect_db, Image
from exif import scrape_exif
from s3 import upload_file

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", 'postgresql:///pixly')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)



# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


@app.post("/images")
def upload_image():
    """ Takes in a multipart form:
    { caption: 'Debbie at sunset', description: 'Blessed to have captured this moment,
      image_file: [binary]

      Returns
    }
    """
    caption = request.form['caption']
    description = request.form['description']
    file_name = request.form['file_name']
    image_file = request.files['image_file']

    print('IMAGE FILE', image_file.stream)

    # check if image_file filename is already in db.
    # image = Image.query.get(file_name)
    # if image:
    #     return jsonify(error={
    #         "status": "400",
    #         "message": "Image name already taken"
    #     })

    # scrape metadata
    exif_data = scrape_exif(image_file)

    # save image in s3 and get back image url
    content_type = image_file.content_type
    print('CONTENT-TYPE=', image_file.content_type) #CONTENT-TYPE= image/jpeg

    aws_image_src = upload_file(image_file.stream, file_name, content_type)

    # save metadata and other data in db.
    new_image = Image(
        file_name=file_name,
        caption=caption,
        description=description,
        aws_image_src=aws_image_src,
        exif_data=exif_data
    )

    db.session.add(new_image)
    db.session.commit()

    # figure out what we send back to the user and send it.

    # make this 201
    return jsonify(image={
        "file_name": file_name,
        "caption": caption,
        "description": description,
        "aws_image_src": aws_image_src,
        "exif_data": exif_data
    })


### images are not displaying even though they're moving around correctly,
# able to upload to s3 via API
# able to pull metadata
# file is getting corrupted and won't display online or when downloaded
# did a lot with validating content type, seems to be working
# did research on the file storage object that comes back from request.files
