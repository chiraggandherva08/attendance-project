const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/attendance',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log('Connected to database...'))
    .catch((error) => console.log('Error: ', error))

mongoose.connect('mongodb://127.0.0.1:27017/attendance', {
    useNewUrlParser: true, useUnifiedTopology: true
})

const student_schema = new mongoose.Schema({
    rollNumber: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    attendance: { type: Number, required: true }
});

const student_model = mongoose.model('students', student_schema);

const app = express();
const PORT = 8000;

app.use(cors());

app.get('/api', async (req, res) => {
    try {
        const student_data = await student_model.find({});
        return res.json(student_data);
    }
    catch (error) {
        console.log(error);
        return res.json({ status: 'request declined', error: error });
    }
})

app.listen(PORT, () => {
    console.log(`Connected to the server at localhost:${PORT}...`)
})
