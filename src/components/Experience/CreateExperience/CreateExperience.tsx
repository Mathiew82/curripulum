import Modal from "../../ui/Modal/Modal.tsx";
import "./CreateExperience.css";

function CreateExperience() {
  return (
    <>
      <Modal active={true} title="Crear nueva experiencia">
        <div className="create-experience">
          <div className="field">
            <label>Empresa</label>
            <input value="" />
          </div>
          <div className="field">
            <label>Posición</label>
            <input value="" />
          </div>
          <div className="field">
            <label>Duración</label>
            <input value="" />
          </div>
          <div className="field">
            <label>Descripción</label>
            <textarea></textarea>
          </div>
          <div className="wrapper-buttons">
            <button className="cancel">Cancelar</button>
            <button className="save">Agregar</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CreateExperience;
