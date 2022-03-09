const User = require('../model/user');
const Todo = require('../model/todo');
const { default: mongoose } = require('mongoose');


exports.register = (req, res) => {
    const { name, email,phone, password } = req.body;
    let isAlreadyexist = await User.findOne({ email });
    if (!isAlreadyexist) {
        let user = new User({
            name: name,
            email: email,
            phone:phone,
            password: bcrypt.hashSync(password, 8)
        });
        user.save((err, user) => {
            if (err) {
                return res.status(500).send({ success: false, message: err })
            
            }
            return res.status(200).json('you are registered successfully')
        });
    } else {
        return res.status(501).send({msg: 'user already exist', success: false});
    }
}

exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });
    let isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (user && (isPasswordCorrect)) {
        const token = jwt.sign({ user }, jwtconfig.secret, { "expiresIn": "2h" });
        user.token = token;
        res.status(200).json(user)
    } else {
        res.status(400).send({msg: "invalid credential"})
    }
}

exports.AddTodo = (req, res) => {
    const {title, status, category } = req.body;
    let uid = req.params.userid;
    let todo = new Todo({
        user: uid,
        title: title,
        status: status,
        category: category,
    });
    todo.save((err, todo) => {
        if (err) {
            return res.status(500).send({success: false, msg: err})
        } else {
            return res.status(200).send({success:true, todo})
        }
    })
}

exports.updateTitle = (req, res) => {
    let title = req.body.title;
    let todoid = mongoose.Types.ObjectId(req.params.todoid);
    try {
        Todo.updateOne({ _id: todoid }, { title: title });
    }
    catch (err) {
        return res.status(500).send({ success: false, msg: err });
    }
    return res.status(200).send({success: true, msg: "updated successfully"})
    
}

exports.doneTodo = (req, res) => {
    let todoid = mongoose.Types.ObjectId(req.params.todoid);
    try {
        Todo.updateOne({_id:todoid}, {status: true})
    } catch (err) {
        return res.status(500).send({success: false, msg: err})
    }
    return res.status(200).send({success: true, msg:"updated successfully"})
}

exports.deleteTodo = (req, res) => {
    let todoid = mongoose.Types.ObjectId(req.params.todoid);
    try {
        Todo.deleteOne({_id: todoid})
    } catch (err) {
        return res.status(500).send({success: false,msg: err})
    }
     return res.status(200).send({success: true, msg:"deleted successfully"})
}

exports.findAllTodos = (req, res) => {
    let alltodo = Todo.find({}, (err) => {
        if (err) {
            return res.status(500).send({success: false, msg: err})
        }
    })
    return res.status(200).send({success: true, alltodo})
}

exports.findAllTodosByCategory = (req, res) => {
    let category = req.body.category;
    let alltodoBycategory = Todo.find({ category: category }, (err) => {
        if (err) {
            return res.status(500).send({success: false, msg: err})
        }
    })
    return res.status(200).send({ success: true, alltodoBycategory });
}

exports.sortbyCreatedAt = (req, res) => {
    
}

exports.gettAllTodosforSingleUser = (req, res) => {
    
}