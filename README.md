# chatapp-web

------------------------------------------------------------------

## About

Tech Stack:
- DB: PosgreSQL
- Server: NodeJS ExpressJS

### Notes

- Server:generated with `npx express-generator --no-view`


## Setup

Copy and *customize* each .env.example file to .env:
```
cp ./db/.env.example ./db/.env
```


## Run Containers

DB: PosgreSQL
- TODO Test move to docker-compose?
```
# Build
cd db
docker build . -t db --no-cache
docker run --rm -itd --env-file .env -p 5432:5432 --network=backend --name=db db

# Debug
docker container exec -it db sh
psql -U $POSTGRES_USER $POSTGRES_DB             # e.g. `\dt` to verify create some tables

# Test
docker container exec -it db sh
createdb -U $POSTGRES_USER $POSTGRES_DB_TEST    # ignore error about db existing, if any
psql -U $POSTGRES_USER $POSTGRES_DB_TEST
\i /docker-entrypoint-initdb.d/init.sql
\i /test.sql                                    # should list some rows, if so, success
exit
```

SERVER: Nodejs
```
# Build
n/a - convince me of the value of an Express prod build?

# Debug
cd server
npm run debug

```

## Developer Notes

DB
- table IDs: all are generated UUIDs (uuid-ossp) that are 128bit HEX digits, not strings
- `chat_message` table: **important** message to self? use creator chat_user id for both from_chat_user_id and to_chat_user_id. This is a workaround/hack to work with Inner Join. W// to self, any message without to_chat_user_id would be excluded. A Left Outer Join would work but include messages from all chats. (more info see db/init.sql) *TODO probably a better way to do this*
- `chat_message` table: message_id intented for use with Client Transcript to have ordered message sequence (more convenient vs using id or timestamp)
- `chat_user` table: Why both an `id` and `account_id`? `id` alows a Chat User to have custom props per Chat. `account_id` just shares info like `username`, so Account has a 1 to many rel with Chat User and a Chat has a 1 to many rel  with Chat User.

Server
- ENV vars in package.json? Be careful of trailing spaces in set MY_VAR=*
- debug mode? prepend to npm command `set DEBUG=express:* & <MY_COMMAND>`