const { setAsync, getAsync } = require('./redis');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const statisticsRouter = require('./routes/statistics');

const app = express();

const formatRedus = async () => {
  const addedTodos = await getAsync('added_todos')

  if (!addedTodos) {
    await setAsync('added_todos', 0)
  }
}

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
    
app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/statistics', statisticsRouter);

formatRedus();

module.exports = app;
