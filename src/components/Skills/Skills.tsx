import { useState } from "react";
import "./Skills.css";

function Skills() {
  const [skills, setSkills] = useState([
    "teamwork",
    "communicative",
    "responsible",
  ]);

  const handleChangeSkills = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    const newSkills = skills;
    newSkills.push(value);
    setSkills(newSkills);
  };

  return (
    <>
      <div className="editable">
        <h2>Skills</h2>
        <ul className="skills">
          {skills.map((skill) => (
            <li key={skill}>
              {skill}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </li>
          ))}
          <li className="add">add</li>
        </ul>
      </div>
    </>
  );
}

export default Skills;
