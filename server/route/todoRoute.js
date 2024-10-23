const express = require('express');
const router = express.Router();


const{addTask,editTask,getAllTask,deleteTask,changeStatus} = require('../controller/taskController')
router.post('/add', addTask);
router.post('/edit', editTask);
router.get('/getall', getAllTask);
router.post('/delete', deleteTask);
router.post('/changestatus', changeStatus);
module.exports = router;