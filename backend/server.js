require('dotenv').config();

const express = require('express');
const recipesRoutes = require('./routes/recipes');
const mongoose = require('mongoose');

//express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use('/api/recipes', recipesRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => console.log(`connected to the db & listening on port, http://localhost:${process.env.PORT}`));
    })
    .catch((err) => {
        console.log(err);
    });

