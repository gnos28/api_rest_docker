import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./SkillUpdateModal.module.scss";
import skillStyles from "./Skill.module.scss";
import { getSkills } from "../services/wilderGet";
import { updateSkills } from "../services/wilderUpdate";

export default function SkillUpdateModal({
  wilderSkills,
  setOpenModal,
  wilderId,
  skillSetter,
  staticSkills,
}) {
  const [skills, setSkills] = useState([]);
  const [activeSkills, setActiveSkills] = useState(wilderSkills);

  const handleCancel = () => {
    setOpenModal(false);
  };
  const handleConfirm = async () => {
    await updateSkills(wilderId, activeSkills);
    skillSetter(activeSkills);
    setOpenModal(false);
  };

  const toggleSkill = (skill) => {
    if (activeSkills.map((skill) => skill.id).includes(skill.id))
      setActiveSkills(activeSkills.filter((s) => s.id !== skill.id));
    else setActiveSkills([...activeSkills, { ...skill, rating: 0 }]);
  };

  const getLiClass = (skill) => {
    const classList = [skillStyles.skill];

    if (
      activeSkills &&
      activeSkills.map((skill) => skill.id).includes(skill.id)
    )
      classList.push(styles.activeSkill);

    return classList.join(" ");
  };

  // à mettre en getStaticProps revalidate: 86400
  const fetchSkills = async () => {
    setSkills(await getSkills());
  };

  useEffect(() => {
    setSkills(staticSkills);
  }, [staticSkills]);

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
          draggable={false}
        />
        <Image
          src="/confirm.svg"
          height={40}
          width={40}
          alt="confirm action"
          onClick={handleConfirm}
          draggable={false}
        />
      </div>
    </div>
  );
}
