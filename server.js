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

const server_port = process.env.PORT || 7777

db.sync()
    .then(() => {
        app.listen(server_port)
    })
    .catch((err) => {
        console.error(err)
    })