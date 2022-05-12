const express = require('express');
const app = express();
const PORT = 4000;

//Importaciones

const taskRoutes = require('./routes/task.routes.js')
const morgan = require('morgan');
const cors = require('cors')
//MiddleWare


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
});

// Routes

app.use(taskRoutes);


app.listen(PORT, () => console.log('Listening on port 4000'))