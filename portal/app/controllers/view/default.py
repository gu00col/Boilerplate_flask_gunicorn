from app import app, cache
from flask import Flask, render_template, request, redirect, session, flash, url_for, jsonify
import requests
import simplejson as json
import time
import datetime
from dateutil.parser import parse
import bcrypt
import base64
import time
import sys
import datetime
from datetime import datetime, timedelta


@app.route('/', methods=['GET'])
def index():


    if request.method == "GET":
        return render_template('index.html')

  
    
    
