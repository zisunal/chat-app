const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./helpers/connect');
const indexRouter = require('./routes/index');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors({
    origin: process.env.FRONTEND_URL,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

connectDB().then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});