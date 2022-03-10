const express = require('express');
const todoRouter = express.Router();
const controller = require('../controller/todo.controller')

todoRouter.post('/signup', controller.register);
todoRouter.post('/login', controller.login);
todoRouter.post('create/todo', controller.AddTodo);
todoRouter.put('/changetitle', controller.updateTitle);
todoRouter.put('/done', controller.doneTodo);
todoRouter.delete('/delete/todo', controller.deleteTodo);
todoRouter.get('/getalltodo/:perPageDocument/:pageNumber', controller.findAllTodos);
todoRouter.get('/getbycategory/:perPageDocument/:pageNumber', controller.findAllTodosByCategory);
todoRouter.get('/getallsortedtodo/:perPageDocument/:pageNumber', controller.sortbyCreatedAt);
todoRouter.get('/getalltodoforauser/:perPageDocument/:pageNumber', controller.gettAllTodosforSingleUser);
todoRouter.get('/todayregisteredusers/:perPageDocument/:pageNumber', controller.getNumberofRegisteredUsersforTheDay);
todoRouter.get('/activetoday/:perPageDocument/:pageNumber', controller.getActiveUsersForTheDay);
todoRouter.get('/activelastweek/:perPageDocument/:pageNumber', controller.getActiveUersForTheWeek);
todoRouter.get('/activelast30days/:perPageDocument/:pageNumber', controller.getActiveUsersForTheMonth);