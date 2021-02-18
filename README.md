# chatapp-web

------------------------------------------------------------------

## About

Tech Stack:
- DB: PosgreSQL
- Server: NodeJS ExpressJS
- Client: React Redux

## Setup

Copy and *customize* each .env.example file to .env:
```
cp ./db/.env.example ./db/.env
cp ./server/.env.example ./server/.env
```

------------------------------------------------------------------
### Development

Startup the dev environment with the DB and Server with the below. You can add 
breakpoints in VSCode that are hit when anything hits the Server's line of code.
Config for VSCode debugger in `.vscode/launch.json`.
See https://code.visualstudio.com/docs/editor/debugging

Docker installed & running - No? See: //docs.docker.com/get-started/

```
# Remember: 
# node_modules cached in image, so must re-build on adding new modules
docker-compose rm -f {OPTIONAL_IMAGE_NAME}
docker-compose build --no-cache  {OPTIONAL_IMAGE_NAME}

# Note: adding `--build --force-recreate` will used cached *sometimes*.. 
# why above manual build, safer IMO.
docker-compose up

# Run when done, cleans up networks etc.
docker-compose down
```

#### Developer Notes

DB
- table IDs: all are generated UUIDs (uuid-ossp) that are 128bit HEX digits, not strings
- `chat_message` table: **important** message to self? use creator chat_user id for both from_chat_user_id and to_chat_user_id. This is a workaround/hack to work with Inner Join. W// to self, any message without to_chat_user_id would be excluded. A Left Outer Join would work but include messages from all chats. (more info see db/init.sql) *TODO probably a better way to do this*
- `chat_message` table: message_id intented for use with Client Transcript to have ordered message sequence (more convenient vs using id or timestamp)
- `chat_user` table: Why both an `id` and `account_id`? `id` alows a Chat User to have custom props per Chat. `account_id` just shares info like `username`, so Account has a 1 to many rel with Chat User and a Chat has a 1 to many rel  with Chat User.

Server
- ExpressJS app generated with `npm init & npx express-generator --no-view`
- ENV vars in package.json? Be careful of trailing spaces in set MY_VAR=*
- debug mode? prepend to npm command `set DEBUG=express:* & <MY_COMMAND>`
- AUTH done with JWT RS256 (TODO: cookies -vs- body, esp when add sockets?)

#### Debug

Somtimes it helps to build, run and inspect containers individually. Docker run crashes? Run without -d, so `docker run --rm -it ...`

TODO: network overlay to add frontend network for Server and Client

```
# DB
cd db
docker build . -t db --no-cache
docker run --rm -itd --env-file .env -p 5432:5432 --network=backend --name=db db
docker container exec -it db sh
psql -U $POSTGRES_USER $POSTGRES_DB      # e.g. `\dt` to verify create some tables

# SERVER
cd server
docker build . -t server --no-cache
docker run -itd --rm --env-file .env -p 3000:3000 --network=backend --name=server server
docker container exec -it server sh     # try pinging hosts db & client

# CLIENT
cd client
docker build . -t client --no-cache
docker run -itd --rm --env-file .env -p 3001:80 --network=backend --name=client client
docker container exec -it client sh     # Nginx image has very limited commands, hard to debug

# Note: docker logs -f <container-name>
```

#### Test

```
# DB manual tests (only if desperate, use below API tests almost always)
docker container exec -it db sh
createdb -U $POSTGRES_USER $POSTGRES_DB_TEST # ignore error about db existing,if any
psql -U $POSTGRES_USER $POSTGRES_DB_TEST
\i /docker-entrypoint-initdb.d/init.sql
\i /test.sql    # should list some rows, if so, success

# SERVER/API tests
cd server
npm run test
```

#### Test Notes

Docker sure has changed things. After some itterations, here are my thoughts:

For the DB:
- DB self unit tests? No, since driven by store procedures equiv to API driven
- SQL data setup? No, easy setup/down clean w/docker so API created more complete
- Separate Test DB? No, docker again easy setup/down, no worry about cleaning DB

For the Server/API:
- Whitebox/Unit test? No, Blackbox much less overhead sync funcs and lost focus
- Stubs & Spies &...? No, Docker again, can setup/teardown real test data easy
- Ok weirdo, what lib then? Postman F-ING ROCKS, real API/HTTP driven tests WOHO!

------------------------------------------------------------------
