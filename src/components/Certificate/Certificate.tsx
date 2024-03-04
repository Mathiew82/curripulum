import { useState } from "react";
import CreateCertificate from "./CreateCertificate/CreateCertificate.tsx";
import "./Certificate.css";

export type CertificateType = {
  id: string;
  certificationCenter: string;
  theme: string;
  description: string;
};

function Certificate() {
  const [activate, setActivate] = useState<boolean>(true);
  const [currentCertificate, setCurrentCertificate] =
    useState<CertificateType | null>(null);
  const [certificates, setCertificates] = useState<CertificateType[]>([
    {
      id: "v10aE1ftEmDkCOGMmHSAVD1VesYXnD1T",
      certificationCenter: "Academia Informática Indie",
      theme: "Gestión de bases de datos SQL",
      description: "Aquí la descripción de la certificación obtenida.",
    },
  ]);

  const [showCreateCertificateModal, setShowCreateCertificateModal] =
    useState<boolean>(false);

  const onCreateCertificate = (): void => {
    setCurrentCertificate(null);
    setShowCreateCertificateModal(true);
  };

  const onRemoveCertificate = (certificateIdToRemove: string): void => {
    const newCertificates = certificates.filter(
      (certificate: CertificateType) =>
        certificate.id !== certificateIdToRemove,
    );
    setCertificates(newCertificates);
  };

  const onEditCertificate = (certificate: CertificateType): void => {
    setCurrentCertificate(certificate);
    setShowCreateCertificateModal(true);
  };

  const addCertificate = (certificate: CertificateType): void => {
    const newCertificates = [...certificates];
    newCertificates.push(certificate);
    setCertificates(newCertificates);
  };

  const onUpdateCertificate = (certificateToUpdate: CertificateType): void => {
    certificates.forEach((certificate: CertificateType) => {
      if (certificate.id === certificateToUpdate.id) {
        certificate = certificateToUpdate;
      }
    });

    setCertificates(certificates);
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
            {certificates.map((certificate: CertificateType) => (
              <div
                className="certificates"
                key={certificate.certificationCenter}
              >
                <h3>{certificate.certificationCenter}</h3>
                <div className="theme">{certificate.theme}</div>
                <div className="description">{certificate.description}</div>
                <button
                  onClick={() => onEditCertificate(certificate)}
                  className="edit-item-button"
                  title="Editar este item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M17.828 2a3 3 0 0 1 1.977 .743l.145 .136l1.171 1.17a3 3 0 0 1 .136 4.1l-.136 .144l-1.706 1.707l2.292 2.293a1 1 0 0 1 .083 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.497 -1.32l.083 -.094l3.292 -3.293l-1.586 -1.585l-7.464 7.464a3.828 3.828 0 0 1 -2.474 1.114l-.233 .008c-.674 0 -1.33 -.178 -1.905 -.508l-1.216 1.214a1 1 0 0 1 -1.497 -1.32l.083 -.094l1.214 -1.216a3.828 3.828 0 0 1 .454 -4.442l.16 -.17l10.586 -10.586a3 3 0 0 1 1.923 -.873l.198 -.006zm0 2a1 1 0 0 0 -.608 .206l-.099 .087l-1.707 1.707l2.586 2.585l1.707 -1.706a1 1 0 0 0 .284 -.576l.01 -.131a1 1 0 0 0 -.207 -.609l-.087 -.099l-1.171 -1.171a1 1 0 0 0 -.708 -.293z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => onRemoveCertificate(certificate.id)}
                  className="remove-item-button"
                  title="Eliminar este item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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
                </button>
              </div>
            ))}

            <button
              onClick={() => onCreateCertificate()}
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
              title="Eliminar módulo"
            />
          </div>
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
      {showCreateCertificateModal && (
        <CreateCertificate
          active={showCreateCertificateModal}
          closeModal={setShowCreateCertificateModal}
          addCertificate={addCertificate}
          updateCertificate={onUpdateCertificate}
          certificate={currentCertificate as CertificateType}
        />
      )}
    </>
  );
}

export default Certificate;
