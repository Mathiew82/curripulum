import React, { useState } from "react";
import "./Languages.css";

function Languages() {
  const [activate, setActivate] = useState<boolean>(true);
  const [newLanguage, setNewLanguage] = useState<string>("");
  const [languages, setLanguages] = useState<string[]>([
    "Español (nativo)",
    "Italiano (medio)",
    "Inglés (bajo)",
  ]);

  const onRemoveLanguage = (languageToRemove: string): void => {
    const newLanguages = languages.filter(
      (language: string) => language !== languageToRemove,
    );
    setLanguages(newLanguages);
  };

  const onAddLanguage = (): void => {
    if (newLanguage === "") return;

    const newLanguages = [...languages];
    newLanguages.push(newLanguage);

    setLanguages(newLanguages);
    setNewLanguage("");
  };

  const onAddLanguageWithEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key !== "Enter" || newLanguage === "") return;
    onAddLanguage();
  };

  const onEditNewLanguage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = (event.target as HTMLInputElement).value;
    setNewLanguage(value);
  };

  const onRemoveLanguagesModule = (): void => {
    setActivate(false);
  };

  const addLanguagesModule = (): void => {
    setActivate(true);
  };

  return (
    <>
      {activate ? (
        <>
          <div className="editable">
            <h2>Idiomas</h2>
            <ul className="languages">
              {languages.map((language) => (
                <li key={language}>
                  {language}
                  <svg
                    onClick={() => onRemoveLanguage(language)}
                    width="24px"
                    height="24px"
                    className="remove-tag-button"
                    viewBox="-3.5 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"
                      fill="currentColor"
                    />
                  </svg>
                </li>
              ))}
              <li className="input">
                <input
                  className="input-new-language"
                  onChange={onEditNewLanguage}
                  onKeyUp={onAddLanguageWithEnter}
                  placeholder="Ejemplo: Portugués (medio)"
                  value={newLanguage}
                />
              </li>
              <li onClick={onAddLanguage} className="add">
                añadir
              </li>
            </ul>
            <button
              onClick={onRemoveLanguagesModule}
              className="remove-module-button"
              aria-label="Eliminar módulo"
            />
          </div>
        </>
      ) : (
        <div className="wrapper-add-module">
          <button onClick={addLanguagesModule} className="add-module">
            Agregar idiomas
          </button>
        </div>
      )}
    </>
  );
}

export default Languages;
