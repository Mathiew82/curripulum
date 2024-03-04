import React, { useState } from "react";
import "./Skills.css";

function Skills() {
  const [activate, setActivate] = useState<boolean>(true);
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
    if (newSkill === "") return;

    const newSkills = [...skills];
    newSkills.push(newSkill);

    setSkills(newSkills);
    setNewSkill("");
  };

  const onAddSkillWithEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key !== "Enter" || newSkill === "") return;
    onAddSkill();
  };

  const onEditNewSkill = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = (event.target as HTMLInputElement).value;
    setNewSkill(value);
  };

  const onRemoveSkillsModule = (): void => {
    setActivate(false);
  };

  const addSkillsModule = (): void => {
    setActivate(true);
  };

  return (
    <>
      {activate ? (
        <>
          <div className="editable">
            <h2>Habilidades</h2>
            <ul className="skills">
              {skills.map((skill) => (
                <li key={skill}>
                  {skill}
                  <svg
                    onClick={() => onRemoveSkill(skill)}
                    width="24px"
                    height="24px"
                    className="remove-tag-button"
                    viewBox="-3.5 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"
                      fill="currentColor"
                    />
                  </svg>
                </li>
              ))}
              <li className="input">
                <input
                  className="input-new-skill"
                  onChange={onEditNewSkill}
                  onKeyUp={onAddSkillWithEnter}
                  placeholder="Ejemplo: Trabajo en equipo"
                  value={newSkill}
                />
              </li>
              <li onClick={onAddSkill} className="add">
                añadir
              </li>
            </ul>
            <button
              onClick={onRemoveSkillsModule}
              className="remove-module-button"
              aria-label="Eliminar módulo"
            />
          </div>
        </>
      ) : (
        <div className="wrapper-add-certificates-module">
          <button onClick={addSkillsModule} className="add-certificates-module">
            Agregar habilidades
          </button>
        </div>
      )}
    </>
  );
}

export default Skills;
