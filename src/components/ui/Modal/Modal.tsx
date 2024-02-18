import "./Modal.css";

interface Props {
  children: React.ReactNode;
  active: boolean;
  title: string;
}

function Modal({ children, active, title }: Props) {
  return (
    <>
      {active && (
        <div className="wrapper-modal">
          <div className="modal">
            <h2>{title}</h2>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
