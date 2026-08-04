"use client";

import { useState } from "react";
import { AIConfigForm as LibAIConfigForm, useAIConfig } from "@tombcato/ai-selector-react";
import {
  getProvider,
  getStaticModels,
  sendDirectChat,
  type FetcherParams,
} from "@tombcato/ai-selector-core";
import Modal from "../ui/Modal/Modal";
import Loading from "../ui/Loading/Loading";
import { cvStore } from "../../store/cvStore";
import { buildCvText, buildATSOptimizationPrompt } from "./atsPrompt";
import "./AIConfigForm.css";

type Status = "form" | "processing" | "done" | "error";

const staticModelFetcher = async (params: FetcherParams) => {
  if (params.type === "fetchModels") {
    return getStaticModels(params.providerId);
  }
  return { success: true, latency: 0, message: "OK" };
};

function AIConfigForm({ active, closeModal }: { active: boolean; closeModal: () => void }) {
  const [status, setStatus] = useState<Status>("form");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");

  const aiConfig = useAIConfig({ modelFetcher: staticModelFetcher });

  const handleSave = () => {
    aiConfig.save();
  };

  const handleProcess = async () => {
    if (!aiConfig.isValid) {
      setErrorMsg("Completa la configuración del modelo de IA antes de continuar.");
      setStatus("error");
      return;
    }
    if (!jobDescription.trim()) {
      setErrorMsg("Agrega la oferta de trabajo a la que quieres postular.");
      setStatus("error");
      return;
    }

    setStatus("processing");
    setErrorMsg("");

    try {
      const cvData = cvStore.getData();
      const cvText = buildCvText(cvData);
      const prompt = buildATSOptimizationPrompt(cvText, jobDescription.trim());

      const provider = getProvider(aiConfig.providerId);
      const apiFormat = provider?.apiFormat ?? "openai";
      const baseUrl = aiConfig.baseUrl || provider?.baseUrl || "";

      const res = await sendDirectChat({
        apiFormat,
        baseUrl,
        apiKey: aiConfig.apiKey,
        model: aiConfig.model,
        messages: [{ role: "user", content: prompt }],
      });

      if (res.success && res.content) {
        setResult(res.content);
        setStatus("done");
      } else {
        setErrorMsg(res.message || "Error al procesar la optimización.");
        setStatus("error");
      }
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Error inesperado.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cv-optimizado-ats.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    handleClose();
  };

  const handleClose = () => {
    setStatus("form");
    setResult("");
    setErrorMsg("");
    closeModal();
  };

  const handleBack = () => {
    setStatus("form");
    setErrorMsg("");
  };

  return (
    <Modal title="Optimizar para ATS" active={active}>
      <div className="ats-config-content">
        {status === "form" && (
          <>
            <LibAIConfigForm
              language="en"
              showPreview={false}
              saveButtonText="Guardar configuración"
              modelFetcher={staticModelFetcher}
              onSave={handleSave}
            />
            <label className="ats-job-label" htmlFor="ats-job-description">
              Oferta de trabajo:
            </label>
            <textarea
              id="ats-job-description"
              className="ats-job-textarea"
              placeholder="Pega aquí la oferta de trabajo a la que quieres postular..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
            />
            <button className="ats-process-button" onClick={handleProcess}>
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
                <path d="M10 21h-3a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v3.5" />
                <path d="M9 9h1" />
                <path d="M9 13h2.5" />
                <path d="M9 17h1" />
                <path d="M14 21v-4a2 2 0 1 1 4 0v4" />
                <path d="M14 19h4" />
                <path d="M21 15v6" />
              </svg>
              Procesar optimización
            </button>
          </>
        )}

        {status === "processing" && <Loading text="Optimizando currículum..." />}

        {status === "done" && (
          <div className="ats-result">
            <p>El currículum optimizado se ha generado correctamente.</p>
            <button className="button default ats-download-button" onClick={handleDownload}>
              Descargar CV optimizado
            </button>
            <button className="button default ats-back-button" onClick={handleBack}>
              Volver
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="ats-error">
            <p className="ats-error-msg">{errorMsg}</p>
            <button className="button default" onClick={handleBack}>
              Volver
            </button>
          </div>
        )}

        <button
          className="button default ats-close-button"
          onClick={handleClose}
          disabled={status === "processing"}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}

export default AIConfigForm;
