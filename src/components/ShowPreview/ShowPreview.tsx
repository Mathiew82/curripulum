import { useState } from "react";
import "./ShowPreview.css";

function ShowPreview() {
  const [textButton, setTextButton] = useState<string>("Mostrar previa");

  const onTogglePreview = () => {
    document.body.classList.toggle("preview");

    if (document.body.classList.contains("preview")) {
      setTextButton("Mostrar edición");
    } else {
      setTextButton("Mostrar previa");
    }
  };

  return (
    <>
      <button onClick={onTogglePreview} className="show-preview-button">
        {textButton}
      </button>
    </>
  );
}

export default ShowPreview;
