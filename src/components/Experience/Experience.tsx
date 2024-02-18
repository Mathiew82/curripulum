import { useState } from "react";
import CreateExperience from "../Experience/CreateExperience/CreateExperience.tsx";
import "./Experience.css";

type Experience = {
  company: string;
  position: string;
  duration: string;
  description: string;
};

function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      company: "Empresa",
      position: "Posición",
      duration: "jun. 2021 - actualidad",
      description:
        "Aquí la descripción de las tareas y responsabilidades de este puesto de trabajo",
    },
  ]);

  const onRemoveExperience = (experienceToRemove: Experience) => {
    const newExperiences = experiences.filter(
      (experience: Experience) => experience !== experienceToRemove,
    );
    setExperiences(newExperiences);
  };

  const [showCreateExperienceModal, setShowCreateExperienceModal] =
    useState<boolean>(false);

  const addExperience = (experience: Experience): void => {
    const newExperiences = [...experiences];
    newExperiences.push(experience);
    setExperiences(newExperiences);
  };

  return (
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
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
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
          crear
        </button>
      </div>
      <CreateExperience
        active={showCreateExperienceModal}
        closeModal={setShowCreateExperienceModal}
        addExperience={addExperience}
      />
    </>
  );
}

export default Experience;
