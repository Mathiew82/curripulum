import { useState } from "react";
import "./Skills.css";

function Skills() {
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([
    "Trabajo en equipo",
    "Comunicativo",
    "Responsable",
    "Organizado",
  ]);

  const onRemoveSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((skill: string) => skill !== skillToRemove);
    setSkills(newSkills);
  };

  const onAddSkill = () => {
    const newSkills = [...skills];

    newSkills.push(newSkill);
    setSkills(newSkills);

    setNewSkill("");
  };

  const onEditNewSkill = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setNewSkill(value);
  };

  return (
    <>
      <div className="editable">
        <h2>Habilidades</h2>
        <ul className="skills">
          {skills.map((skill) => (
            <li key={skill}>
              {skill}
              <svg
                onClick={() => onRemoveSkill(skill)}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </li>
          ))}
          <li className="input">
            <input
              className="input-new-skill"
              onChange={onEditNewSkill}
              value={newSkill}
            />
          </li>
          <li onClick={onAddSkill} className="add">
            agregar habilidad
          </li>
        </ul>
      </div>
    </>
  );
}

export default Skills;
