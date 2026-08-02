import React, { useState } from "react";
import "./ShowPreview.css";

const iconPreview = (
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
    <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
    <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
    <path d="M7 15a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2l0 -4" />
  </svg>
);

const iconEdit = (
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
    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415" />
    <path d="M16 5l3 3" />
  </svg>
);

function ShowPreview() {
  const [textButton, setTextButton] = useState<string>("Modo imprimir");
  const [iconButton, setIconButton] = useState<React.ReactNode>(iconPreview);

  const onToggleTextButton = (): void => {
    if (document.body.classList.contains("preview")) {
      setTextButton("Modo edición");
    } else {
      setTextButton("Modo imprimir");
    }
  };

  const onToggleIconButton = (): void => {
    if (document.body.classList.contains("preview")) {
      setIconButton(iconEdit);
    } else {
      setIconButton(iconPreview);
    }
  };

  const onTogglePreview = (): void => {
    document.body.classList.toggle("preview");
    onToggleTextButton();
    onToggleIconButton();
  };

  return (
    <>
      <button onClick={onTogglePreview} className="aside-button show-preview-button">
        {iconButton}
        {textButton}
      </button>
    </>
  );
}

export default ShowPreview;
