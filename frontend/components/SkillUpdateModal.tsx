import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import styles from "./SkillUpdateModal.module.scss";
import skillStyles from "./Skill.module.scss";
import { getSkills } from "../services/wilderGet";
import { updateSkills } from "../services/wilderUpdate";
import IWilder from "../interfaces/IWilder";
import { ISkill, IRatedSkill } from "../interfaces/ISkill";

type SkillUpdateModalProps = {
  wilderSkills: IRatedSkill[];
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  wilderId: number;
  skillSetter: Dispatch<SetStateAction<IRatedSkill[]>>;
  staticSkills: ISkill[];
};

export default function SkillUpdateModal({
  wilderSkills,
  setOpenModal,
  wilderId,
  skillSetter,
  staticSkills,
}: SkillUpdateModalProps) {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [activeSkills, setActiveSkills] =
    useState<IWilder["skills"][0][]>(wilderSkills);

  const handleCancel = (): void => {
    setOpenModal(false);
  };
  const handleConfirm = async (): Promise<void> => {
    await updateSkills(wilderId, activeSkills);
    skillSetter(activeSkills);
    setOpenModal(false);
  };

  const toggleSkill = (skill: ISkill): void => {
    if (activeSkills.map((sk) => sk.id).includes(skill.id))
      setActiveSkills(activeSkills.filter((sk) => sk.id !== skill.id));
    else if (activeSkills.length < 5)
      setActiveSkills([...activeSkills, { ...skill, rating: 0 }]);
  };

  const getLiClass = (skill: ISkill): string => {
    const classList: string[] = [skillStyles.skill];

    if (
      activeSkills &&
      activeSkills.map((skill) => skill.id).includes(skill.id)
    )
      classList.push(styles.activeSkill);

    return classList.join(" ");
  };

  // à mettre en getStaticProps revalidate: 86400
  const fetchSkills = async (): Promise<void> => {
    setSkills(await getSkills());
  };

  useEffect(() => {
    setSkills(staticSkills);
  }, [staticSkills]);

  return (
    <div className={styles.updateSkillsContainer}>
      <h4>Wild skills</h4>
      <p>select a maximum of 5 wilder's skills</p>
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
