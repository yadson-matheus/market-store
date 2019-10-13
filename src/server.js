// Load .env configs.
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();

// Connect to MongoDB
mongoose.connect(`${ process.env.DB_URI }/${ process.env.DB_NAME }`, {
    useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.catch (error => console.log('Database connection failed'));

app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Create server.
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running at ${ process.env.SERVER_HOST }:${ process.env.SERVER_PORT }`);
});