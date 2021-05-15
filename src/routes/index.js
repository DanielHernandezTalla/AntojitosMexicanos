'use strict'

// Dependences
const express = require('express')
const routes = express.Router()
const conexion = require('../database/conexion.js')

routes.get('/', (req, res) => {


    conexion.getData().then(data => {

        // console.log(data)

        let ds = new Set()

        for (let index in data)
            ds.add(data[index].position)

        ds = Array.from(ds).sort()

        for (let pos in ds) {
            for (let index in data) {
                if (ds[pos] == data[index].position)
                    ds[pos] = data[index].title
            }
        }

        res.render('index', {
            title: 'Antojitos Mexicanos Dona Panchita',
            sections: ds,
            articles: data
        })
        // res.send('ok')
    })

})

routes.get('/car', (req, res) => {

    res.render('car', {
        title: 'Antojitos Mexicanos Dona Panchita'
    })

})

routes.post('/car', (req, res) => {
    let {
        nameClient,
        noteClient,
        products,
        specifications
    } = req.body

    // Add order
    conexion.addOrder(nameClient, noteClient).then(data => {
        // console.log(data[0].idOrder)

        // Add products
        conexion.addProduct(data[0].idOrder, products, specifications)
    })

    res.json({
        status: 'OK'
    })
})

module.exports = routes