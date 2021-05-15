'use strict'

// Dependences
const express = require('express')
const path = require('path')
const pug = require('pug')

//intances 
const app = express()

// Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Middelwares
app.use(express.json())

// Routes
app.use(require('./routes/index'))

// static fiels 
app.use(express.static(path.join(__dirname, 'public')))

// Error 404
app.use((req, res, next) => {
    let err = new Error()

    err.status = 404

    res.render('error404', {
        title: 'Error 404',
        description: 'Recurso no encontrado',
        error: err
    })
})

// Run app
app.listen(app.get('port'), () => {
    console.log('Run on port ', app.get('port'))
})