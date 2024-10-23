const express = require('express');
const app = express();
const port = 3000;
const uri = 'mongodb+srv://lduchuy:lduchuy@cluster0.fsvgb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const mongoose = require('mongoose');
const todoRoute = require('./route/todoRoute')
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(todoRoute);

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));
app.listen(port, () => {
    console.log("listening 3000");
});