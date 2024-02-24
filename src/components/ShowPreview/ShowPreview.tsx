import "./ShowPreview.css";

function ShowPreview() {
  const onTogglePreview = (): void => {
    document.body.classList.toggle("preview");
  };

  document.body.onkeyup = (event: KeyboardEvent): void => {
    if (event.key !== "Escape") return;
    document.body.classList.remove("preview");
  };

  return (
    <>
      <button onClick={onTogglePreview} className="show-preview-button">
        Modo imprimir
      </button>
      <div className="info-text">
        Presiona <strong>esc</strong> para volver a la edición desde el modo
        imprimir
      </div>
    </>
  );
}

export default ShowPreview;
