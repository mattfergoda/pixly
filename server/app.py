import os
import io

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

from models import db, connect_db, Image
from image_utils import scrape_exif, convert_monochrome, convert_to_PIL_image, transpose
from s3 import upload_file, get_s3_file

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", 'postgresql:///pixly')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True


connect_db(app)


@app.get("/images")
def get_all_images():
    """ Returns JSON like { images: [image, ...] }
        where image is { file_name, caption, description, aws_image_src, exif_data }
    """

    images = Image.query.all()

    serialized = [img.serialize() for img in images]

    return jsonify(images=serialized)


@app.get("/images/<string:file_name>")
def get_image(file_name):
    """ Returns JSON like { file_name, caption, description, aws_image_src, exif_data }
    """

    image = Image.query.get(file_name)

    if not image:
        return jsonify(error={
            "status": "404",
            "message": "Image not found"
        }), 404

    return jsonify(image=image.serialize())



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

    # check if image_file filename is already in db.
    if Image.query.get(file_name):
        return jsonify(error={
            "status": "400",
            "message": "Image name already taken"
        }), 400

    # scrape metadata
    exif_data = scrape_exif(image_file)

    # replace file reading 'cursor' to beginning because it read already
    image_file.seek(0)

    # save image in s3 and get back image url
    # content_type = image_file.content_type
    aws_image_src = upload_file(image_file, file_name)

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

    return (jsonify(image={
        "file_name": file_name,
        "caption": caption,
        "description": description,
        "aws_image_src": aws_image_src,
        "exif_data": exif_data
    }), 201)



@app.patch("/images/<string:file_name>")
def edit_image(file_name):
    """ Takes in an object with the properties to edit {property: new value, ... }"""

    image = Image.query.get(file_name)

    if not image:
        return jsonify(error={
            "status": "404",
            "message": "Image not found"
        }), 404

    image.caption = request.json.get('caption', image.caption)
    image.description = request.json.get('description',image.description)
    bw = request.json.get('bw')

    if bw is True:

        # download file from s3
        image_binary = get_s3_file(file_name)

        # create PIL Image
        img = convert_to_PIL_image(image_binary)

        # convert to black and white
        bw_img = convert_monochrome(img)
        bw_img = transpose(bw_img)

        # save updated image in s3
        bw_img.seek(0)
        bw_img_bytes_arr = io.BytesIO()
        bw_img.save(bw_img_bytes_arr, format='JPEG')
        bw_img_bytes = bw_img_bytes_arr.getvalue()

        upload_file(bw_img_bytes, file_name)

        bw_img_bytes_arr.close()

    # update postgres db
    db.session.commit()

    return jsonify(msg=f"sucessfully updated {file_name}")