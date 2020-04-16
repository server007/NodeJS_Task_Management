const { Router } = require('express')
const { Todos, Notes } = require('../db')
const { Op } = require('Sequelize')

const route2 = Router()


route2.get('/DueAsc', async(req, res) => {
    const todos = await Todos.findAll({
        order: [
            ['due', 'ASC'],
        ]
    })
    res.send(todos)
})

route2.get('/DueDesc', async(req, res) => {
    const todos = await Todos.findAll({
        order: [
            ['due', 'DESC'],
        ]
    })
    res.send(todos)
})

route2.get('/Priority', async(req, res) => {
    const todos = await Todos.findAll({
        order: [
            ['priority', 'ASC'],
        ]
    })
    res.send(todos)
})

route2.get('/Status', async(req, res) => {
    const todos = await Todos.findAll({
        order: [
            ['status', 'ASC'],
        ]
    })
    res.send(todos)
})

module.exports = route2