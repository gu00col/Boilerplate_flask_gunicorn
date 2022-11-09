from app import api, app, cache
from flask_restful import Resource, reqparse
import requests
import simplejson as json
import time
import sys
import jwt
from werkzeug.security import generate_password_hash



class Teste(Resource):

    def get(self):
        return {'message': 'Hello World!'}

api.add_resource(Teste, '/api/teste')