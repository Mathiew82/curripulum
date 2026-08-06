"use client";

import React from "react";
import "./Modal.css";

interface Props {
  children: React.ReactNode;
  active: boolean;
  title?: string;
  headerRight?: React.ReactNode;
}

function Modal({ children, active, title, headerRight }: Props) {
  return (
    <>
      {active && (
        <div className="wrapper-modal">
          <div className="modal">
            <div className="modal-header">
              <h2>{title}</h2>
              {headerRight}
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
