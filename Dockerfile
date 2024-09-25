FROM python:3.8-slim

WORKDIR /FridgeMaster

COPY . .


RUN pip install --upgrade pip


RUN python -m venv /FridgeMaster/handler_venv


RUN /bin/bash -c "source /FridgeMaster/handler_venv/bin/activate && \
    pip install setuptools==57.5.0 distlib && \
    pip install -r requirements.txt && pip install zappa"


RUN apt-get update && apt-get install -y python3-distutils


CMD ["/bin/bash", "-c", "source /FridgeMaster/handler_venv/bin/activate && zappa update dev"]
