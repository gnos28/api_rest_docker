import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Skill from "./Skill";
import SkillUpdateModal from "./SkillUpdateModal";
import InteractiveText from "./InteractiveText";
import styles from "./Wilder.module.scss";
import { deleteWilder } from "../services/wilderDelete";
import IWilder from "../interfaces/IWilder";
import { ISkill, IRatedSkill } from "../interfaces/ISkill";

type WilderProps = {
  wilder: IWilder;
  wilderIndex: number;
  staticSkills: ISkill[];
  wilders: IWilder[];
  setWilders: Dispatch<SetStateAction<IWilder[]>>;
};

export default function Wilder({
  wilder,
  wilderIndex,
  staticSkills,
  wilders,
  setWilders,
}: WilderProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [skills, setSkills] = useState<IRatedSkill[]>(wilder.skills);
  const [showBin, setShowBin] = useState<boolean>(false);
  const [containerClass, setContainerClass] = useState<string>(
    styles.wilderIntro
  );

  const mouseOverBin = useRef<boolean>(false);

  const handleSkillClick = (): void => {
    setShowBin(false);
    setOpenModal(true);
    // setContainerClass([styles.wilderIntro, styles.wilderFlip].join(" "));
    // setTimeout(() => activateInput(setOpenModal), 150);
    // setTimeout(() => setContainerClass(styles.wilderIntro), 300);
  };

  const handleMouseEnter = (): void => {
    if (!openModal) setShowBin(true);
  };

  const handleMouseLeave = (): void => {
    if (!mouseOverBin.current) setShowBin(false);
  };

  const handleMouseEnterBin = (): void => {
    mouseOverBin.current = true;
  };
  const handleMouseLeaveBin = (): void => {
    mouseOverBin.current = false;
    setShowBin(false);
  };

  const handleBinClick = async (): Promise<void> => {
    await deleteWilder(wilder.id);
    setWilders(wilders.filter((w: IWilder) => w.id !== wilder.id));
  };

  return (
    <div
      style={{ position: "relative", animationDelay: `${wilderIndex / 15}s` }}
      className={containerClass}
    >
      {showBin && (
        <div
          className={styles.bin}
          onClick={handleBinClick}
          onMouseEnter={handleMouseEnterBin}
          onMouseLeave={handleMouseLeaveBin}
        >
          <Image
            src="/bin.svg"
            height={40}
            width={40}
            alt="delete this wilder"
            draggable={false}
          />
        </div>
      )}
      <div
        className={[styles.wilderContainer, styles.wilderHoverAnimation].join(
          " "
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // onMouseMove={handleMouseMove}
      >
        {openModal ? (
          <SkillUpdateModal
            wilderId={wilder.id}
            wilderSkills={skills}
            skillSetter={setSkills}
            setOpenModal={setOpenModal}
            staticSkills={staticSkills}
          />
        ) : (
          <>
            <Image
              src="/profile_picture.png"
              height={221}
              width={200}
              alt="profile picture"
              draggable={false}
            />
            <InteractiveText wilder={wilder} type="h3" />
            <InteractiveText wilder={wilder} type="p" />
            <div>
              <h4 className={styles.overInteraction} onClick={handleSkillClick}>
                Wild skills
              </h4>
              <div className={styles.skillsContainer}>
                {skills.map((skill) => (
                  <Skill key={skill.id} skill={skill} wilderId={wilder.id} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
