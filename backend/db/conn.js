const mongoose = require('mongoose');

const DB = "mongodb://127.0.0.1/mydb";

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`connection successful`);
}).catch((err) => console.log(err));