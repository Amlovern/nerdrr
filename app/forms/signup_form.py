from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def password_match(form, field):
    # Checking if password and confirm password match
    password = form.password.data
    confirmPassword = field.data
    if password != confirmPassword:
        raise ValidationError('Passwords must match.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Please enter a valid Username.'), username_exists])
    email = StringField('email', validators=[DataRequired(message='Please enter a valid Email.'), user_exists])
    password = StringField('password', validators=[DataRequired(message='Please enter a valid Password.')])
    confirmPassword = StringField('confirmPassword', validators=[DataRequired(message='Please repeat Password.'), password_match])
