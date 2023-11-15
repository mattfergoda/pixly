"""Models for Pixly."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()



class Metadata(db.Model):
    """ Data model for exif tags on images """

    __tablename__ = "metadata"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True)

    # 37377
    tag = db.Column(
        db.Integer,
        nullable=False
    )

    # 'ShutterSpeedValue'
    tag_name = db.Column(
        db.String,
    )

    # 1/400
    tag_value = db.Column(
        db.String(200),

    )






class Image(db.Model):
    """Data model for Image"""

    __tablename__ = "images"

    image_name = db.Column(
        db.String(50),
        primary_key=True)

    # def to_dict(self):
    #     """Serialize cupcake to a dict of cupcake info."""

    #     return {
    #         "id": self.id,
    #         "flavor": self.flavor,
    #         "rating": self.rating,
    #         "size": self.size,
    #         "image_url": self.image_url,
    #     }


def connect_db(app):
    """Connect to database."""

    app.app_context().push()
    db.app = app
    db.init_app(app)
