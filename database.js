const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const userModel = require("./models/user");

const app = express();
const port = 3001;

app.use(cors());

mongoose.connect('mongodb+srv://root:Qr76sivt9K9Smv@main.a6uehiu.mongodb.net/Eglo?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/details/:id', async (req, res) => {
    const id = req.id;
    const user = await db.collection("Users").findOne({address: id});
    //const user = await db.collection("Users").userModel.findOne({name: "Company Inc"});
    res.json(user);
});

app.use('/login', (req, res) => {
    //const user = await userModel.find({});
    res.send({
        token: 'test123'
    });
});


app.listen(port, () => console.log(`Mon has been Goosed`))