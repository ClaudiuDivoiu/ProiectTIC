require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./src/config/logger');
const errorHandler = require('./src/middlewares/error-handler');
const { initializeFirebase } = require('./src/config/firebase');
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

initializeFirebase();

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
})

app.use(errorHandler);

app.get('/health-check', (req, res) => {
    res.status(200).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
