import React, { useState, useContext } from "react";
import { ModalContext } from "../context/ModalContext";

// agregando material ui
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Receta = ({ receta }) => {
  // configuracion del modal de material-ui
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  // guardando los valores de estilos del modal en variable classes
  const classes = useStyles();

  // funcion para abrir el modal
  const handleOpen = () => {
    setOpen(true);
  };

  // funcion para cerrar el modal
  const handleClose = () => {
    setOpen(false);
  };

  // valores del modal context
  const { detalleReceta, guardarIdReceta, guardarDetalleReceta } = useContext(
    ModalContext
  );

  //mostrar ingredientes
  const mostrarIngredientes = (detalleReceta) => {

    let ingredientes = [];

    for(let i = 1; i < 16 ; i++) {

      if(detalleReceta[`strIngredient${i}`] ) {
        ingredientes.push(
          <li key={i} >{detalleReceta[`strIngredient${i}`]} {detalleReceta[`strMeasure${i}`]}</li>
        )
      }
    }

    return ingredientes;
  };

  return (
    <div className="col-12 col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>

        <img
          src={receta.strDrinkThumb}
          alt={receta.strDrink}
          className="card-img-top"
        />

        <div className="card-body">
          <button
            className="btn btn-primary btn-block"
            type="button"
            onClick={() => {
              guardarIdReceta(receta.idDrink);
              handleOpen();
            }}
          >
            ver receta
          </button>

          <Modal
            open={open}
            onClose={() => {
              guardarIdReceta(null);
              handleClose();
              guardarDetalleReceta({});
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2>{detalleReceta.strDrink}</h2>
              <h3 className="mt-4">Instrucciones</h3>
              <p> {detalleReceta.strInstructions}</p>

              <img
                className="img-fluid my-4"
                src={detalleReceta.strDrinkThumb}
                alt={detalleReceta.strDrink}
              />
              <h3>Ingredientes y cantidades</h3>
              <ul>
                {mostrarIngredientes(detalleReceta)}
              </ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Receta;
