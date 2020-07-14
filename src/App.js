import React from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import CategoriasState from "./context/CategoriasState";
import RecetasState from "./context/RecetasState";
import Recetas from "./components/Recetas";
import ModalState from "./context/ModalState";

function App() {
  return (
    <CategoriasState>
      <RecetasState>
        <ModalState>
          <Header />
          <div className="container mt-5">
            <div className="row">
              <Formulario />
            </div>

            <Recetas />
          </div>
        </ModalState>
      </RecetasState>
    </CategoriasState>
  );
}

export default App;
