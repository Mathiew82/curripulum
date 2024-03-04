import { useState } from "react";
import Modal from "../../ui/Modal/Modal.tsx";
import { CertificateType } from "../Certificate.tsx";
import { generateId } from "../../../utils/generateId.ts";
import "./CreateCertificate.css";

interface Props {
  active: boolean;
  closeModal: Function;
  addCertificate: Function;
  updateCertificate: Function;
  certificate: CertificateType;
}

function CreateCertificate({
  active,
  closeModal,
  addCertificate,
  updateCertificate,
  certificate,
}: Props) {
  const [certificationCenter, setCertificationCenter] = useState<string>(
    certificate?.certificationCenter || "",
  );
  const [theme, setTheme] = useState<string>(certificate?.theme || "");
  const [description, setDescription] = useState<string>(
    certificate?.description || "",
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const formJson = Object.fromEntries(formData.entries());
    const newObject: Record<string, string> = {};

    for (const key in formJson) {
      newObject[key] = (formJson[key] as string).trim();
    }

    if (certificate) {
      certificate.certificationCenter = certificationCenter;
      certificate.theme = theme;
      certificate.description = description;

      updateCertificate(certificate);
    } else {
      addCertificate(newObject as unknown as CertificateType);
    }

    closeModal(false);
  };

  const onCancel = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    closeModal(false);
  };

  return (
    <>
      <Modal active={active} title="Agregar nueva formación">
        <div className="create-certificate">
          <form onSubmit={onSubmit}>
            <input
              type="hidden"
              name="id"
              value={certificate ? certificate.id : generateId()}
            />
            <div className="field">
              <label>Certificación obtenida por</label>
              <input
                onChange={(event) => setCertificationCenter(event.target.value)}
                name="certificationCenter"
                value={certificationCenter}
              />
            </div>
            <div className="field">
              <label>Certificación</label>
              <input
                onChange={(event) => setTheme(event.target.value)}
                name="theme"
                value={theme}
              />
            </div>
            <div className="field">
              <label>Descripción</label>
              <textarea
                onChange={(event) => setDescription(event.target.value)}
                name="description"
                value={description}
              />
            </div>
            <div className="wrapper-buttons">
              <button onClick={onCancel} className="cancel">
                Cancelar
              </button>
              <button className="save" type="submit">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default CreateCertificate;
