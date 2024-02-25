import { useState } from "react";
import "./ShowPreview.css";

function ShowPreview() {
  const [textButton, setTextButton] = useState<string>("Modo imprimir");

  const onToggleTextButton = (): void => {
    if (document.body.classList.contains("preview")) {
      setTextButton("Modo edición");
    } else {
      setTextButton("Modo imprimir");
    }
  };

  const onTogglePreview = (): void => {
    document.body.classList.toggle("preview");
    onToggleTextButton();
  };

  document.body.onkeyup = (event: KeyboardEvent): void => {
    if (event.key !== "Escape") return;
    document.body.classList.remove("preview");
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
