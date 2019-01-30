'user strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
    .then(() => {
        console.log('db connected');
    }).catch((error) => {
        console.error(error);
    })
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number

})
const users = mongoose.model('user', UserSchema);
const app = express();
const PORT = 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/users', (req, res) => {
    users.find({})
        .then((result) => {
            res.json(result);
        }).catch((error) => {
            console.log(error);
            res.json({ message: 'Sorry! Something Went Wrong' });

        })
})
app.post('/api/users', (req, res) => {
    const user = new users(req.body)
    user.save()
        .then((result) => {
            res.json(result);

        }).catch((error) => {
            console.error(error);
            res.json({ message: 'Sorry! Something Went Wrong' });

        })
})
app.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    users.findByIdAndUpdate(id, req.body, { new: true })
        .then((result) => {
            res.json(result);

        }).catch((error) => {
            console.error(error);
            res.json({ message: 'Sorry! Something Went Wrong' });

        })
})

app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    users.findByIdAndDelete(id)
        .then((result) => {
            res.json(result);

        }).catch((error) => {
            console.error(error);
            res.json({ message: 'Sorry! Something Went Wrong' });

        });
})
app.listen(PORT, () => {
    console.log('Server listening', +PORT);
})