import os
from dotenv import load_dotenv

from flask import Flask, jsonify, request

from models import db, connect_db, Image

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

    image_file = request.files['image_file']


    


    return "hello"