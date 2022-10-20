FROM python:latest
COPY ./backend/requirements.txt /app/requirements.txt
WORKDIR /app
RUN apt-get update
RUN pip install -r requirements.txt
COPY ./backend /app
RUN apt-get update -yq \
    && apt-get -yq install curl gnupg ca-certificates \
    && curl -L https://deb.nodesource.com/setup_12.x | bash \
    && apt-get update -yq \
    && apt-get install -yq \
        nodejs \
    && rm -rf /var/lib/apt/lists/*
RUN npm install -g npm@latest
COPY ./frontend /app/frontend
COPY ./backend /app/backend
COPY ./backend/website/data.db /db/data.db
RUN cd frontend && npm install && npm run build
ENTRYPOINT [ "python" ]
CMD [ "backend/main.py" ]