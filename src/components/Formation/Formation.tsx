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
  const [activate, setActivate] = useState<boolean>(true);
  const [formations, setFormations] = useState<Formation[]>([
    {
      trainingCenter: "Escuela Ingeniería Informática",
      theme: "Desarrollo de páginas web",
      date: "2019",
      description:
        "Aquí la descripción del curso sobre los temas que se enseñaron en el curso.",
    },
  ]);

  const [showCreateFormationModal, setShowCreateFormationModal] =
    useState<boolean>(false);

  const onRemoveFormation = (formationToRemove: Formation): void => {
    const newFormations = formations.filter(
      (formation: Formation) => formation !== formationToRemove,
    );
    setFormations(newFormations);
  };

  const addFormation = (formation: Formation): void => {
    const newFormations = [...formations];
    newFormations.push(formation);
    setFormations(newFormations);
  };

  const onRemoveFormationModule = (): void => {
    setActivate(false);
  };

  const addFormationModule = (): void => {
    setActivate(true);
  };

  return (
    <>
      {activate ? (
        <>
          <div className="editable">
            <h2>Formación</h2>
            {formations.map((formation: Formation) => (
              <div className="formation" key={formation.trainingCenter}>
                <h3>{formation.trainingCenter}</h3>
                <div className="theme">{formation.theme}</div>
                <div className="date">{formation.date}</div>
                <div className="description">{formation.description}</div>
                <button
                  onClick={() => onRemoveFormation(formation)}
                  className="edit-item-button"
                  title="Editar este item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M17.828 2a3 3 0 0 1 1.977 .743l.145 .136l1.171 1.17a3 3 0 0 1 .136 4.1l-.136 .144l-1.706 1.707l2.292 2.293a1 1 0 0 1 .083 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.497 -1.32l.083 -.094l3.292 -3.293l-1.586 -1.585l-7.464 7.464a3.828 3.828 0 0 1 -2.474 1.114l-.233 .008c-.674 0 -1.33 -.178 -1.905 -.508l-1.216 1.214a1 1 0 0 1 -1.497 -1.32l.083 -.094l1.214 -1.216a3.828 3.828 0 0 1 .454 -4.442l.16 -.17l10.586 -10.586a3 3 0 0 1 1.923 -.873l.198 -.006zm0 2a1 1 0 0 0 -.608 .206l-.099 .087l-1.707 1.707l2.586 2.585l1.707 -1.706a1 1 0 0 0 .284 -.576l.01 -.131a1 1 0 0 0 -.207 -.609l-.087 -.099l-1.171 -1.171a1 1 0 0 0 -.708 -.293z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => onRemoveFormation(formation)}
                  className="remove-item-button"
                  title="Eliminar este item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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
                </button>
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
            <button
              onClick={onRemoveFormationModule}
              className="remove-module-button"
              aria-label="Eliminar módulo"
              title="Eliminar módulo"
            />
          </div>
          <CreateFormation
            active={showCreateFormationModal}
            closeModal={setShowCreateFormationModal}
            addFormation={addFormation}
          />
        </>
      ) : (
        <div className="wrapper-add-certificates-module">
          <button
            onClick={addFormationModule}
            className="add-certificates-module"
          >
            Agregar formación
          </button>
        </div>
      )}
    </>
  );
}

export default Formation;
