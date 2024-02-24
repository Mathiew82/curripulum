import { useState } from "react";
import CreateFormation from "./CreateFormation/CreateFormation.tsx";
import "./Formation.css";

type Formation = {
  trainingCenter: string;
  theme: string;
  date: string;
  description: string;
};

function Formation() {
  const [formations, setFormations] = useState<Formation[]>([
    {
      trainingCenter: "Centro de formación",
      theme: "Desarrollo de páginas web",
      date: "2019",
      description:
        "Aquí la descripción del curso sobre los temas que se enseñaron en el curso.",
    },
  ]);

  const onRemoveFormation = (formationToRemove: Formation) => {
    const newFormations = formations.filter(
      (formation: Formation) => formation !== formationToRemove,
    );
    setFormations(newFormations);
  };

  const [showCreateFormationModal, setShowCreateFormationModal] =
    useState<boolean>(false);

  const addFormation = (formation: Formation): void => {
    const newFormations = [...formations];
    newFormations.push(formation);
    setFormations(newFormations);
  };

  return (
    <>
      <div className="editable">
        <h2>Formación</h2>
        {formations.map((formation: Formation) => (
          <div className="formation" key={formation.trainingCenter}>
            <h3>{formation.trainingCenter}</h3>
            <div className="theme">{formation.theme}</div>
            <div className="date">{formation.date}</div>
            <div className="description">{formation.description}</div>
            <svg
              onClick={() => onRemoveFormation(formation)}
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
          onClick={() => setShowCreateFormationModal(true)}
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
      </div>
      <CreateFormation
        active={showCreateFormationModal}
        closeModal={setShowCreateFormationModal}
        addFormation={addFormation}
      />
    </>
  );
}

export default Formation;
