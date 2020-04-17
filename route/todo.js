const { Router } = require('express')
const { Todos, Notes } = require('../db')
const { Op } = require('Sequelize')

const route = Router()



route.get('/', async(req, res) => {
    const todos = await Todos.findAll({
        order: [
            ['id', 'ASC'],
        ]
    })
    res.send(todos)
})

// route.get('/orderDueAsc', async(req, res) => {
//     const todos = await Todos.findAll({
//         order: [
//             ['due', 'ASC'],
//         ]
//     })
//     res.send(todos)
// })

route.get('/:id', async(req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'todo id must be an integer',
        })
    }

    const todo = await Todos.findByPk(req.params.id)

    if (!todo) {
        return res.status(404).send({
            error: 'No todo found with id = ' + req.params.id,
        })
    }
    res.send(todo)
})

route.post('/', async(req, res) => {

    console.log(req.body.title)
    if (req.body.done === 'true') {
        req.body.done = true
    } else {
        req.body.done = false
    }

    const newTodo = await Todos.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due: req.body.due,
        priority: req.body.priority
    })

    res.status(201).send({ success: 'New task added', data: newTodo })
})

route.patch('/:id', async(req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'todo id must be an integer',
        })
    }

    const todo = await Todos.findByPk(req.params.id)
    console.log(todo.priority)
    todo.title = todo.title
    todo.status = req.body.status
    todo.priority = req.body.priority
    todo.due = req.body.due

    await todo.save()

})

route.get('/:id/notes', async(req, res) => {
    const notes = await Notes.findAll({
        where: {
            id: {
                [Op.eq]: req.params.id
            }
        }
    })
    res.send(notes)
})

route.post('/:id/notes', async(req, res) => {

    const note = await Notes.create({
        id: req.params.id,
        notes: req.body.notes
    })

    res.status(201).send({ success: 'New task added', data: note })
})


module.exports = route