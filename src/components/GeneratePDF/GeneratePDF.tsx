import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import Modal from "../ui/Modal/Modal";
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

    document.body.classList.add("preview");

    try {
      const element = document.querySelector(".main-content") as HTMLElement;

      const opt = {
        margin: [0, 0, 0, 0] as [number, number, number, number],
        filename: "curriculum.pdf",
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait" as const,
        },
      };

      const blob = await html2pdf()
        .set(opt)
        .from(element)
        .toPdf()
        .outputPdf("blob");

      pdfBlobRef.current = blob;
      setIsReady(true);
    } catch (err) {
      setError("Error al generar el PDF. Inténtalo de nuevo.");
    } finally {
      document.body.classList.remove("preview");
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
      <button onClick={handleGenerate} className="generate-pdf-button">
        Generar PDF
      </button>
      <Modal title="Generar PDF" active={showModal}>
        <div className="generate-pdf-content">
          {isGenerating && (
            <div className="generate-pdf-loading">
              <div className="spinner" />
              <p>Generando PDF...</p>
            </div>
          )}
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
          <button
            className="generate-pdf-close"
            onClick={handleClose}
            disabled={isGenerating}
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </>
  );
}

export default GeneratePDF;
