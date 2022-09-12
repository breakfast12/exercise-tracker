import { User } from './model/user.js';
import app from "./index.js";
import { v4 as uuidv4 } from 'uuid';

const main = () => {
    createUser();
}

const createUser = () => {
    app.route('/api/users').post((req, res) => {
        const username = req.body.username;
        const id = uuidv4();
    
        var newUser = new User({
            username: username,
            _id: id
        });
    
        newUser.save((err, data) => {
            if (err) {
                res.json({ error: err });
            } else {
                res.json({ username: data.username, _id: data._id });
            }
        });
    }).get((req, res) => {
        User.find({}, (err, data) => {
            if (err) {
                res.json({ error: err });
            } else {
                res.json(data);
            }
        });
    })
}


export default main;