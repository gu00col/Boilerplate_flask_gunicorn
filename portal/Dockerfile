FROM python:3.8.5

WORKDIR /app
COPY . .
COPY requirements.txt .
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install python3-flask-sqlalchemy -y
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
