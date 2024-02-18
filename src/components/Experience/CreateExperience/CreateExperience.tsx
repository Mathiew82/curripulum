import Modal from "../../ui/Modal/Modal.tsx";
import Experience from "../Experience.tsx";
import "./CreateExperience.css";

interface Props {
  active: boolean;
  closeModal: Function;
  addExperience: Function;
}

function CreateExperience({ active, closeModal, addExperience }: Props) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form as HTMLFormElement);

    const formJson = Object.fromEntries(formData.entries());

    addExperience(formJson as unknown as Experience);
    closeModal(false);
  };

  return (
    <>
      <Modal active={active} title="Crear nueva experiencia">
        <div className="create-experience">
          <form onSubmit={onSubmit}>
            <div className="field">
              <label>Empresa</label>
              <input name="company" />
            </div>
            <div className="field">
              <label>Posición</label>
              <input name="position" />
            </div>
            <div className="field">
              <label>Duración</label>
              <input name="duration" />
            </div>
            <div className="field">
              <label>Descripción</label>
              <textarea name="description" />
            </div>
            <div className="wrapper-buttons">
              <button className="cancel">Cancelar</button>
              <button className="save" type="submit">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default CreateExperience;
