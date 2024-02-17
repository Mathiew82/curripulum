import { useEffect, useState } from "react";
import "./Name.css";

function Name() {
  const [name, setName] = useState("Pepe Pérez García");
  const [editingName, setEditingName] = useState(false);

  const onToggleEditName = () => {
    setEditingName(!editingName);
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setName(value);
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
        <h1 className="editable">
          <span className="display-name">{name}</span>
          <span onClick={onToggleEditName} className="edit-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
              <path d="M13.5 6.5l4 4" />
            </svg>
            edit
          </span>
        </h1>
      ) : (
        <div className="editable">
          <input className="input-name" onChange={onChangeName} value={name} />
          <span onClick={onToggleEditName} className="edit-button">
            save
          </span>
        </div>
      )}
    </>
  );
}

export default Name;
