"use client";

import "./Loading.css";

interface LoadingProps {
  text?: string;
}

function Loading({ text = "Cargando..." }: LoadingProps) {
  return (
    <div className="loading">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}

export default Loading;
