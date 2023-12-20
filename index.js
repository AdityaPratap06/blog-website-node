const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors")
const app = express();
const port = 3005;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 'origin': '*' }));
// app.use((err, req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.status(500).send('Something went wrong!');
//     // next();
// });

// Routers
const postRouter = require("./src/Routes/postRoutes");

// Use Routers
app.use('/post', postRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
