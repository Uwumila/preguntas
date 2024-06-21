const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173' 
}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/reclamos', {

}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB', err);
});

const reclamoSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  mensaje: String
});

const Reclamo = mongoose.model('Reclamo', reclamoSchema);

app.post('/api/reclamos', async (req, res) => {
  try {
    const nuevoReclamo = new Reclamo(req.body);
    await nuevoReclamo.save();
    res.status(201).send(nuevoReclamo);
  } catch (err) {
    console.error('Error al guardar el reclamo:', err);
    res.status(400).send(err);
  }
});

app.get('/api/reclamos', async (req, res) => {
  try {
    const reclamos = await Reclamo.find();
    res.status(200).send(reclamos);
  } catch (err) {
    console.error('Error al obtener los reclamos:', err);
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
