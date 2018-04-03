const express = require('express');
const router = express.Router();

const handleUser = require('../controller/user');
const handleTask = require('../controller/task');
const handleJRH = require('../controller/juruihui')

// user
router.get('/allusers', handleUser.getAllUser);
router.post('/adduser', handleUser.addUser);
// task
router.post('/createtask', handleTask.createTask)
router.get('/getTaskFromCategory/:category', handleTask.getTaskFromCategory)
// 聚蕊烩
router.post('/juruihui/login', handleJRH.login)

module.exports = router;