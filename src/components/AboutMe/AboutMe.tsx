"use client";

import { useEffect, useState } from "react";
import { cvStore } from "../../store/cvStore";

export type AboutMeType = {
  id: string;
  text: string;
};

function AboutMe() {
  const [activate, setActivate] = useState(true);
  const [editing, setEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState<AboutMeType>({
    id: "v10aE1ftEmDkCOGMmHSAVD1VesYXnD1T",
    text: "Aquí una breve descripción sobre ti, tus intereses profesionales y objetivos de carrera.",
  });
  const [draftText, setDraftText] = useState(aboutMe.text);

  useEffect(() => {
    const unsub = cvStore.subscribe(() => {
      const data = cvStore.getData();
      if (data.aboutMe) {
        setAboutMe((prev) => {
          if (prev.id === data.aboutMe!.id && prev.text === data.aboutMe!.text) return prev;
          return { id: data.aboutMe!.id, text: data.aboutMe!.text };
        });
        setDraftText((prev) => (prev === data.aboutMe!.text ? prev : data.aboutMe!.text));
      }
      setActivate((prev) => (prev === data.aboutMeActive ? prev : data.aboutMeActive));
    });
    return unsub;
  }, []);

  useEffect(() => {
    cvStore.setAboutMeActive(activate);
  }, [activate]);

  useEffect(() => {
    if (activate) {
      cvStore.setAboutMe(aboutMe);
    }
  }, [aboutMe, activate]);

  const onToggleEdit = () => {
    if (editing) {
      setAboutMe((prev) => ({ ...prev, text: draftText }));
    } else {
      setDraftText(aboutMe.text);
    }
    setEditing(!editing);
  };

  const onCancelEdit = () => {
    setDraftText(aboutMe.text);
    setEditing(false);
  };

  const onRemoveModule = () => {
    setActivate(false);
  };

  const addModule = () => {
    setActivate(true);
  };

  if (!activate) {
    return (
      <div className="wrapper-add-module">
        <button onClick={addModule} className="button default add-module">
          Agregar sobre mí
        </button>
      </div>
    );
  }

  return (
    <div className="editable">
      <h2>Sobre mí</h2>
      {editing ? (
        <textarea
          className="about-me-textarea"
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
        />
      ) : (
        <p className="about-me-text">{aboutMe.text}</p>
      )}
      {editing ? (
        <>
          <button
            onClick={onCancelEdit}
            className="button default"
            style={{ marginRight: "0.5rem", marginTop: "0.5rem" }}
          >
            Cancelar
          </button>
          <button
            onClick={onToggleEdit}
            className="button default"
            style={{ marginTop: "0.5rem" }}
          >
            Guardar
          </button>
        </>
      ) : (
        <button onClick={onToggleEdit} className="button default edit-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 16"
            stroke="currentColor"
            fill="none"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
            <path d="M13.5 6.5l4 4" />
          </svg>
          editar
        </button>
      )}
      <button
        onClick={onRemoveModule}
        className="remove-module-button"
        aria-label="Eliminar módulo"
        title="Eliminar módulo"
      />
    </div>
  );
}

export default AboutMe;
