import { useState } from "react";
import CreateExperience from "../Experience/CreateExperience/CreateExperience.tsx";
import "./Experience.css";

function Experience() {
  const [showCreateExperienceModal, setShowCreateExperienceModal] =
    useState<boolean>(false);

  return (
    <>
      <div className="editable">
        <h2>Experiencia</h2>
        <article className="experience">
          <h3>Promofarma</h3>
          <div className="position">Frontend engineer</div>
          <div className="date">jun. 2021 - actualidad</div>
          <div className="description">
            Tecnologías: CSS, SASS, JavaScript, Typescript, Vue.js, Vuex,
            GraphQL, Jest, GIT
          </div>
        </article>
        <article className="experience">
          <h3>Housfy</h3>
          <div className="position">Front-End Developer</div>
          <div className="date">dic. 2020 - abr. 2021</div>
          <div className="description">
            Tecnologías: CSS, SASS, JavaScript, Vue.js, Nuxt.js, Vuex, Jest, GIT
          </div>
        </article>

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
      />
    </>
  );
}

export default Experience;
