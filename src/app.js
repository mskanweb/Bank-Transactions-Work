const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser()); 

// Routes
app.use('/api/auth', authRouter);

// Optional: Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
