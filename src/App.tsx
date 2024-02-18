import Name from "./components/Name/Name";
import Skills from "./components/Skills/Skills";
import ShowPreview from "./components/ShowPreview/ShowPreview";
import Experience from "./components/Experience/Experience";
import Formation from "./components/Formation/Formation";
import Certificates from "./components/Certificates/Certificates";
import Languages from "./components/Languages/Languages";

function App() {
  return (
    <>
      <ShowPreview />
      <Name />
      <Skills />
      <Experience />
      <Formation />
      <Certificates />
      <Languages />
    </>
  );
}
export default App;
