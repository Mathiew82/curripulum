import "./Settings.css";

function Settings() {
  const onIncreaseFontSize = (): void => {
    if (document.body.classList.contains("d2")) {
      document.body.classList.remove("d2");
      return;
    }
    if (!document.body.classList.contains("x2")) {
      document.body.classList.add("x2");
    }
  };

  const onDecreaseFontSize = (): void => {
    if (document.body.classList.contains("x2")) {
      document.body.classList.remove("x2");
      return;
    }
    if (!document.body.classList.contains("d2")) {
      document.body.classList.add("d2");
    }
  };

  return (
    <div className="settings">
      <button onClick={onIncreaseFontSize} title="Letra más grande">
        +
      </button>
      <button onClick={onDecreaseFontSize} title="Letra más pequeña">
        -
      </button>
    </div>
  );
}

export default Settings;
