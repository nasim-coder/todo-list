const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const todoRouter = require('./route/todoRoute')
mongoose.connect('mongodb://localhost:27017/todos', () => {
    console.log(`mongodb connected`);
})
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/todo', todoRouter);
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})