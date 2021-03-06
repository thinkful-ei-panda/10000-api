require ('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');

const AuthRouter = require('./auth/authRouter');
const UsersRouter = require('./users/usersRouter');
const SkillsRouter = require('./skills/skillsRouter');

const app = express();

const morgOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morgOption));
app.use(cors());
app.use(helmet());

app.get('/', (req,res) => {
  res.status(200).send('Hello, world!');
});

app.use('/api/auth', AuthRouter);
app.use('/api/users',UsersRouter);
app.use('/api/skills',SkillsRouter);

app.use(function errorHandler(error,req,res,next){
  let response;
  if(NODE_ENV === 'production') {
    response = {error: {message: 'server error'}};
  }else{
    response = {message: error.message, error};
  }
  res.status(400).json(response);
});

module.exports = app;