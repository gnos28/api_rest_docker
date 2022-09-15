import React, { useState } from "react";
import Image from "next/image";
import Skill from "./Skill";
import styles from "./Wilder.module.scss";
import { updateName } from "../services/wilderUpdate";

export default function Wilder({ wilder }) {
  const [nameAsInput, setNameAsInput] = useState(false);
  const [name, setName] = useState(wilder.name);

  const handleNameClick = () => {
    setNameAsInput(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleNameUpdate();
  };

  const handleNameUpdate = async () => {
    await updateName(wilder.id, name);
    setNameAsInput(false);
  };

  return (
    <div className={styles.wilderContainer}>
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
          onKeyDown={handleKeyDown}
          onChange={handleNameChange}
          value={name}
        />
      ) : (
        <h3 onClick={handleNameClick}>{name}</h3>
      )}
      {wilder.skills.length > 0 && (
        <div>
          <h4>Wild skills</h4>
          <div className={styles.skillsContainer}>
            {wilder.skills.map((skill) => (
              <Skill key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
