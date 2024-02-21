import Modal from "../../ui/Modal/Modal.tsx";
import Certificate from "../Certificate.tsx";
import "./CreateCertificate.css";

interface Props {
  active: boolean;
  closeModal: Function;
  addCertificate: Function;
}

function CreateCertificate({ active, closeModal, addCertificate }: Props) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const formJson = Object.fromEntries(formData.entries());
    const newObject: Record<string, string> = {};

    for (const key in formJson) {
      newObject[key] = (formJson[key] as string).trim();
    }

    addCertificate(newObject as Certificate);
    closeModal(false);
  };

  const onCancel = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    closeModal(false);
  };

  return (
    <>
      <Modal active={active} title="Agregar nueva formación">
        <div className="create-certificate">
          <form onSubmit={onSubmit}>
            <div className="field">
              <label>Centro de formación</label>
              <input name="trainingCenter" />
            </div>
            <div className="field">
              <label>Tema del curso</label>
              <input name="theme" />
            </div>
            <div className="field">
              <label>Fecha del curso</label>
              <input name="date" />
            </div>
            <div className="field">
              <label>Descripción</label>
              <textarea name="description" />
            </div>
            <div className="wrapper-buttons">
              <button onClick={onCancel} className="cancel">
                Cancelar
              </button>
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

export default CreateCertificate;
