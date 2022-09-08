import mongoose from 'mongoose';
import app from "./index.js";
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    _id: String
})

const User = mongoose.model('User', userSchema);

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