import React, {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  BaseSyntheticEvent,
  KeyboardEvent,
} from "react";
import Image from "next/image";
import Skill from "./Skill";
import SkillUpdateModal from "./SkillUpdateModal";
import styles from "./Wilder.module.scss";
import { updateName, updateDescription } from "../services/wilderUpdate";
import { convertLineBreakToBr } from "../services/convert";
import { deleteWilder } from "../services/wilderDelete";
import IWilder from "../interfaces/IWilder";
import { ISkill } from "../interfaces/ISkill";

type WilderProps = {
  wilder: IWilder;
  wilderIndex: number;
  staticSkills: ISkill[];
  wilders: IWilder[];
  setWilders: Dispatch<SetStateAction<IWilder[]>>;
};

type Setter = Dispatch<SetStateAction<any>>;

export default function Wilder({
  wilder,
  wilderIndex,
  staticSkills,
  wilders,
  setWilders,
}: WilderProps) {
  const [nameAsInput, setNameAsInput] = useState<boolean>(false);
  const [name, setName] = useState<string>(wilder.name);
  const [descriptionAsInput, setDescriptionAsInput] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(wilder.description);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [skills, setSkills] = useState<IWilder["skills"][0][]>(wilder.skills);
  const [showBin, setShowBin] = useState<boolean>(false);
  const [containerClass, setContainerClass] = useState<string>(
    styles.wilderIntro
  );

  const mouseOverBin = useRef<boolean>(false);

  const activateInput = (setter: Setter): void => {
    setter(true);
  };

  const handleChange = (e: BaseSyntheticEvent, setter: Setter): void => {
    setter(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" || e.key === "Escape") handleNameUpdate();
  };

  const handleNameUpdate = async (): Promise<void> => {
    await updateName(wilder.id, name);
    setNameAsInput(false);
  };

  const handleDescriptionUpdate = async (): Promise<void> => {
    await updateDescription(wilder.id, description);
    setDescriptionAsInput(false);
  };

  const handleSkillClick = (): void => {
    setShowBin(false);
    activateInput(setOpenModal);
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
            {nameAsInput ? (
              <input
                className={styles.nameInput}
                type="text"
                autoFocus
                onBlur={handleNameUpdate}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(e)
                }
                onChange={(e) => handleChange(e, setName)}
                value={name}
              />
            ) : (
              <h3
                className={styles.overInteraction}
                onClick={() => activateInput(setNameAsInput)}
              >
                {name}
              </h3>
            )}
            {descriptionAsInput ? (
              <textarea
                className={styles.descriptionInput}
                autoFocus
                rows={Math.max(description?.split("\n").length || 2, 2)}
                onBlur={handleDescriptionUpdate}
                // onKeyDown={(e) => handleKeyDown(e, handleDescriptionUpdate)}
                onChange={(e) => handleChange(e, setDescription)}
                value={description || ""}
              />
            ) : (
              <p
                className={styles.pOverInteraction}
                onClick={() => activateInput(setDescriptionAsInput)}
              >
                {description && description.length
                  ? convertLineBreakToBr(description)
                  : "pas de description"}
              </p>
            )}

            {/* {skills.length > 0 && ( */}
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
