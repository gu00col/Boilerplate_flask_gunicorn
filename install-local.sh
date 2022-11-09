#!/bin/bash
apt-get update
apt-get upgrade -y
apt-get install python3-flask-sqlalchemy -y
pip3 install --upgrade pip
pip3 install --no-cache-dir -r ./app/requirements.txt