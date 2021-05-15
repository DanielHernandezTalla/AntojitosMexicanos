'use strict'

// Dependences
const mssql = require('mssql')
const config = require('./config.js')

async function getData() {
    try {
        let con = await mssql.connect(config)

        let data = await con.request().query(`SELECT * FROM vwProductsBySection`)

        await mssql.close()

        return data.recordset
    } catch (error) {
        await mssql.close()
        console.error(error)
    }
}

async function addOrder(nameClient, noteClient) {
    try {
        let con = await mssql.connect(config)

        let data = await con.request().query(`exec spINSOrderClient '${nameClient}', '${noteClient}'`)

        await mssql.close()

        return data.recordset
    } catch (error) {
        await mssql.close()
        console.error(error)
    }
}

async function addProduct(idOrder, products, specifications) {

    try {
        let con = await mssql.connect(config)

        for (let product in products) {
            await con.request().query(`exec spINSdetOrderClient ${idOrder}, ${products[product].id}, ${products[product].quantity}, '${specifications}'`)
        }

        await mssql.close()

    } catch (error) {
        await mssql.close()
        console.error(error)
    }
}

module.exports = {
    getData,
    addOrder,
    addProduct
}