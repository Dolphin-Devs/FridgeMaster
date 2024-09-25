
FROM python:3.8-slim

WORKDIR /FridgeMaster

COPY . .


RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install zappa


CMD ["zappa", "update", "dev"]
