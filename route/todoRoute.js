const express = require('express');
const todoRouter = express.Router();
const controller = require('../controller/todo.controller')
const isAdmin = require('../middleware/checkUserType');
const verifyToken = require('../middleware/jwt')
//admin and user register
todoRouter.post('/signup', controller.register);
//admin and user register
todoRouter.post('/login', controller.login);
//admin and user can add todo
todoRouter.post('create/todo', controller.AddTodo);
//user and admin can change the title
todoRouter.put('/changetitle', controller.updateTitle);
//cange status of todo to done 
todoRouter.put('/done', controller.doneTodo);
//delete any todo irrespective of done or not
todoRouter.delete('/delete/todo', controller.deleteTodo);
//get all todos only admin
todoRouter.get('/getalltodo/:perPageDocument/:pageNumber', controller.findAllTodos);
todoRouter.get('/getbycategory/:perPageDocument/:pageNumber', controller.findAllTodosByCategory);
todoRouter.get('/getallsortedtodo/:perPageDocument/:pageNumber', controller.sortbyCreatedAt);
todoRouter.get('/getalltodoforauser/:perPageDocument/:pageNumber', controller.gettAllTodosforSingleUser);
todoRouter.get('/todayregisteredusers/:perPageDocument/:pageNumber', controller.getNumberofRegisteredUsersforTheDay);
todoRouter.get('/activetoday/:perPageDocument/:pageNumber', controller.getActiveUsersForTheDay);
todoRouter.get('/activelastweek/:perPageDocument/:pageNumber', controller.getActiveUersForTheWeek);
todoRouter.get('/activelast30days/:perPageDocument/:pageNumber', controller.getActiveUsersForTheMonth);

module.exports = todoRouter;