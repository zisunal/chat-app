const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose
        .connect(process.env.CONN_STRING)
        .then(() => {
            console.log('DB Connected');
        })
        .catch((err) => {
            console.log('DB Connection Error: ', err);
        });
}

module.exports = connectDB;