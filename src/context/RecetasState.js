import React, { useState } from "react";
import { RecetasContext } from "../context/RecetasContext";
import Axios from "axios";

const RecetasState = ({ children }) => {
  const [recetas, setRecetas] = useState([]);

  const consultarRecetas = async ({ nombre, categoria }) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
    const recetas = await Axios.get(url);
    setRecetas(recetas.data.drinks);
  };

  return (
    <RecetasContext.Provider value={{ recetas, consultarRecetas }}>
      {children}
    </RecetasContext.Provider>
  );
};

export default RecetasState;
