const { Client } = require('pg');
const migrations = require("./sql_tables/tables").migrations;
const radios = require("./sql_tables/supported_radios").RADIOS;
const updateRadioQuery = require("./sql_tables/supported_radios").UPDATE_QUERY;

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.LAIN_HOST_DB,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.LAIN_HOST_PORT
})

client.connect().catch((e) => console.log("Error when connecting to DB: " + e))

// Initial Importing of information
migrations.forEach((migration) => {
    client.query(migration, (err, res) => {
        err ? console.log(err) : null;
        console.log(res);
    });
});

radios.forEach(async (radio) => {
    let values = [radio.name, radio.url, radio.description];
    updateRadioQuery.values = values;
    await client.query(updateRadioQuery).catch(e => console.log(e.stack));
});

// Radio functions
let getAllRadiosQuery = {
    name: 'get-all-radios',
    text: 'select name, description from radios',
    values: []
}

async function getAvailableRadios() {
    return await client.query(getAllRadiosQuery).then(res => res.rows).catch(e => {
        console.log(e.stack);
        return [];
    });
}

let getRadioQuery = {
    name: 'get-radio',
    text: 'select name, url from radios where name = $1',
    values: []
}

async function getRadio(radioName) {
    let radioNameArgs = [radioName];
    getRadioQuery.values = radioNameArgs;
    return await client.query(getRadioQuery).then(res => res.rows[0]).catch(e => {
        console.log(e.stack);
        return null;
    })
}

let doesRadioExistQuery = {
    name: 'does-radio-exist',
    text: 'select exists(select 1 from radios where name = $1);',
    values: []
}

async function doesRadioExist(radioName) {
    doesRadioExistQuery.values = [radioName];
    return await client.query(doesRadioExistQuery).then(res => res.rows[0].exists).catch(e => console.log(e));
}


exports.client = client;
exports.getAvailableRadios = getAvailableRadios;
exports.getRadio = getRadio;
exports.doesRadioExist = doesRadioExist;