import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Name from "./components/Name/Name";
import Skills from "./components/Skills/Skills";
import ShowPreview from "./components/ShowPreview/ShowPreview";
import Experience from "./components/Experience/Experience";
import Formation from "./components/Formation/Formation";
import Certificate from "./components/Certificate/Certificate";
import Languages from "./components/Languages/Languages";
import Settings from "./components/Settings/Settings";

interface ItemType {
  id: number;
  name: string;
}

function App() {
  const [state, setState] = useState<ItemType[]>([
    { id: 0, name: "Name" },
    { id: 1, name: "Skills" },
    { id: 2, name: "Experience" },
    { id: 3, name: "Formation" },
    { id: 4, name: "Certificate" },
    { id: 5, name: "Languages" },
  ]);

  const componentMapping = [
    Name,
    Skills,
    Experience,
    Formation,
    Certificate,
    Languages,
  ];

  return (
    <>
      <Settings />
      <ShowPreview />
      <ReactSortable
        list={state}
        setList={setState}
        animation={200}
        ghostClass="blue-background-class"
      >
        {state.map((item) => {
          const Component = componentMapping[item.id];
          return <Component key={item.id} />;
        })}
      </ReactSortable>
    </>
  );
}

export default App;
