import React, { useContext, useState } from "react";
import CategoriasContext from "../context/CategoriasContext";
import { RecetasContext } from "../context/RecetasContext";

const Formulario = () => {

  // state del componente
  const [busqueda, guardarBusqueda] = useState({
    nombre: "",
    categoria: "",
  });

  // obtener datos del formulario
  const obtenerDatosReceta = (e) => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };
  const [error, setError] = useState(false);

  // context
  const { categorias } = useContext(CategoriasContext);
  const {consultarRecetas} = useContext(RecetasContext);

  // destructuring del state del componente
  const {nombre, categoria} = busqueda;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);

    if(!nombre.trim() || !categoria.trim()) {
      setError(true);
      return;
    }

    consultarRecetas(busqueda);
  }

  return (
    <form className="col-12" onSubmit={handleSubmit}>
    {error && <p className="alert alert-danger text-center text-uppercase">Todos los campos son requeridos</p>}
      <fieldset className="text-center">
        <legend>Busca bebidas por categoria o ingrediente</legend>
      </fieldset>

      <div className="row mt-4">
        <div className="col-md-4">
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Buscar por ingrediente"
            onChange={obtenerDatosReceta}
            value={nombre}
          />
        </div>

        <div className="col-md-4">
          <select
            name="categoria"
            className="form-control"
            onChange={obtenerDatosReceta}
            value={categoria}
          >
            <option value="">Selecciona la categoria</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-primary btn-block"
            value="Buscar bebidas"
          />
        </div>
      </div>
    </form>
  );
};

export default Formulario;
