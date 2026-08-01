import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Name from "./components/Name/Name";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Formation from "./components/Formation/Formation";
import Certificate from "./components/Certificate/Certificate";
import Languages from "./components/Languages/Languages";
import Sidebar from "./components/Sidebar/Sidebar";

interface ItemType {
  id: number;
  name: string;
}

function App() {
  const [state, setState] = useState<ItemType[]>([
    { id: 0, name: "Name" },
    { id: 1, name: "Experience" },
    { id: 2, name: "Formation" },
    { id: 3, name: "Certificate" },
    { id: 4, name: "Skills" },
    { id: 5, name: "Languages" },
  ]);

  const componentMapping = [
    Name,
    Experience,
    Formation,
    Certificate,
    Skills,
    Languages,
  ];

  return (
    <div className="app-layout">
      <main className="main-content">
        <ReactSortable
          list={state}
          setList={setState}
          animation={200}
          ghostClass="blue-background-class"
        >
          {state.map((item: ItemType) => {
            const Component = componentMapping[item.id];
            return <Component key={item.id} />;
          })}
        </ReactSortable>
      </main>
      <Sidebar />
    </div>
  );
}

export default App;
