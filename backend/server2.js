
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/ratings', {
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB', err);
});

const ratingSchema = new mongoose.Schema({
  rating: String,
  date: { type: Date, default: Date.now },
});

const Rating = mongoose.model('Rating', ratingSchema);

app.post('/api/rate', (req, res) => {
  const newRating = new Rating({ rating: req.body.rating });
  newRating.save()
    .then(() => res.status(201).send('Rating saved'))
    .catch(error => res.status(500).send('Error saving rating: ' + error));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
