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
        const date = req.body.date;

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
                newExecise.save((err, data) => {
                    if (err) {
                        res.json({ error: err });
                    } else {
                        res.json({ _id: data._id, username: username, date: moment(data.date).format("ddd, MMM DD YYYY"), duration: data.duration, description: data.description });
                    }
                });
            }
        })
    })
}

export default exercise;