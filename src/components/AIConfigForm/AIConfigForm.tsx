"use client";

import { useRef, useState } from "react";
import {
  AIConfigForm as LibAIConfigForm,
  type AIConfig,
} from "@tombcato/ai-selector-react";
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

interface AtsResponse {
  aboutMe?: string;
  experience?: string[];
  skills?: string[];
  recommendations?: string;
}

function cleanJson(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }
  return cleaned.trim();
}

const staticModelFetcher = async (params: FetcherParams) => {
  if (params.type === "fetchModels") {
    return getStaticModels(params.providerId);
  }
  return { success: true, latency: 0, message: "OK" };
};

function AIConfigForm({
  active,
  closeModal,
}: {
  active: boolean;
  closeModal: () => void;
}) {
  const [status, setStatus] = useState<Status>("form");
  const [jobDescription, setJobDescription] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const configRef = useRef<AIConfig | null>(null);

  const handleChange = (cfg: Partial<AIConfig>) => {
    configRef.current = {
      ...(configRef.current as AIConfig),
      ...cfg,
    } as AIConfig;
  };

  const handleSave = (cfg: AIConfig) => {
    configRef.current = cfg;
  };

  const handleProcess = async () => {
    const cfg = configRef.current;
    if (!cfg || !cfg.providerId || !cfg.apiKey || !cfg.model) {
      setErrorMsg(
        "Completa la configuración del modelo de IA antes de continuar.",
      );
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
      const experienceCount = cvData.experiences.length;
      const prompt = buildATSOptimizationPrompt(
        cvText,
        jobDescription.trim(),
        experienceCount,
      );

      const provider = getProvider(cfg.providerId);
      const apiFormat = provider?.apiFormat ?? "openai";
      const baseUrl = cfg.baseUrl || provider?.baseUrl || "";

      const res = await sendDirectChat({
        apiFormat,
        baseUrl,
        apiKey: cfg.apiKey,
        model: cfg.model,
        messages: [{ role: "user", content: prompt }],
      });

      if (res.success && res.content) {
        const parsed: AtsResponse = JSON.parse(cleanJson(res.content));

        if (parsed.aboutMe || parsed.experience || parsed.skills) {
          cvStore.batch(() => {
            if (parsed.aboutMe) {
              const currentAboutMe = cvStore.getData().aboutMe;
              const aboutMeId = currentAboutMe?.id || crypto.randomUUID();
              cvStore.setAboutMe({ id: aboutMeId, text: parsed.aboutMe });
              cvStore.setAboutMeActive(true);
            }

            if (parsed.experience && parsed.experience.length > 0) {
              const updatedExperiences = cvStore
                .getData()
                .experiences.map((exp, i) => ({
                  ...exp,
                  description: parsed.experience![i] || exp.description,
                }));
              cvStore.setExperiences(updatedExperiences);
            }

            if (parsed.skills && parsed.skills.length > 0) {
              cvStore.setSkills(parsed.skills);
            }
          });

          setSuccessMsg("CV actualizado correctamente");
        } else {
          setSuccessMsg(
            "La IA no devolvió contenido para actualizar. Inténtalo de nuevo.",
          );
        }

        setRecommendations(parsed.recommendations || "");
        setStatus("done");
      } else {
        setErrorMsg(res.message || "Error al procesar la optimización.");
        setStatus("error");
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        setErrorMsg(
          "La respuesta de la IA no tiene un formato JSON válido. Inténtalo de nuevo.",
        );
      } else {
        setErrorMsg(e instanceof Error ? e.message : "Error inesperado.");
      }
      setStatus("error");
    }
  };

  const handleClose = () => {
    setStatus("form");
    setRecommendations("");
    setSuccessMsg("");
    setErrorMsg("");
    closeModal();
  };

  const handleBack = () => {
    setStatus("form");
    setSuccessMsg("");
    setErrorMsg("");
  };

  return (
    <Modal
      title="Optimizar para ATS"
      active={active}
      headerRight={
        status === "form" ? (
          <button className="ats-process-button" onClick={handleProcess}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 6a9.3 9.3 0 0 0 1.516 -.546c.911 -.438 1.494 -1.015 1.937 -1.932c.207 -.428 .382 -.928 .547 -1.522c.165 .595 .34 1.095 .547 1.521c.443 .918 1.026 1.495 1.937 1.933c.426 .205 .925 .38 1.516 .546a9.3 9.3 0 0 0 -1.516 .547c-.911 .438 -1.494 1.015 -1.937 1.932a9 9 0 0 0 -.547 1.521c-.165 -.594 -.34 -1.095 -.547 -1.521c-.443 -.918 -1.026 -1.494 -1.937 -1.932a9 9 0 0 0 -1.516 -.547" />
              <path d="M3 14a21 21 0 0 0 1.652 -.532c2.542 -.953 3.853 -2.238 4.816 -4.806a20 20 0 0 0 .532 -1.662a20 20 0 0 0 .532 1.662c.963 2.567 2.275 3.853 4.816 4.806q .75 .28 1.652 .532a21 21 0 0 0 -1.652 .532c-2.542 .953 -3.854 2.238 -4.816 4.806a20 20 0 0 0 -.532 1.662a20 20 0 0 0 -.532 -1.662c-.963 -2.568 -2.275 -3.853 -4.816 -4.806a21 21 0 0 0 -1.652 -.532" />
            </svg>
            Procesar optimización
          </button>
        ) : null
      }
    >
      <button
        className="close-modal-button"
        onClick={handleClose}
        disabled={status === "processing"}
      />
      <div className="ats-config-content">
        {status === "form" && (
          <>
            <div className="ats-job-label">Selecciona tu modelo de IA:</div>
            <LibAIConfigForm
              language="en"
              showPreview={false}
              saveButtonText="Guardar configuración"
              modelFetcher={staticModelFetcher}
              onChange={handleChange}
              onSave={handleSave}
            />
            <label className="ats-job-label" htmlFor="ats-job-description">
              Agrega la oferta de trabajo a la que quieres postularte:
            </label>
            <textarea
              id="ats-job-description"
              className="ats-job-textarea"
              placeholder="Pega aquí la oferta de trabajo a la que quieres postular..."
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
          </>
        )}

        {status === "processing" && (
          <Loading text="Optimizando currículum..." />
        )}

        {status === "done" && (
          <div className="ats-result">
            <p className="ats-success-msg">{successMsg}</p>
            {recommendations && (
              <>
                <h3 className="ats-recommendations-title">
                  Recomendaciones para mejorar tu CV
                </h3>
                <textarea
                  className="ats-recommendations-textarea"
                  value={recommendations}
                  readOnly
                  rows={8}
                />
              </>
            )}
            <button
              className="button default ats-back-button"
              onClick={handleBack}
            >
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
      </div>
    </Modal>
  );
}

export default AIConfigForm;
