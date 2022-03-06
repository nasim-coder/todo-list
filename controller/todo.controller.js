const User = require('../model/user')
exports.register = (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, user) => {
        if (err) {
            res.status('500').send({ message: err })
            return
        }
        res.status(200).json('you are registered successfully')
    });
}

exports.login = (req, res) => {
    
}

exports.AddTodo = (req, res) => {
    
}

exports.updateTitle = (req, res) => {
    
}

exports.doneTodo = (req, res) => {
    
}

exports.deleteTodo = (req, res) => {
    
}

exports.findAllTodos = (req, res) => {
    
}

exports.findAllTodosByCategory = (req, res) => {
    
}

exports.sortbyCreatedAt = (req, res) => {
    
}

exports.gettAllTodosforSingleUser = (req, res) => {
    
}