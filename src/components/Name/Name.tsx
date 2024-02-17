import { useEffect, useState } from "react";

function Name() {
  const [name, setName] = useState("Pepe Pérez García");
  const [editingName, setEditingName] = useState(false);

  const handleToggleEditName = () => {
    setEditingName(!editingName);
  };

  const handleChangename = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          <span onClick={handleToggleEditName} className="edit-button">
            editar
          </span>
        </h1>
      ) : (
        <div className="editable">
          <input
            className="input-name"
            onChange={handleChangename}
            value={name}
          />
          <span onClick={handleToggleEditName} className="edit-button">
            guardar
          </span>
        </div>
      )}
    </>
  );
}

export default Name;
