const req = require('express/lib/request');
const pool = require('../db');

//GET

//Alistar las tareas
const getAllTasks = async(req, res, next) => {
    try {
        const allTasks = await pool.query('SELECT * FROM task')
        console.log(allTasks.rows)
        res.json(allTasks.rows);
    } catch (error) {
        next(error)
    }
}

//Consultar una tarea en especifico (obtener una unica tarea)


const getTask = async (req, res, next) => {
    const { id } = req.params; 

    try {
     
    const result = await pool.query('SELECT * FROM task WHERE id = $1', [id])

    if(!result.rows.length){
        return res.status(404).json({
            message: "Task not found"
        })
    }
    res.json(result.rows[0]); 
     
    } catch (error) {
       next(error)
    }
}


//POST

const createTask = async (req, res, next) => {
    const {title, description} = req.body;

    try{
        const result = await pool.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [
            title,
            description,
        ]);
    
        res.json(result.rows[0])
    
        console.log(result)
    }catch(error) {
        next(error)
    }
    
};


//DELETE

const deleteTask = async (req, res, next) => {
    const {id} = req.params;

    try {
        const result = await pool.query('DELETE FROM task WHERE id = $1', [id])
        
        if(!result.rowCount){
            return res.status(404).json({
                message: 'Task Not found'
            })
        }
        return res.sendStatus(204);
        
    } catch (error) {
       next(error)
    }
    
}


//DELETE (empty tasks)

const empty_tasks = async (req, res, next) => {
    
    try {
        const result = await pool.query('TRUNCATE TABLE task')
        res.send('empty tasks, sin tareas')
    } catch (error) {
        next(error)
    }
}

//PUT 


const updateTask = async (req, res, next) => {
    const { id } = req.params;
    const {title, description} = req.body;
    
    try {
        const result = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id])

        if(!result.rows.length){
            return res.status(404).json({
                message: 'Task Not found'
            })
        }

        return res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
    
}




module.exports = {
    getAllTasks,
    getTask,
    createTask, 
    deleteTask,
    updateTask,
    empty_tasks
}