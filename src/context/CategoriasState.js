import React, { useState, useEffect } from 'react';
import CategoriasContext from './CategoriasContext';
import axios from 'axios';

const CategoriasState = ({children}) => {

  const [categorias, guardarCategorias] = useState([]);

  useEffect( () => {
    const obtenerCategorias = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const categorias = await axios.get(url);

      guardarCategorias(categorias.data.drinks);
    };

    obtenerCategorias();
  }, []);

  return (
    <CategoriasContext.Provider value={{
      categorias
    }}>
      {children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasState;