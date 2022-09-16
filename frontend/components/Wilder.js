import React, { useState, useRef } from "react";
import Image from "next/image";
import Skill from "./Skill";
import SkillUpdateModal from "./SkillUpdateModal";
import styles from "./Wilder.module.scss";
import { updateName, updateDescription } from "../services/wilderUpdate";
import { convertLineBreakToBr } from "../services/convert";
import { deleteWilder } from "../services/wilderDelete";

export default function Wilder({ wilder, staticSkills, wilders, setWilders }) {
  const [nameAsInput, setNameAsInput] = useState(false);
  const [name, setName] = useState(wilder.name);
  const [descriptionAsInput, setDescriptionAsInput] = useState(false);
  const [description, setDescription] = useState(wilder.description);
  const [openModal, setOpenModal] = useState(false);
  const [skills, setSkills] = useState(wilder.skills);
  const [showBin, setShowBin] = useState(false);

  const mouseOverBin = useRef(false);
  // const binTimer = useRef(0);

  const activateInput = (setter) => {
    setter(true);
  };

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleNameUpdate();
  };

  const handleNameUpdate = async () => {
    await updateName(wilder.id, name);
    setNameAsInput(false);
  };

  const handleDescriptionUpdate = async () => {
    await updateDescription(wilder.id, description);
    setDescriptionAsInput(false);
  };

  const handleSkillClick = () => {
    setShowBin(false);
    activateInput(setOpenModal);
  };

  const handleMouseEnter = () => {
    if (!openModal) setShowBin(true);
    // binTimer.current = 0;
  };

  const handleMouseLeave = () => {
    if (!mouseOverBin.current) setShowBin(false);
  };

  const handleMouseEnterBin = () => {
    mouseOverBin.current = true;
  };
  const handleMouseLeaveBin = () => {
    mouseOverBin.current = false;

    // if (binTimer.current === 0) binTimer.current = new Date().getTime();

    // const currentTime = new Date().getTime();

    // if (currentTime - binTimer.current > 100)
    setShowBin(false);
  };

  // const handleMouseMove = () => {
  //   binTimer.current = 0;
  // };

  const handleBinClick = async () => {
    await deleteWilder(wilder.id);
    setWilders(wilders.filter((w) => w.id !== wilder.id));
  };

  return (
    <div style={{ position: "relative" }}>
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
          />
        </div>
      )}
      <div
        className={styles.wilderContainer}
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
            />
            {nameAsInput ? (
              <input
                className={styles.nameInput}
                type="text"
                autoFocus
                onBlur={handleNameUpdate}
                onKeyDown={(e) => handleKeyDown(e, handleNameUpdate)}
                onChange={(e) => handleChange(e, setName)}
                value={name}
              />
            ) : (
              <h3 onClick={() => activateInput(setNameAsInput)}>{name}</h3>
            )}
            {descriptionAsInput ? (
              <textarea
                className={styles.descriptionInput}
                type="text"
                autoFocus
                rows={Math.max(description?.split("\n").length || 2, 2)}
                onBlur={handleDescriptionUpdate}
                // onKeyDown={(e) => handleKeyDown(e, handleDescriptionUpdate)}
                onChange={(e) => handleChange(e, setDescription)}
                value={description || ""}
              />
            ) : (
              <p onClick={() => activateInput(setDescriptionAsInput)}>
                {description && description.length
                  ? convertLineBreakToBr(description)
                  : "pas de description"}
              </p>
            )}

            {/* {skills.length > 0 && ( */}
            <div>
              <h4 onClick={handleSkillClick}>Wild skills</h4>
              <div className={styles.skillsContainer}>
                {skills.map((skill) => (
                  <Skill key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
