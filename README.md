# chatapp-web

------------------------------------------------------------------

## About

Tech Stack:
- DB: PosgreSQL
- Server: NodeJS ExpressJS

## Setup

Copy and *customize* each .env.example file to .env:
```
cp ./db/.env.example ./db/.env
```

### Dev

Startup the dev environment with the DB and Server with the below. You can add 
breakpoints in VSCode that are hit when anything hits the Server's line of code.
Config for VSCode debugger in `.vscode/launch.json`.
See https://code.visualstudio.com/docs/editor/debugging

```
docker-compose build --no-cache # Important to run after e.g. new node_module, or just get cached (no new node_module)
docker-compose up               # Adding `--build --force-recreate` will used cached.. why above build
docker-compose down             # Run when done, cleans up networks etc.
```

### Debug

Somtimes it helps to build, run and inspect containers individually.

```
# DB
cd db
docker build . -t db --no-cache
docker run --rm -itd --env-file .env -p 5432:5432 --network=backend --name=db db
docker container exec -it db sh
psql -U $POSTGRES_USER $POSTGRES_DB             # e.g. `\dt` to verify create some tables

# DB manual tests
docker container exec -it db sh
createdb -U $POSTGRES_USER $POSTGRES_DB_TEST    # ignore error about db existing, if any
psql -U $POSTGRES_USER $POSTGRES_DB_TEST
\i /docker-entrypoint-initdb.d/init.sql
\i /test.sql                                    # should list some rows, if so, success

# SERVER
cd server
docker build . -t server --no-cache
docker run -itd --rm --env-file .env -p 3000:3000 --network=backend --name=server server
docker container exec -it server sh     # try pinging hosts db & client

# SERVER unit tests
TODO

```


## Developer Notes

Why not test with Server isolated from DB with mocks? Docker-compose arguable removes the need for this (spins up environment etc.)

DB
- table IDs: all are generated UUIDs (uuid-ossp) that are 128bit HEX digits, not strings
- `chat_message` table: **important** message to self? use creator chat_user id for both from_chat_user_id and to_chat_user_id. This is a workaround/hack to work with Inner Join. W// to self, any message without to_chat_user_id would be excluded. A Left Outer Join would work but include messages from all chats. (more info see db/init.sql) *TODO probably a better way to do this*
- `chat_message` table: message_id intented for use with Client Transcript to have ordered message sequence (more convenient vs using id or timestamp)
- `chat_user` table: Why both an `id` and `account_id`? `id` alows a Chat User to have custom props per Chat. `account_id` just shares info like `username`, so Account has a 1 to many rel with Chat User and a Chat has a 1 to many rel  with Chat User.

Server
- ExpressJS app generated with `npm init & npx express-generator --no-view`
- ENV vars in package.json? Be careful of trailing spaces in set MY_VAR=*
- debug mode? prepend to npm command `set DEBUG=express:* & <MY_COMMAND>`