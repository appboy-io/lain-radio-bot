const create_radio_table = "CREATE TABLE IF NOT EXISTS radios (" +
"id SERIAL PRIMARY KEY NOT NULL," +
"url TEXT NOT NULL," +
"name VARCHAR(255)," +
"description TEXT NOT NULL);"

const migrations = [create_radio_table];

exports.migrations = migrations;