'use strict'

// Configuracion del server

// // // // // // // // // // // // // // //
// Local Configurations
// const sqlConfig = {
//     user: 'sa',
//     password: '12345',
//     database: 'bdProyecto',
//     server: 'DanielHT\\SQLEXPRESS',
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     options: {
//         encrypt: false, // for azure
//         trustServerCertificate: false // change to true for local dev / self-signed certs
//     }
// }
const sqlConfig = {
    user: 'AMDP',
    password: 'perico__123',
    database: 'DBAntojitos',
    server: 'serverschool.database.windows.net',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}

module.exports = sqlConfig