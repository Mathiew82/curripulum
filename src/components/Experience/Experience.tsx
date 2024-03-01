import { useState } from "react";
import CreateExperience from "./CreateExperience/CreateExperience.tsx";
import "./Experience.css";

type Experience = {
  company: string;
  position: string;
  duration: string;
  description: string;
};

function Experience() {
  const [activate, setActivate] = useState<boolean>(true);
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      company: "Empresa",
      position: "Posición",
      duration: "jun. 2021 - actualidad",
      description:
        "Aquí la descripción de las tareas y responsabilidades de este puesto de trabajo.",
    },
  ]);

  const [showCreateExperienceModal, setShowCreateExperienceModal] =
    useState<boolean>(false);

  const onRemoveExperience = (experienceToRemove: Experience): void => {
    const newExperiences = experiences.filter(
      (experience: Experience) => experience !== experienceToRemove,
    );
    setExperiences(newExperiences);
  };

  const addExperience = (experience: Experience): void => {
    const newExperiences = [...experiences];
    newExperiences.push(experience);
    setExperiences(newExperiences);
  };

  const onRemoveExperienceModule = (): void => {
    setActivate(false);
  };

  const addExperienceModule = (): void => {
    setActivate(true);
  };

  return (
    <>
      {activate ? (
        <>
          <div className="editable">
            <h2>Experiencia</h2>
            {experiences.map((experience: Experience) => (
              <div className="experience" key={experience.company}>
                <h3>{experience.company}</h3>
                <div className="position">{experience.position}</div>
                <div className="duration">{experience.duration}</div>
                <div className="description">{experience.description}</div>
                <svg
                  onClick={() => onRemoveExperience(experience)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="remove-button"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
                    fill="currentColor"
                  />
                  <path
                    d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            ))}

            <button
              onClick={() => setShowCreateExperienceModal(true)}
              className="edit-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 18"
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
              añadir
            </button>
            <button
              onClick={onRemoveExperienceModule}
              className="remove-module-button"
              aria-label="Eliminar módulo"
            />
          </div>
          <CreateExperience
            active={showCreateExperienceModal}
            closeModal={setShowCreateExperienceModal}
            addExperience={addExperience}
          />
        </>
      ) : (
        <div className="wrapper-add-certificates-module">
          <button
            onClick={addExperienceModule}
            className="add-certificates-module"
          >
            Agregar experiencia
          </button>
        </div>
      )}
    </>
  );
}

export default Experience;
