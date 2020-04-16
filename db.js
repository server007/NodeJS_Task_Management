const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/todos.db'
})

const Notes=db.define('note',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    notes:{
        type: Sequelize.STRING(50),
        primaryKey: true        
    }
})

const Todos = db.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:false
    },
    due: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date().setDate(new Date().getDate() + 1)
    },
    priority: {
        type: Sequelize.DataTypes.ENUM("high","medium","low"),
        allowNull: false,
        defaultValue: "medium"
    }
   
})

module.exports = {
    db, Todos,Notes
}

async function task(){
    await db.sync({alter: true})

}
 
task()