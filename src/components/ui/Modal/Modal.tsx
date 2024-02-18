import "./Modal.css";

interface Props {
  children: React.ReactNode;
  active: boolean;
  title: string;
}

function Modal(props: Props) {
  return (
    <>
      <div className="wrapper-modal">
        <div className="modal">
          <h2>{props.title}</h2>
          {props.children}
        </div>
      </div>
    </>
  );
}

export default Modal;
