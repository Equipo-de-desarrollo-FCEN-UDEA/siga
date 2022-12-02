FROM python:3.10
ENV PYTHONUNBUFFERED=true

ADD requirements.txt .
RUN apt install g++
RUN pip3 install -r requirements.txt
COPY ./ ./app
WORKDIR /app/


RUN apt-get clean && apt-get update && apt-get install -y locales
RUN sed -i -e 's/# es_ES.UTF-8 UTF-8/es_ES.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales
RUN locale-gen es_ES.UTF-8
ENV LANG es_ES.UTF-8
ENV LANGUAGE es_ES:es
ENV LC_ALL es_ES.UTF-8


CMD ["uvicorn", "app.main:app", "--host=0.0.0.0", "--port", "8000", "--reload"]

