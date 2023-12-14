import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UbicationSelector = () => {
  const [selectedUbication, setSelectedUbication] = useState('');
  const navigate = useNavigate();

  const handleUbicationChange = (event) => {
    setSelectedUbication(event.target.value);
  };

  const handleSelectedUbi = () => {
    // Verificar si se ha seleccionado una opción válida
    if (selectedUbication !== '') {
      // Almacenar en LocalStorage
      localStorage.setItem('ubication', selectedUbication);

      // Redirigir a "/vender"
      navigate('/vender');
    } else {
      alert('Por favor, selecciona una ubicación válida.');
    }
  };

  return (
    <div>
      <label htmlFor="ubication">Selecciona una ubicación:</label>
      <select id="ubication" value={selectedUbication} onChange={handleUbicationChange}>
        <option value="" disabled>
          Selecciona...
        </option>
        <option value="villa colombia">Villa Colombia</option>
        <option value="unico">Único</option>
      </select>
      <button onClick={handleSelectedUbi} disabled={selectedUbication === ''}>
        Enviar
      </button>
    </div>
  );
};
