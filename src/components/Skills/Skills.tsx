import { useState } from "react";
import "./Skills.css";

function Skills() {
  const [newSkill, setNewSkill] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([
    "Comunicativo",
    "Responsable",
    "Organizado",
  ]);

  const onRemoveSkill = (skillToRemove: string): void => {
    const newSkills = skills.filter((skill: string) => skill !== skillToRemove);
    setSkills(newSkills);
  };

  const onAddSkill = (): void => {
    const newSkills = [...skills];

    newSkills.push(newSkill);
    setSkills(newSkills);

    setNewSkill("");
  };

  const onEditNewSkill = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
                <path
                  d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
                  fill="currentColor"
                />
                <path
                  d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
                  fill="currentColor"
                />
              </svg>
            </li>
          ))}
          <li className="input">
            <input
              className="input-new-skill"
              onChange={onEditNewSkill}
              placeholder="Ejemplo: Trabajo en equipo"
              value={newSkill}
            />
          </li>
          <li onClick={onAddSkill} className="add">
            añadir
          </li>
        </ul>
      </div>
    </>
  );
}

export default Skills;
