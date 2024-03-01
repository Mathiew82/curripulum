import "./Settings.css";

function Settings() {
  const onIncreaseFontSize = (): void => {
    if (document.body.classList.contains("font-size-d2")) {
      document.body.classList.remove("font-size-d2");
      return;
    }
    if (!document.body.classList.contains("font-size-x2")) {
      document.body.classList.add("font-size-x2");
    }
  };

  const onDecreaseFontSize = (): void => {
    if (document.body.classList.contains("font-size-x2")) {
      document.body.classList.remove("font-size-x2");
      return;
    }
    if (!document.body.classList.contains("font-size-d2")) {
      document.body.classList.add("font-size-d2");
    }
  };

  const onIncreaseSpacing = (): void => {
    if (document.body.classList.contains("spacing-d2")) {
      document.body.classList.remove("spacing-d2");
      return;
    }
    if (!document.body.classList.contains("spacing-x2")) {
      document.body.classList.add("spacing-x2");
    }
  };

  const onDecreaseSpacing = (): void => {
    if (document.body.classList.contains("spacing-x2")) {
      document.body.classList.remove("spacing-x2");
      return;
    }
    if (!document.body.classList.contains("spacing-d2")) {
      document.body.classList.add("spacing-d2");
    }
  };

  return (
    <>
      <div className="settings font-size">
        <div>Tamaño letra: </div>
        <button onClick={onDecreaseFontSize} title="Letra más pequeña">
          -
        </button>
        <button onClick={onIncreaseFontSize} title="Letra más grande">
          +
        </button>
      </div>
      <div className="settings spacing">
        <div>Espacios: </div>
        <button onClick={onDecreaseSpacing} title="Menos espacio">
          -
        </button>
        <button onClick={onIncreaseSpacing} title="Más espacio">
          +
        </button>
      </div>
    </>
  );
}

export default Settings;
