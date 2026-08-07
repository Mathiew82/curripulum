"use client";

import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { createClient } from "../../src/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import Name from "../../src/components/Name/Name";
import AboutMe from "../../src/components/AboutMe/AboutMe";
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const [state, setState] = useState<ItemType[]>([
    { id: 0, name: "Name" },
    { id: 1, name: "AboutMe" },
    { id: 2, name: "Experience" },
    { id: 3, name: "Formation" },
    { id: 4, name: "Certificate" },
    { id: 5, name: "Skills" },
    { id: 6, name: "Languages" },
  ]);

  useEffect(() => {
    cvStore.setSectionOrder(state);
  }, [state]);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/auth/login");
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };
    checkUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  const componentMapping = [
    Name,
    AboutMe,
    Experience,
    Formation,
    Certificate,
    Skills,
    Languages,
  ];

  return (
    <div className="app-layout">
      <main className="main-content">
        {user && (
          <div className="user-info">
            <p>Bienvenido, {user.email}</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
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
