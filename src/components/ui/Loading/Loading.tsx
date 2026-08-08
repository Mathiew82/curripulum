"use client";

import "./Loading.css";

interface LoadingProps {
  text?: string;
}

function Loading({ text }: LoadingProps) {
  return (
    <div className="loading">
      <div className="spinner" />
      {text && <p>{text}</p>}
    </div>
  );
}

export default Loading;
