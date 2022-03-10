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
todoRouter.get('/getalltodo/:perPageDocument/:pageNumber', isAdmin, controller.findAllTodos);
//get all todos by category only admin
todoRouter.get('/getbycategory/:perPageDocument/:pageNumber', isAdmin, controller.findAllTodosByCategory);
//get all todos sorted by the date when it was created only admin
todoRouter.get('/getallsortedtodo/:perPageDocument/:pageNumber', isAdmin, controller.sortbyCreatedAt);
//get all todos foa single user, admin and user can access it.
todoRouter.get('/getalltodoforauser/:perPageDocument/:pageNumber', controller.gettAllTodosforSingleUser);
//getting all the users who are registedred today, admin
todoRouter.get('/todayregisteredusers/:perPageDocument/:pageNumber', isAdmin, controller.getNumberofRegisteredUsersforTheDay);
//getting all the users who is active today
todoRouter.get('/activetoday/:perPageDocument/:pageNumber',isAdmin, controller.getActiveUsersForTheDay);
//get all the active user last week
todoRouter.get('/activelastweek/:perPageDocument/:pageNumber',isAdmin, controller.getActiveUersForTheWeek);
//get active users for last month
todoRouter.get('/activelast30days/:perPageDocument/:pageNumber',isAdmin, controller.getActiveUsersForTheMonth);

module.exports = todoRouter;