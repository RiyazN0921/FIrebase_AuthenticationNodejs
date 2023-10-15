const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const dbConnection = require('./src/config/db.config');
const dotenv = require("dotenv");
dotenv.config()
const port = process.env.PORT || 3000

app.use(bodyparser.json());
app.use("/api/auth", require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/tickets', require('./src/routes/ticketRoutes'));

app.listen(port , async () => {
    console.log("Server listening on port " + port);
    await dbConnection();
})