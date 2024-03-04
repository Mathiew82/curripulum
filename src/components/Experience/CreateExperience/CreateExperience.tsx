import { useState } from "react";
import Modal from "../../ui/Modal/Modal.tsx";
import { ExperienceType } from "../Experience.tsx";
import { generateId } from "../../../utils/generateId.ts";
import "./CreateExperience.css";

interface Props {
  active: boolean;
  closeModal: Function;
  addExperience: Function;
  updateExperience: Function;
  experience: ExperienceType;
}

function CreateExperience({
  active,
  closeModal,
  addExperience,
  updateExperience,
  experience,
}: Props) {
  const [company, setCompany] = useState<string>(experience?.company || "");
  const [position, setPosition] = useState<string>(experience?.position || "");
  const [duration, setDuration] = useState<string>(experience?.duration || "");
  const [description, setDescription] = useState<string>(
    experience?.description || "",
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

    if (experience) {
      experience.company = company;
      experience.position = position;
      experience.duration = duration;
      experience.description = description;

      updateExperience(experience);
    } else {
      addExperience(newObject as unknown as ExperienceType);
    }

    closeModal(false);
  };

  const onCancel = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    closeModal(false);
  };

  return (
    <>
      <Modal active={active} title="Agregar nueva experiencia">
        <div className="create-experience">
          <form onSubmit={onSubmit}>
            <input
              type="hidden"
              name="id"
              value={experience ? experience.id : generateId()}
            />
            <div className="field">
              <label>Empresa</label>
              <input
                onChange={(event) => setCompany(event.target.value)}
                name="company"
                value={company}
              />
            </div>
            <div className="field">
              <label>Posición</label>
              <input
                onChange={(event) => setPosition(event.target.value)}
                name="position"
                value={position}
              />
            </div>
            <div className="field">
              <label>Duración</label>
              <input
                onChange={(event) => setDuration(event.target.value)}
                name="duration"
                value={duration}
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
                {experience ? "Guardar" : "Agregar"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default CreateExperience;
