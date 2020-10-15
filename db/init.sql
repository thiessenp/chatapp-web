-- Creates inital POSTGRESQL ChatApp-Web tables to store messages etc.
--
-- Tests:
-- copy paste from `test.sql` in console, success if SQL results
--

-- For UUID ids
-- UUIDs add security since difficult to guess and gaurantee uniqueness. If the
-- data is not mutable, then a semantic key, like a column with names is fine to.
-- NOTE: UUIDs are 128bit HEX digits, not strings
CREATE EXTENSION "uuid-ossp";


DROP TABLE IF EXISTS chat_message;
DROP TABLE IF EXISTS chat_user;
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS account;

CREATE TABLE account (
    id uuid PRIMARY KEY default uuid_generate_v4(),
    username VARCHAR (50) NOT NULL,
    is_authenticated BOOLEAN DEFAULT FALSE
);

-- Parent, no knowledge of children (chat_message & chat_user)
CREATE TABLE chat (
    id uuid PRIMARY KEY default uuid_generate_v4(),
    name VARCHAR (50)
);

-- Child, knows about parent Chat & IS-A type of Account
CREATE TABLE chat_user (
    id uuid PRIMARY KEY default uuid_generate_v4(), -- Why? id & account_id? alows chat_user to exist in mulitple chats
    account_id uuid,
    chat_id uuid NOT NULL,
    is_typing BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_account_id FOREIGN KEY(account_id) REFERENCES account(id),
    CONSTRAINT fk_chat_id FOREIGN KEY(chat_id) REFERENCES chat(id)
);

-- Child, knows about parent
-- note 1-TO-1 rel w/ chat_user
CREATE TABLE chat_message (
    id uuid PRIMARY KEY default uuid_generate_v4(),
    message_id SERIAL,  -- note separate message_id for Client to have ordered message sequence
    chat_id uuid,
    timestamp timestamp DEFAULT now(), 
    from_chat_user_id uuid NOT NULL,
    to_chat_user_id uuid,   -- rare case TO a user but is a nice feature
    content VARCHAR (500) NOT NULL,
    attachments JSON, 
    CONSTRAINT fk_chat_id FOREIGN KEY(chat_id) REFERENCES chat(id),
    CONSTRAINT fk_from_chat_user_id FOREIGN KEY(from_chat_user_id) REFERENCES chat_user(id),
    CONSTRAINT fk_to_chat_user_id FOREIGN KEY(to_chat_user_id) REFERENCES chat_user(id)
);

-- Used in message lists to create an order in a message list, uuid gives uniqueness not order
-- SQL starts row indexing at 1, this starts at 0 to match Array indexes starting at 0
CREATE SEQUENCE message_id_sequence INCREMENT 1 START 0 MINVALUE 0 OWNED BY chat_message.message_id;
