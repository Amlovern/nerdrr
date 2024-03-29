from flask_wtf import FlaskForm
from wtforms.fields import IntegerField, TextAreaField, StringField
from wtforms.validators import DataRequired, Length, Regexp, NumberRange

class GigForm(FlaskForm):
    ownerId = IntegerField('ownerId', validators=[DataRequired(message='Please enter a valid Owner ID.')])
    categoryId = IntegerField('categoryId', validators=[DataRequired(message='Please enter a valid Category ID.')])
    title = StringField('title', validators=[DataRequired(message='Please enter a valid Title.'),
        Length(min=1, max=100, message='Title must be less than 100 characters.')
    ])
    description = TextAreaField('description', validators=[
        Length(min=0, max=500, message='Description must be less than 500 characters.')
    ])
    price = IntegerField('price', validators=[DataRequired(message='Please enter a valid Price.')])
    deliveryTimeline = IntegerField('deliveryTimeline', validators=[DataRequired(message='Please enter a valid Delivery Timeline in days.')])
    returnTimeline = IntegerField('returnTimeline', validators=[
        DataRequired(message='Please enter a valid Delivery Timeline in days.'),
        NumberRange(min=0, max=100, message='Cancellation timeline must be between 0 and 100 days.')
    ])