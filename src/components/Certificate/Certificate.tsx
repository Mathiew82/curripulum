import { useState } from "react";
import CreateCertificate from "./CreateCertificate/CreateCertificate.tsx";
import "./Certificate.css";

type Certificate = {
  certificationCenter: string;
  theme: string;
  description: string;
};

function Certificate() {
  const [activate, setActivate] = useState<boolean>(true);
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      certificationCenter: "Centro de formación",
      theme: "Desarrollo de páginas web",
      description: "Aquí la descripción de la certificación obtenida.",
    },
  ]);

  const [showCreateCertificateModal, setShowCreateCertificateModal] =
    useState<boolean>(false);

  const onRemoveCertificate = (certificateToRemove: Certificate): void => {
    const newCertificates = certificates.filter(
      (certificate: Certificate) => certificate !== certificateToRemove,
    );
    setCertificates(newCertificates);
  };

  const addCertificate = (certificate: Certificate): void => {
    const newCertificates = [...certificates];
    newCertificates.push(certificate);
    setCertificates(newCertificates);
  };

  const onRemoveCertificateModule = (): void => {
    setActivate(false);
  };

  const addCertificatesModule = (): void => {
    setActivate(true);
  };

  return (
    <>
      {activate ? (
        <>
          <div id="certificates" className="editable">
            <h2>Certificados</h2>
            {certificates.map((certificate: Certificate) => (
              <div
                className="certificates"
                key={certificate.certificationCenter}
              >
                <h3>{certificate.certificationCenter}</h3>
                <div className="theme">{certificate.theme}</div>
                <div className="description">{certificate.description}</div>
                <svg
                  onClick={() => onRemoveCertificate(certificate)}
                  xmlns="http://www.w3.org/2000/svg"
                  className="remove-button"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
                    fill="currentColor"
                  />
                  <path
                    d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            ))}

            <button
              onClick={() => setShowCreateCertificateModal(true)}
              className="edit-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 18"
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
              añadir
            </button>
            <button
              onClick={onRemoveCertificateModule}
              className="remove-module-button"
              aria-label="Eliminar módulo"
            />
          </div>
          <CreateCertificate
            active={showCreateCertificateModal}
            closeModal={setShowCreateCertificateModal}
            addCertificate={addCertificate}
          />
        </>
      ) : (
        <div className="wrapper-add-certificates-module">
          <button
            onClick={addCertificatesModule}
            className="add-certificates-module"
          >
            Agregar certificados
          </button>
        </div>
      )}
    </>
  );
}

export default Certificate;
