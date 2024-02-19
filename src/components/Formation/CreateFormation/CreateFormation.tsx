import Modal from "../../ui/Modal/Modal.tsx";
import Formation from "../Formation.tsx";
import "./CreateFormation.css";

interface Props {
  active: boolean;
  closeModal: Function;
  addFormation: Function;
}

function CreateFormation({ active, closeModal, addFormation }: Props) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form as HTMLFormElement);

    const formJson = Object.fromEntries(formData.entries());
    const newObject: Record<string, string> = {};

    for (const key in formJson) {
      newObject[key] = (formJson[key] as string).trim();
    }

    addFormation(newObject as Formation);
    closeModal(false);
  };

  return (
    <>
      <Modal active={active} title="Agregar nueva formación">
        <div className="create-formation">
          <form onSubmit={onSubmit}>
            <div className="field">
              <label>Empresa</label>
              <input name="trainingCenter" />
            </div>
            <div className="field">
              <label>Posición</label>
              <input name="theme" />
            </div>
            <div className="field">
              <label>Duración</label>
              <input name="date" />
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

export default CreateFormation;
