
DB_DIR=/var/lib/postgresql/data
DB=openprices
USER=sa
PASSWORD=amteki17

sudo docker run -v $DB_DIR:/var/lib/postgresql/data \
    -e POSTGRES_PASSWORD=$PASSWORD \
    -p 5432:5432 \
    postgres:alpine
