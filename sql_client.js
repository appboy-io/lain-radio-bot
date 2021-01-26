const { Client } = require('pg');

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.LAIN_HOST_DB,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.LAIN_HOST_PORT
})

client.connect().catch((e) => console.log("Error when connecting to DB: " + e))

exports.client = client