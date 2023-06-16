import { User } from './model/user.js';
import { Exercise } from './model/exercise.js';
import moment from 'moment';
import app from "./index.js";

const exercise = () => {
    createExercise();
}

const createExercise = () => {
    app.post('/api/users/:_id/exercises', (req, res) => {
        const id = req.body[':_id'];
        const description = req.body.description;
        const duration = req.body.duration;
        const date = req.body.date ? req.body.date : new Date();

        var newExecise = new Exercise({
            _id: id,
            description: description,
            duration: duration,
            date: date
        });

        User.find({ _id: id }, (err, data) => {
            if (err) {
                res.json({ error: err });
            } else {
                const username = data[0].username;
                const now = moment().format("ddd, MMM DD YYYY");
                
                newExecise.save((err, data) => {
                    if (err) {
                        res.send({ error: err });
                    } else {
                        res.send({ _id: data._id, username: username, date: moment(new Date(data.date)).format("ddd, MMM DD YYYY"), duration: data.duration, description: data.description });
                    }
                });
            }
        })
    })
}

export default exercise;