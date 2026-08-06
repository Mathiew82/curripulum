"use client";

import { useRef, useState } from "react";
import Modal from "../ui/Modal/Modal";
import Loading from "../ui/Loading/Loading";
import "./GeneratePDF.css";

function GeneratePDF() {
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pdfBlobRef = useRef<Blob | null>(null);

  const handleGenerate = async () => {
    setShowModal(true);
    setIsGenerating(true);
    setIsReady(false);
    setError(null);

    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { default: CvPdfDocument } = await import("../CvPdf/CvPdfDocument");
      const blob = await pdf(<CvPdfDocument />).toBlob();
      pdfBlobRef.current = blob;
      setIsReady(true);
    } catch (err) {
      setError("Error al generar el PDF. Inténtalo de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (pdfBlobRef.current) {
      const url = URL.createObjectURL(pdfBlobRef.current);
      const link = document.createElement("a");
      link.href = url;
      link.download = "curriculum.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    setShowModal(false);
  };

  const handleClose = () => {
    if (!isGenerating) {
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        onClick={handleGenerate}
        className="aside-button generate-pdf-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
          <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
          <path d="M17 18h2" />
          <path d="M20 15h-3v6" />
          <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1" />
        </svg>
        Generar PDF
      </button>
      <Modal active={showModal}>
        <button
          className="close-modal-button"
          onClick={handleClose}
          disabled={isGenerating}
        />
        <div className="generate-pdf-content">
          {isGenerating && <Loading text="Generando PDF..." />}
          {error && <p className="generate-pdf-error">{error}</p>}
          {isReady && (
            <>
              <p>El PDF se ha generado correctamente.</p>
              <button className="download-pdf-button" onClick={handleDownload}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Descargar PDF
              </button>
            </>
          )}
          {error && (
            <button className="generate-pdf-retry" onClick={handleGenerate}>
              Reintentar
            </button>
          )}
        </div>
      </Modal>
    </>
  );
}

export default GeneratePDF;
