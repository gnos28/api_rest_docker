import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./SkillUpdateModal.module.scss";
import skillStyles from "./Skill.module.scss";
import { getSkills } from "../services/wilderGet";

export default function SkillUpdateModal({ wilderSkills, setOpenModal }) {
  const [skills, setSkills] = useState([]);
  const [activeSkills, setActiveSkills] = useState(wilderSkills);

  const handleCancel = () => {
    setOpenModal(false);
  };
  const handleConfirm = () => {};

  const toggleSkill = (skill) => {
    if (activeSkills.map((skill) => skill.id).includes(skill.id))
      setActiveSkills(activeSkills.filter((s) => s.id !== skill.id));
    else setActiveSkills([...activeSkills, skill]);
  };

  const getLiClass = (skill) => {
    const classList = [skillStyles.skill];

    console.log("activeSkillszeze", activeSkills);

    if (
      activeSkills &&
      activeSkills.map((skill) => skill.id).includes(skill.id)
    )
      classList.push(styles.activeSkill);

    return classList.join(" ");
  };

  const fetchSkills = async () => {
    setSkills(await getSkills());
  };

  useEffect(() => {
    fetchSkills();
    console.log("activeSkills", activeSkills);
  }, []);

  return (
    <div className={styles.updateSkillsContainer}>
      <h4>Wild skills</h4>
      <p>select wilder's skills</p>
      <ul>
        {skills &&
          skills.length &&
          skills.map((skill) => (
            <li
              className={getLiClass(skill)}
              key={skill.id}
              onClick={() => toggleSkill(skill)}
            >
              {skill.name}
            </li>
          ))}
      </ul>
      <div className={styles.actions}>
        <Image
          src="/cancel.svg"
          height={35}
          width={35}
          alt="cancel action"
          onClick={handleCancel}
        />
        <Image
          src="/confirm.svg"
          height={40}
          width={40}
          alt="confirm action"
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
}
