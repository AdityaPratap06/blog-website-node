const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors")
const app = express();
const port = 3005;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 'origin': '*' }));

// Routers
const postRouter = require("./src/Routes/postRoutes");

// Use Routers
app.use('/post', postRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
