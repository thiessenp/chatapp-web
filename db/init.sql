--
-- Creates inital POSTGRESQL ChatApp-Web tables to store messages etc.
--
-- Tests: in `test.sql`
--

--
-- For UUID ids
-- UUIDs add security since difficult to guess and gaurantee uniqueness. If the
-- data is not mutable, then a semantic key, like a column with names is fine to
-- NOTE: UUIDs are 128bit HEX digits, not strings
--
CREATE EXTENSION "uuid-ossp";


DROP VIEW IF EXISTS roster;
DROP VIEW IF EXISTS transcript;
DROP TABLE IF EXISTS chat_message;
DROP TABLE IF EXISTS chat_user;
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS account;

CREATE TABLE account (
    id uuid PRIMARY KEY default uuid_generate_v4(),
    username VARCHAR (50) NOT NULL UNIQUE,
    password VARCHAR (50) NOT NULL,
    is_authenticated BOOLEAN DEFAULT FALSE
);

--
-- Note at least one chat should always exist. System should auto a create 
-- default chat.
--
CREATE TABLE chat (
    id uuid PRIMARY KEY default uuid_generate_v4(),
    name VARCHAR (50)
);

--
-- Why? id & account_id? alows chat_user to exist in mulitple chats
--
CREATE TABLE chat_user (
    id uuid PRIMARY KEY default uuid_generate_v4(), 
    account_id uuid,
    chat_id uuid NOT NULL,
    is_typing BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_account_id FOREIGN KEY(account_id) REFERENCES account(id),
    CONSTRAINT fk_chat_id FOREIGN KEY(chat_id) REFERENCES chat(id)
);

--
-- Roster: Create View for API convenience
--
CREATE OR REPLACE VIEW roster AS 
SELECT chat_user.id, chat_id, username, is_authenticated, is_typing FROM chat_user 
INNER JOIN account ON chat_user.account_id = account.id;

--
-- Note IMPORTANT if a message is not to anyone, then put TO SELF. This is a 
-- workaround/hack to work with the Inner Join. Without to self, any message 
-- without to_chat_user_id would be excluded. A Left Outer Join would work but 
-- include messages from all Chats (break everything).
--
CREATE TABLE chat_message (
    id uuid PRIMARY KEY default uuid_generate_v4(),
    message_id SERIAL,  -- Note separate message_id for Client to have ordered message sequence
    chat_id uuid,
    timestamp timestamp DEFAULT now(), 
    from_chat_user_id uuid NOT NULL,
    to_chat_user_id uuid NOT NULL,   -- NOT To anyone? Then put TO SELF (messy?) DOCUMENT THIS IN API!
    content VARCHAR (500) NOT NULL,
    attachments JSON, 
    CONSTRAINT fk_chat_id FOREIGN KEY(chat_id) REFERENCES chat(id),
    CONSTRAINT fk_from_chat_user_id FOREIGN KEY(from_chat_user_id) REFERENCES chat_user(id),
    CONSTRAINT fk_to_chat_user_id FOREIGN KEY(to_chat_user_id) REFERENCES chat_user(id)
);

--
-- Transcript: Create View for API convenience
-- note had to use aliases with inner join, is this messy?
--
CREATE OR REPLACE VIEW transcript as 
SELECT chat_message.id, message_id, chat_message.chat_id, timestamp, from_chat_user_id, account_from.username AS from_chat_user_username, to_chat_user_id, account_to.username AS to_chat_user_username, content, attachments 
FROM chat_message 
INNER JOIN chat_user chat_user_from ON chat_message.from_chat_user_id = chat_user_from.id 
INNER JOIN account account_from ON chat_user_from.account_id = account_from.id 
INNER JOIN chat_user chat_user_to ON chat_message.to_chat_user_id = chat_user_to.id 
INNER JOIN account account_to ON chat_user_to.account_id = account_to.id;


--
-- Used in message lists to create an order in a message list, uuid gives uniqueness not order
-- SQL starts row indexing at 1, this starts at 0 to match Array indexes starting at 0
--
CREATE SEQUENCE message_id_sequence INCREMENT 1 START 0 MINVALUE 0 OWNED BY chat_message.message_id;


---
--- Create a default initial chat room as a starting point for user to connect to.
---
INSERT INTO chat (name) VALUES ('default');

---
--- Create a default initial admin to do admin things.
---
INSERT INTO account (username, password) VALUES ('admin', 'changeme');

