const express = require('express')

const { db } = require('./db')
const todoRoute = require('./route/todo')

const todoRoute2 = require('./route/order')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', express.static(__dirname + '/public'))

app.use('/todos', todoRoute)

app.use('/order', todoRoute2)

db.sync()
    .then(() => {
        app.listen(7777)
    })
    .catch((err) => {
        console.error(err)
    })