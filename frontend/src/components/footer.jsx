
import React, { useState } from 'react';
import axios from 'axios';
import './footer.css'

const FooterRating = () => {
  const [rating, setRating] = useState(null);
  const [message, setMessage] = useState('');

  const handleRating = (value) => {
    setRating(value);
    axios.post('/api/rate', { rating: value })
      .then(response => {
        setMessage('¡Gracias por tu calificación!');
      })
      .catch(error => {
        console.error('Error al enviar la calificación:', error);
        setMessage('Hubo un problema al enviar tu calificación. Inténtalo de nuevo.');
      });
  };

  return (
    <footer className='footer-container'>
      <h3>Califica la calidad de la página:</h3>
      <div>
        <button className='Excelente' onClick={() => handleRating('excelente')}>Excelente</button>
        <button className='Buena' onClick={() => handleRating('buena')}>Buena</button>
        <button className='NiBuenaNiMala' onClick={() => handleRating('ni buena ni mala')}>Ni buena ni mala</button>
        <button className='NoMuyBuena' onClick={() => handleRating('no muy buena')}>No muy buena</button>
        <button className='Mala' onClick={() => handleRating('mala')}>Mala</button>
      </div>
      {message && <p>{message}</p>}
    </footer>
  );
};

export default FooterRating;
