const express = require('express');
const { getAsync } = require('../redis');
const router = express.Router();

router.get('/', async (_, res) => {
  const nOfTodos = await getAsync('added_todos');
  
  const toDoStatistics = {
    added_todos: nOfTodos
  }
  
  res.send(toDoStatistics)
});

module.exports = router;