const User = require('../model/user');
const Todo = require('../model/todo');
const { default: mongoose } = require('mongoose');


exports.register = async (req, res) => {
    const { name, email,phone, password } = req.body;
    let isAlreadyexist = await User.findOne({ email });
    if (!isAlreadyexist) {
        let user = new User({
            name: name,
            email: email,
            phone:phone,
            password: bcrypt.hashSync(password, 8)
        });
        await user.save((err, user) => {
            if (err) {
                return res.status(500).send({ success: false, message: err })
            
            }
            return res.status(200).json('you are registered successfully')
        });
    } else {
        return res.status(501).send({msg: 'user already exist', success: false});
    }
}

exports.login = async (req, res) => {
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

exports.AddTodo = async (req, res) => {
    const {title, status, category } = req.body;
    let uid = req.params.userid;
    let todo = new Todo({
        user: uid,
        title: title,
        status: status,
        category: category,
    });
    await todo.save((err, todo) => {
        if (err) {
            return res.status(500).send({success: false, msg: err})
        } else {
            return res.status(200).send({success:true, todo})
        }
    })
}

exports.updateTitle = async (req, res) => {
    let title = req.body.title;
    let todoid = mongoose.Types.ObjectId(req.params.todoid);
    try {
        await Todo.updateOne({ _id: todoid }, { title: title });
    }
    catch (err) {
        return res.status(500).send({ success: false, msg: err });
    }
    return res.status(200).send({success: true, msg: "updated successfully"})
    
}

exports.doneTodo = async (req, res) => {
    let todoid = mongoose.Types.ObjectId(req.params.todoid);
    try {
        await Todo.updateMany({ _id: todoid }, {$set:{ status: true, updatedAt: new Date().now }})
    } catch (err) {
        return res.status(500).send({success: false, msg: err})
    }
    return res.status(200).send({success: true, msg:"done updated successfully"})
}

exports.deleteTodo = async (req, res) => {
    let todoid = mongoose.Types.ObjectId(req.params.todoid);
    try {
        await Todo.deleteOne({_id: todoid})
    } catch (err) {
        return res.status(500).send({success: false,msg: err})
    }
     return res.status(200).send({success: true, msg:"deleted successfully"})
}

exports.findAllTodos = async (req, res) => {
    let perPageDocument = req.params.perPageDocument;
    let pageNumber = req.params.pageNumber;
    let pageNu = Math.max(0, pageNumber)

    let alltodo = await Todo.find({}, (err) => {
        if (err) {
            return res.status(500).send({success: false, msg: err})
        }
    }).limit(perPageDocument).skip(perPageDocument*pageNu)
    return res.status(200).send({success: true, alltodo})
}

exports.findAllTodosByCategory = async (req, res) => {
    let perPageDocument = req.params.perPageDocument;
    let pageNumber = req.params.pageNumber;
    let pageNu = Math.max(0, pageNumber)
    let category = req.body.category;
    let alltodoBycategory = await Todo.find({ category: category }, (err) => {
        if (err) {
            return res.status(500).send({success: false, msg: err})
        }
    }).limit(perPageDocument).skip(perPageDocument*pageNu)
    return res.status(200).send({ success: true, alltodoBycategory });
}

exports.sortbyCreatedAt = async (req, res) => {
    let perPageDocument = req.params.perPageDocument;
    let pageNumber = req.params.pageNumber;
    let pageNu = Math.max(0, pageNumber)
    let sortedTodobyCreatedAt = await Todo.find({}).sort({ createdAt: 1 }, (err) => {
        if (err) {
            return res.status(500).send({success: false, msg: err})
        }
    }).limit(perPageDocument).skip(perPageDocument*pageNu)
    return res.status(200).send({success: true, sortedTodobyCreatedAt})
}

exports.gettAllTodosforSingleUser = async (req, res) => {
    let perPageDocument = req.params.perPageDocument;
    let pageNumber = req.params.pageNumber;
    let pageNu = Math.max(0, pageNumber)
    let userid = mongoose.Types.ObjectId(req.params.userid)
    let singleUserTodos = await Todo.find({ user: userid }, (err) => {
        return res.status(500).send({success: false, msg: err.message})
    }).limit(perPageDocument).skip(perPageDocument*pageNu)
    return res.status(200).send({success: true, singleUserTodos})
}

exports.getNumberofRegisteredUsersforTheDay = async (req, res) => {
    let perPageDocument = req.params.perPageDocument;
    let pageNumber = req.params.pageNumber;
    let pageNu = Math.max(0, pageNumber)
    let todos =  await User.find({ createdAt: { $gte: new Date().now } }, (err) => {
        return res.status(500).send({success: false, msg: err})
   }).limit(perPageDocument).skip(perPageDocument*pageNu)
    res.status(200).send({success: true, todos})
}

exports.getActiveUsersForTheDay = async (req, res) => {
    let perPageDocument = req.params.perPageDocument;
    let pageNumber = req.params.pageNumber;
    let pageNu = Math.max(0, pageNumber)
    let inaday= await Todo.find({
        updatedAt: {
            $gte: new Date().now
        }
    }, (err) => {
        if (err) {
            res.status.send({success: false, msg: err})
        }
    }).limit(perPageDocument).skip(perPageDocument*pageNu);
    res.status(200).send({success: true, inaday})
}

exports.getActiveUersForTheWeek = async (req, res) => {
    let perPageDocument = req.params.perPageDocument;
    let pageNumber = req.params.pageNumber;
    let pageNu = Math.max(0, pageNumber)
    let inaweek = await Todo.find({
        updatedAt: {
            $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000)
        }
    }, (err) => {
        if (err) {
            res.status.send({success: false, msg: err})
        }
    }).limit(perPageDocument).skip(perPageDocument*pageNu);
    res.status(200).send({success: true, inaweek})
}

exports.getActiveUsersForTheMonth = async (req, res) => {
    let perPageDocument = req.params.perPageDocument;
    let pageNumber = req.params.pageNumber;
    let pageNu = Math.max(0, pageNumber)
    let inamonth = await Todo.find({
        updatedAt: {
            $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000)
        }
    }, (err) => {
        if (err) {
            res.status.send({success: false, msg: err})
        }
    }).limit(perPageDocument).skip(perPageDocument*pageNu);
    res.status(200).send({success: true, inamonth})
}