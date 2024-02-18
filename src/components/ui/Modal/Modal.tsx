import "./Modal.css";

interface Props {
  children: React.ReactNode;
  active: boolean;
  title: string;
}

function Modal(props: Props) {
  return (
    <>
      <div className="modal">
        <h2>{props.title}</h2>
        {props.children}
      </div>
    </>
  );
}

export default Modal;
