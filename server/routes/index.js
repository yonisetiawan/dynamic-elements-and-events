var express = require('express');
var router = express.Router();
const Todos = require('../controllers/todo');

/* GET home page. */

router.post('/add', Todos.add)

router.get('/getAll', Todos.getAll);



module.exports = router;
