# chatapp-web
------------------------------------------------------------------

TODO

Tech Stack:
- DB: PosgreSQL


## Setup

Copy and customize each .env.example file to .env:
```
cp ./db/.env.example ./db/.env
```


## Run Containers

DB: PosgreSQL
```
cd db

# Build
docker build . -t db --no-cache
docker run --rm -itd --env-file .env -p 5432:5432 --network=backend --name=db db

# Test
docker container exec -it db sh
psql -U chatappwebuser chatappweb
\dt  # success if shows some tables - TODO SQL tests?
exit
```
