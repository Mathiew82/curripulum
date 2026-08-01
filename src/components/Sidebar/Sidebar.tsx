import { useState } from "react";
import Settings from "../Settings/Settings";
import ShowPreview from "../ShowPreview/ShowPreview";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        title={isOpen ? "Cerrar panel" : "Abrir panel"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points={isOpen ? "9 18 15 12 9 6" : "15 18 9 12 15 6"} />
        </svg>
      </button>
      <div className="sidebar-content">
        <Settings />
        <ShowPreview />
      </div>
    </aside>
  );
}

export default Sidebar;
