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
        <div className="settings-label">Tamaño letra: </div>
        <div className="settings-buttons">
          <button onClick={onDecreaseFontSize} title="Letra más pequeña">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
            </svg>
          </button>
          <button onClick={onIncreaseFontSize} title="Letra más grande">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1 -2 0v-6h-6a1 1 0 0 1 0 -2h6v-6a1 1 0 0 1 1 -1" />
            </svg>
          </button>
        </div>
      </div>
      <div className="settings spacing">
        <div className="settings-label">Espacios: </div>
        <div className="settings-buttons">
          <button onClick={onDecreaseSpacing} title="Menos espacio">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
            </svg>
          </button>
          <button onClick={onIncreaseSpacing} title="Más espacio">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1 -2 0v-6h-6a1 1 0 0 1 0 -2h6v-6a1 1 0 0 1 1 -1" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default Settings;
