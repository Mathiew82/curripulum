import { useState } from "react";
import CreateFormation from "./CreateFormation/CreateFormation.tsx";
import "./Formation.css";

export type FormationType = {
  id: string;
  trainingCenter: string;
  theme: string;
  date: string;
  description: string;
};

function Formation() {
  const [activate, setActivate] = useState<boolean>(true);
  const [currentFormation, setCurrentFormation] =
    useState<FormationType | null>(null);
  const [formations, setFormations] = useState<FormationType[]>([
    {
      id: "v10aE1ftEmDkCOGMmHSAVD1VesYXnD1T",
      trainingCenter: "Escuela Ingeniería Informática",
      theme: "Desarrollo de páginas web",
      date: "2019",
      description:
        "Aquí la descripción del curso sobre los temas que se enseñaron en el curso.",
    },
  ]);

  const [showCreateFormationModal, setShowCreateFormationModal] =
    useState<boolean>(false);

  const onCreateFormation = (): void => {
    setCurrentFormation(null);
    setShowCreateFormationModal(true);
  };

  const onRemoveFormation = (formationIdToRemove: string): void => {
    const newFormations = formations.filter(
      (formation: FormationType) => formation.id !== formationIdToRemove,
    );
    setFormations(newFormations);
  };

  const onEditFormation = (formation: FormationType): void => {
    setCurrentFormation(formation);
    setShowCreateFormationModal(true);
  };

  const addFormation = (formation: FormationType): void => {
    const newFormations = [...formations];
    newFormations.push(formation);
    setFormations(newFormations);
  };

  const onUpdateFormation = (formationToUpdate: FormationType): void => {
    formations.forEach((formation: FormationType) => {
      if (formation.id === formationToUpdate.id) {
        formation = formationToUpdate;
      }
    });

    setFormations(formations);
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
            {formations.map((formation: FormationType) => (
              <div className="formation" key={formation.trainingCenter}>
                <h3>{formation.trainingCenter}</h3>
                <div className="theme">{formation.theme}</div>
                <div className="date">{formation.date}</div>
                <div className="description">{formation.description}</div>
                <button
                  onClick={() => onEditFormation(formation)}
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
                  onClick={() => onRemoveFormation(formation.id)}
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

            <button onClick={() => onCreateFormation()} className="edit-button">
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
        </>
      ) : (
        <div className="wrapper-add-formation-module">
          <button onClick={addFormationModule} className="add-formation-module">
            Agregar formación
          </button>
        </div>
      )}
      {showCreateFormationModal && (
        <CreateFormation
          active={showCreateFormationModal}
          closeModal={setShowCreateFormationModal}
          addFormation={addFormation}
          updateFormation={onUpdateFormation}
          formation={currentFormation as FormationType}
        />
      )}
    </>
  );
}

export default Formation;
