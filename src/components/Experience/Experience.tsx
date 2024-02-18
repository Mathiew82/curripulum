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
      company: "Promofarma",
      position: "Frontend engineer",
      duration: "jun. 2021 - actualidad",
      description:
        "Tecnologías: CSS, SASS, JavaScript, Typescript, Vue.js, Vuex, GraphQL, Jest, GIT",
    },
    {
      company: "Housfy",
      position: "Front-End Developer",
      duration: "dic. 2020 - abr. 2021",
      description:
        "Tecnologías: CSS, SASS, JavaScript, Vue.js, Nuxt.js, Vuex, Jest, GIT",
    },
  ]);

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
        {experiences.map(({ company, position, duration, description }) => (
          <article key={company} className="experience">
            <h3>{company}</h3>
            <div className="position">{position}</div>
            <div className="duration">{duration}</div>
            <div className="description">{description}</div>
          </article>
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
