"use client";

import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import Name from "../../src/components/Name/Name";
import Skills from "../../src/components/Skills/Skills";
import Experience from "../../src/components/Experience/Experience";
import Formation from "../../src/components/Formation/Formation";
import Certificate from "../../src/components/Certificate/Certificate";
import Languages from "../../src/components/Languages/Languages";
import Sidebar from "../../src/components/Sidebar/Sidebar";
import { cvStore } from "../../src/store/cvStore";

interface ItemType {
  id: number;
  name: string;
}

export default function Dashboard() {
  const [state, setState] = useState<ItemType[]>([
    { id: 0, name: "Name" },
    { id: 1, name: "Experience" },
    { id: 2, name: "Formation" },
    { id: 3, name: "Certificate" },
    { id: 4, name: "Skills" },
    { id: 5, name: "Languages" },
  ]);

  useEffect(() => {
    cvStore.setSectionOrder(state);
  }, [state]);

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
