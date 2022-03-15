const express = require('express');
const todoRouter = express.Router();
const controller = require('../controller/todo.controller')
const isAdmin = require('../middleware/checkUserType');
const verifyToken = require('../middleware/jwt');

//admin and user register
todoRouter.post('/signup', controller.register);

//admin and user login
todoRouter.post('/login', controller.login);

//admin and user can add todo
todoRouter.post('/create/todo/', verifyToken, controller.AddTodo);

//user and admin can change the title
todoRouter.put('/changetitle/:todoid', verifyToken, controller.updateTitle);

//cange status of todo to done 
todoRouter.put('/done/:todoid/', verifyToken, controller.doneTodo);

//delete any todo irrespective of done or not
todoRouter.delete('/delete/todo/:todoid/', verifyToken, controller.deleteTodo);

//get all todos only admin
todoRouter.get('/getalltodo/:perPageDocument/:pageNumber', verifyToken, isAdmin, controller.findAllTodos);

//get all todos by category only admin
todoRouter.get('/getbycategory/:perPageDocument/:pageNumber', verifyToken, isAdmin, controller.findAllTodosByCategory);

//get all todos sorted by the date when it was created only admin
todoRouter.get('/getallsortedtodo/:perPageDocument/:pageNumber', verifyToken, isAdmin, controller.sortbyCreatedAt);

//get all todos foa single user, admin and user can access it.
todoRouter.get('/getalltodoforauser/:perPageDocument/:pageNumber/', verifyToken, controller.gettAllTodosforSingleUser);

//getting all the users who are registedred today, admin
todoRouter.get('/todayregisteredusers/:perPageDocument/:pageNumber', verifyToken, isAdmin, controller.getNumberofRegisteredUsersforTheDay);

//getting all the users who is active today
todoRouter.get('/activetoday/:perPageDocument/:pageNumber',verifyToken, isAdmin, controller.getActiveUsersForTheDay);

//get all the active user last week
todoRouter.get('/activelastweek/:perPageDocument/:pageNumber',verifyToken, isAdmin, controller.getActiveUersForTheWeek);

//get active users for last month
todoRouter.get('/activelast30days/:perPageDocument/:pageNumber',verifyToken, isAdmin, controller.getActiveUsersForTheMonth);

module.exports = todoRouter;