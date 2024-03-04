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
                className="editable-item"
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
                    width="20px"
                    height="20px"
                    viewBox="0 -2 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z"
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
                    width="24px"
                    height="24px"
                    viewBox="-3.5 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"
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
