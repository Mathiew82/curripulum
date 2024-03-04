import React, { useEffect, useState } from "react";
import "./Name.css";

function Name() {
  const [name, setName] = useState<string>("Pepe Pérez García");
  const [photo, setPhoto] = useState<string | ArrayBuffer | null | undefined>(
    null,
  );
  const [editingName, setEditingName] = useState<boolean>(false);

  const onToggleEditName = (): void => {
    setEditingName(!editingName);
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = (event.target as HTMLInputElement).value;
    setName(value);
  };

  const onChangeNameWithEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key !== "Enter" || name === "") return;

    const value = (event.target as HTMLInputElement).value;
    setName(value);

    (document.querySelector(".save-name-button") as HTMLButtonElement).click();
  };

  const onLoadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      setPhoto(e.target?.result);
    };

    reader.readAsDataURL(
      event.target.files ? event.target.files[0] : new Blob(),
    );
  };

  useEffect(() => {
    if (editingName) {
      const inputNameElement = document.querySelector(".input-name");
      (inputNameElement as HTMLInputElement).focus();
    }
  }, [editingName]);

  return (
    <>
      {!editingName ? (
        <h1 className="wrapper-name editable">
          <img
            src={`${photo || "/images/default-photo.jpg"}`}
            className="photo"
            alt="Foto por defecto"
          />
          <span className="display-name">{name}</span>
          <button onClick={onToggleEditName} className="edit-button">
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
        </h1>
      ) : (
        <div className="wrapper-name editable">
          {photo ? (
            <>
              <img
                src={`${photo || "/images/default-photo.jpg"}`}
                className="photo"
                alt="Foto personal"
              />
              <label className="image-label" htmlFor="image">
                Cambiar foto
                <input
                  type="file"
                  id="image"
                  onChange={onLoadFile}
                  name="image"
                  accept="image/png, image/jpeg"
                />
              </label>
            </>
          ) : (
            <label className="image-label" htmlFor="image">
              Subir foto
              <input
                type="file"
                id="image"
                onChange={onLoadFile}
                name="image"
                accept="image/png, image/jpeg"
              />
            </label>
          )}
          <input
            className="input-name"
            onChange={onChangeName}
            onKeyUp={onChangeNameWithEnter}
            value={name}
          />
          <button
            onClick={onToggleEditName}
            className="save-name-button edit-button"
          >
            guardar
          </button>
        </div>
      )}
    </>
  );
}

export default Name;
