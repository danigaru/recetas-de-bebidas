import React, { useState, useEffect } from "react";
import { ModalContext } from "../context/ModalContext";
import axios from "axios";

const ModalState = ({ children }) => {
  // state del provider
  const [idreceta, guardarIdReceta] = useState(null);
  const [detalleReceta, guardarDetalleReceta] = useState({});

  // una vez tengamos una receta, llamar al api
  useEffect(() => {
    const obtenerReceta = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
      const receta = await axios.get(url);

      guardarDetalleReceta(receta.data.drinks[0]);
    };

    if (idreceta) {
      obtenerReceta();
    }
  }, [idreceta]);

  return (
    <ModalContext.Provider value={{ detalleReceta, guardarIdReceta, guardarDetalleReceta }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalState;
