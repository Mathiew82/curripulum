import { useState } from "react";
import Modal from "../../ui/Modal/Modal.tsx";
import { FormationType } from "../Formation.tsx";
import { generateId } from "../../../utils/generateId.ts";
import "./CreateFormation.css";

interface Props {
  active: boolean;
  closeModal: Function;
  addFormation: Function;
  updateFormation: Function;
  formation: FormationType;
}

function CreateFormation({
  active,
  closeModal,
  addFormation,
  updateFormation,
  formation,
}: Props) {
  const [trainingCenter, setTrainingCenter] = useState<string>(
    formation?.trainingCenter || "",
  );
  const [theme, setTheme] = useState<string>(formation?.theme || "");
  const [date, setDate] = useState<string>(formation?.date || "");
  const [description, setDescription] = useState<string>(
    formation?.description || "",
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const formJson = Object.fromEntries(formData.entries());
    const newObject: Record<string, string> = {};

    for (const key in formJson) {
      newObject[key] = (formJson[key] as string).trim();
    }

    if (formation) {
      formation.trainingCenter = trainingCenter;
      formation.theme = theme;
      formation.date = date;
      formation.description = description;

      updateFormation(formation);
    } else {
      addFormation(newObject as unknown as FormationType);
    }

    closeModal(false);
  };

  const onCancel = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    closeModal(false);
  };

  return (
    <>
      <Modal active={active} title="Agregar nueva formación">
        <div className="create-formation">
          <form onSubmit={onSubmit}>
            <input
              type="hidden"
              name="id"
              value={formation ? formation.id : generateId()}
            />
            <div className="field">
              <label>Centro de formación</label>
              <input
                onChange={(event) => setTrainingCenter(event.target.value)}
                name="trainingCenter"
                value={trainingCenter}
              />
            </div>
            <div className="field">
              <label>Tema del curso</label>
              <input
                onChange={(event) => setTheme(event.target.value)}
                name="theme"
                value={theme}
              />
            </div>
            <div className="field">
              <label>Fecha del curso</label>
              <input
                onChange={(event) => setDate(event.target.value)}
                name="date"
                value={date}
              />
            </div>
            <div className="field">
              <label>Descripción</label>
              <textarea
                onChange={(event) => setDescription(event.target.value)}
                onFocus={(event) =>
                  event.currentTarget.setSelectionRange(
                    event.currentTarget.value.length,
                    event.currentTarget.value.length,
                  )
                }
                name="description"
                value={description}
              />
            </div>
            <div className="wrapper-buttons">
              <button onClick={onCancel} className="cancel">
                Cancelar
              </button>
              <button className="save" type="submit">
                {formation ? "Guardar" : "Agregar"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default CreateFormation;
