FROM python:3.10
ENV PYTHONUNBUFFERED=true

ADD requirements.txt .
RUN apt install g++
RUN pip3 install -r requirements.txt
COPY . .

CMD ["uvicorn", "app.main:app","--reload"]

