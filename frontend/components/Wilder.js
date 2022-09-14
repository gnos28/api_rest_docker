import React from "react";
import Image from "next/image";
import Skill from "./Skill";
import styles from "./Wilder.module.scss";

export default function Wilder({ wilder }) {
  return (
    <div className={styles.wilderContainer}>
      <Image
        src="/profile_picture.png"
        height={221}
        width={200}
        alt="profile picture"
      />
      <h3>{wilder.name}</h3>
      {wilder.skills.length > 0 && (
        <div>
          <h4>Wild skills</h4>
          {wilder.skills.map((skill) => (
            <Skill key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}
