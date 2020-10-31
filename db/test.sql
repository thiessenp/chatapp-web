--
-- TESTS
--
-- IMPORTANT: FILE DEPRECATED BY DOCKER USE - here for posterity?
-- (though could use for manual testing?)
--
-- Basic tests to make sure the table structure works as intended. This is done
-- by an example set of inserts with a select that should return data. Success 
-- if the bottom Selects return the exptect.
--
-- Why no test lib?
-- From what I could find, it looks like most SQL test libs use SQL functions to
-- assert values. This seems clunky to me and to have no added value vs. an API 
-- testing the results. E.g. test lib: https://github.com/adrianandrei-ca/pgunit
--

--
-- Insert Some data
-- note uuid's copy pasted from past examples
--

-- Accounts x3
INSERT INTO account (id, username, password) VALUES ('a2d45b9b-e6ee-4b2c-ac0a-ef2434890ad5', 'username1', 'password');
INSERT INTO account (id, username, password) VALUES ('b2955cf4-a082-46df-9257-f890ed4a0f7e', 'username2', 'password');
INSERT INTO account (id, username, password) VALUES ('38b06faf-2289-4f7a-ad17-650056443ba6', 'username3', 'password');

-- Chat1 Data
INSERT INTO chat (id, name) VALUES ('f729dd6c-a130-4725-9d98-10137727a821', 'chat1');
INSERT INTO chat_user (id, account_id, chat_id) VALUES ('b84c84c6-7a27-42b7-95c4-745ecbefc3d3', 'a2d45b9b-e6ee-4b2c-ac0a-ef2434890ad5', 'f729dd6c-a130-4725-9d98-10137727a821');
INSERT INTO chat_user (id, account_id, chat_id) VALUES ('0ba9b218-f4b2-4c81-b10e-df2a5ff681d0', 'b2955cf4-a082-46df-9257-f890ed4a0f7e', 'f729dd6c-a130-4725-9d98-10137727a821');
INSERT INTO chat_user (id, account_id, chat_id) VALUES ('791be344-1acb-4d15-9284-fe325edfb481', '38b06faf-2289-4f7a-ad17-650056443ba6', 'f729dd6c-a130-4725-9d98-10137727a821');
-- message from username1 to username2
INSERT INTO chat_message (chat_id, from_chat_user_id, to_chat_user_id, content) VALUES('f729dd6c-a130-4725-9d98-10137727a821', 'b84c84c6-7a27-42b7-95c4-745ecbefc3d3', '0ba9b218-f4b2-4c81-b10e-df2a5ff681d0', 'content - message from username1 to username2 (chat1)');
-- message from username2 to username1
INSERT INTO chat_message (chat_id, from_chat_user_id, to_chat_user_id, content) VALUES('f729dd6c-a130-4725-9d98-10137727a821', '0ba9b218-f4b2-4c81-b10e-df2a5ff681d0', 'b84c84c6-7a27-42b7-95c4-745ecbefc3d3', 'content - message from username2 to username1 (chat1)');
-- message from username3 to no user (general message), so fill as TO SELF
INSERT INTO chat_message (chat_id, from_chat_user_id, to_chat_user_id, content) VALUES('f729dd6c-a130-4725-9d98-10137727a821', '791be344-1acb-4d15-9284-fe325edfb481', '791be344-1acb-4d15-9284-fe325edfb481', 'content - message from username3 to the chat (no specific user) (chat1)');

-- Chat2 Data
INSERT INTO chat (id, name) VALUES ('b863b0ba-44ff-49d4-a3a8-d62b59cb90fd', 'chat2');
INSERT INTO chat_user (id, account_id, chat_id) VALUES ('477519de-f226-42a1-bd76-750f02f025fe', 'a2d45b9b-e6ee-4b2c-ac0a-ef2434890ad5', 'b863b0ba-44ff-49d4-a3a8-d62b59cb90fd');
INSERT INTO chat_user (id, account_id, chat_id) VALUES ('739e2036-18ab-48a6-b4c3-1fa506e08190', 'b2955cf4-a082-46df-9257-f890ed4a0f7e', 'b863b0ba-44ff-49d4-a3a8-d62b59cb90fd');
INSERT INTO chat_user (id, account_id, chat_id) VALUES ('eac92561-0666-47dc-9cac-f7268edf088c', '38b06faf-2289-4f7a-ad17-650056443ba6', 'b863b0ba-44ff-49d4-a3a8-d62b59cb90fd');
-- message from username1 to username2
INSERT INTO chat_message (chat_id, from_chat_user_id, to_chat_user_id, content) VALUES('b863b0ba-44ff-49d4-a3a8-d62b59cb90fd', '477519de-f226-42a1-bd76-750f02f025fe', '739e2036-18ab-48a6-b4c3-1fa506e08190', 'content - message from username1 to username2 (chat2)');
-- message from username2 to username1
INSERT INTO chat_message (chat_id, from_chat_user_id, to_chat_user_id, content) VALUES('b863b0ba-44ff-49d4-a3a8-d62b59cb90fd', '739e2036-18ab-48a6-b4c3-1fa506e08190', '477519de-f226-42a1-bd76-750f02f025fe', 'content - message from username2 to username1 (chat2)');
-- message from username3 to no user (general message), so fill as TO SELF
INSERT INTO chat_message (chat_id, from_chat_user_id, to_chat_user_id, content) VALUES('b863b0ba-44ff-49d4-a3a8-d62b59cb90fd', 'eac92561-0666-47dc-9cac-f7268edf088c', 'eac92561-0666-47dc-9cac-f7268edf088c', 'content - message from username3 to self/the-chat (chat2)');
-- message from username3 to no user (general message), so fill as TO SELF
INSERT INTO chat_message (chat_id, from_chat_user_id, to_chat_user_id, content) VALUES('b863b0ba-44ff-49d4-a3a8-d62b59cb90fd', 'eac92561-0666-47dc-9cac-f7268edf088c', 'eac92561-0666-47dc-9cac-f7268edf088c', '(again) content - message from username3 to self/the-chat (chat2)');


--
-- Get some data
--

-- Roster & Transcript from Chat1
-- Success if returns 3 rows
SELECT * FROM roster WHERE chat_id = 'f729dd6c-a130-4725-9d98-10137727a821';
SELECT * FROM transcript WHERE chat_id = 'f729dd6c-a130-4725-9d98-10137727a821';

-- Roster & Transcript from Chat2
-- Success if returns 4 rows
SELECT * FROM roster WHERE chat_id = 'b863b0ba-44ff-49d4-a3a8-d62b59cb90fd';
SELECT * FROM transcript WHERE chat_id = 'b863b0ba-44ff-49d4-a3a8-d62b59cb90fd';
