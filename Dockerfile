FROM python:3.10-slim
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
COPY ./backend/requirements.txt /app/requirements.txt
WORKDIR /app
RUN apt-get update
RUN pip install -r requirements.txt
RUN apt-get update -yq \
    && apt-get -yq install curl gnupg ca-certificates \
    && curl -L https://deb.nodesource.com/setup_12.x | bash \
    && apt-get update -yq \
    && apt-get install -yq \
        nodejs \
    && rm -rf /var/lib/apt/lists/*
RUN npm install -g n
RUN n lts
RUN n prune
COPY ./frontend /app/frontend
COPY ./backend /app/backend
RUN cd frontend && npm install && npm run build
ENTRYPOINT [ "python" ]
CMD [ "backend/main.py" ]
