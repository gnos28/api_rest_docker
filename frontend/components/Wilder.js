import React, { useState } from "react";
import Image from "next/image";
import Skill from "./Skill";
import SkillUpdateModal from "./SkillUpdateModal";
import styles from "./Wilder.module.scss";
import { updateName, updateDescription } from "../services/wilderUpdate";

export default function Wilder({ wilder }) {
  const [nameAsInput, setNameAsInput] = useState(false);
  const [name, setName] = useState(wilder.name);
  const [descriptionAsInput, setDescriptionAsInput] = useState(false);
  const [description, setDescription] = useState(wilder.description);
  const [openModal, setOpenModal] = useState(false);

  const activateInput = (setter) => {
    console.log("activateInput", setter);
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

  return (
    <div className={styles.wilderContainer}>
      {openModal ? (
        <SkillUpdateModal wilderSkills={wilder.skills} setOpenModal={setOpenModal}/>
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
              onBlur={handleDescriptionUpdate}
              // onKeyDown={(e) => handleKeyDown(e, handleDescriptionUpdate)}
              onChange={(e) => handleChange(e, setDescription)}
              value={description || ""}
            />
          ) : (
            <p onClick={() => activateInput(setDescriptionAsInput)}>
              {description && description.length
                ? description
                : "pas de description"}
            </p>
          )}

          {/* {wilder.skills.length > 0 && ( */}
          <div>
            <h4 onClick={() => activateInput(setOpenModal)}>Wild skills</h4>
            <div className={styles.skillsContainer}>
              {wilder.skills.map((skill) => (
                <Skill key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
