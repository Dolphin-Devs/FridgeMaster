FROM python:3.8-slim

WORKDIR /FridgeMaster

COPY . .

RUN pip install --upgrade pip


RUN python -m venv /FridgeMaster/handler_venv

RUN /bin/bash -c "source /FridgeMaster/handler_venv/bin/activate && pip install -r requirements.txt && pip install zappa"


CMD ["/bin/bash", "-c", "source /FridgeMaster/handler_venv/bin/activate && zappa update dev"]
