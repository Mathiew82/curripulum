import { useState } from "react";
import "./Skills.css";

function Skills() {
  const [skills, setSkills] = useState([
    "teamwork",
    "communicative",
    "responsible",
  ]);
  const [editingSkills, setEditingSkills] = useState(false);

  const handleToggleEditSkills = () => {
    setEditingSkills(!editingSkills);
  };

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
        {!editingSkills ? (
          <>
            <ul className="skills">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            <span onClick={handleToggleEditSkills} className="edit-button">
              edit
            </span>
          </>
        ) : (
          <>
            <div>aslkjdlkj</div>
            <span onClick={handleToggleEditSkills} className="edit-button">
              save
            </span>
          </>
        )}
      </div>
    </>
  );
}

export default Skills;
