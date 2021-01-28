const RADIOS = [];

let LAIN_CYBERIA_RADIO = {
    name: "cyberia",
    url: "https://lainon.life/radio/cyberia.ogg",
    description: "Cyber radio from LainChan"
}
RADIOS.push(LAIN_CYBERIA_RADIO);

let LAIN_SWING_RADIO = {
    name: "swing",
    url: "https://lainon.life/radio/swing.ogg",
    description: "Swing radio from LainChan"
}
RADIOS.push(LAIN_SWING_RADIO);

let LAIN_CAFE_RADIO = {
    name: "cafe",
    url: "https://lainon.life/radio/cafe.ogg",
    description: "Cafe radio from LainChan"
}
RADIOS.push(LAIN_CAFE_RADIO);

let LAIN_EVERYTHING_RADIO = {
    name: "everything",
    url: "https://lainon.life/radio/everything.ogg",
    description: "All radio mix from LainChan"
}
RADIOS.push(LAIN_EVERYTHING_RADIO);

let UPDATE_QUERY = {
    name: 'update-radios',
    text: 'insert into radios (name, url, description) select $1, $2, $3 where not exists (select 1 from radios where name = $1);',
    values: []
}

exports.RADIOS = RADIOS;
exports.UPDATE_QUERY = UPDATE_QUERY