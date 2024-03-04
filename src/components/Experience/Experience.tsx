import { useState } from "react";
import CreateExperience from "./CreateExperience/CreateExperience.tsx";
import "./Experience.css";

export type ExperienceType = {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
};

function Experience() {
  const [activate, setActivate] = useState<boolean>(true);
  const [currentExperience, setCurrentExperience] =
    useState<ExperienceType | null>(null);
  const [experiences, setExperiences] = useState<ExperienceType[]>([
    {
      id: "v10aE1ftEmDkCOGMmHSAVD1VesYXnD1T",
      company: "Empresa",
      position: "Posición",
      duration: "jun. 2021 - actualidad",
      description:
        "Aquí la descripción de las tareas y responsabilidades de este puesto de trabajo.",
    },
  ]);

  const [showCreateExperienceModal, setShowCreateExperienceModal] =
    useState<boolean>(false);

  const onCreateExperience = (): void => {
    setCurrentExperience(null);
    setShowCreateExperienceModal(true);
  };

  const onRemoveExperience = (experienceIdToRemove: string): void => {
    const newFormations = experiences.filter(
      (experience: ExperienceType) => experience.id !== experienceIdToRemove,
    );
    setExperiences(newFormations);
  };

  const onEditExperience = (experience: ExperienceType): void => {
    setCurrentExperience(experience);
    setShowCreateExperienceModal(true);
  };

  const addExperience = (experience: ExperienceType): void => {
    const newExperiences = [...experiences];
    newExperiences.push(experience);
    setExperiences(newExperiences);
  };

  const onUpdateExperience = (experienceToUpdate: ExperienceType): void => {
    experiences.forEach((experience: ExperienceType) => {
      if (experience.id === experienceToUpdate.id) {
        experience = experienceToUpdate;
      }
    });

    setExperiences(experiences);
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
            {experiences.map((experience: ExperienceType) => (
              <div className="experience" key={experience.company}>
                <h3>{experience.company}</h3>
                <div className="position">{experience.position}</div>
                <div className="duration">{experience.duration}</div>
                <div className="description">{experience.description}</div>
                <button
                  onClick={() => onEditExperience(experience)}
                  className="edit-item-button"
                  title="Editar este item"
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 -2 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => onRemoveExperience(experience.id)}
                  className="remove-item-button"
                  title="Eliminar este item"
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="-3.5 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            ))}

            <button
              onClick={() => onCreateExperience()}
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
              title="Eliminar módulo"
            />
          </div>
        </>
      ) : (
        <div className="wrapper-add-experience-module">
          <button
            onClick={addExperienceModule}
            className="add-experience-module"
          >
            Agregar experiencia
          </button>
        </div>
      )}
      {showCreateExperienceModal && (
        <CreateExperience
          active={showCreateExperienceModal}
          closeModal={setShowCreateExperienceModal}
          addExperience={addExperience}
          updateExperience={onUpdateExperience}
          experience={currentExperience as ExperienceType}
        />
      )}
    </>
  );
}

export default Experience;
