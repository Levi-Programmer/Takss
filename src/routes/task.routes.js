const { Router } = require('express');

const router = Router();

//importing functions

const {getAllTasks, getTask, createTask, deleteTask, updateTask, empty_tasks} = require('../controllers/task.controller.js')


//GET
router.get('/tasks', getAllTasks);

router.get('/tasks/:id', getTask);

//POST

router.post('/tasks', createTask);

//DELETE

router.delete('/tasks/:id', deleteTask);

router.delete('/tasks', empty_tasks)

//PUT

router.put('/tasks/:id', updateTask);




module.exports = router;