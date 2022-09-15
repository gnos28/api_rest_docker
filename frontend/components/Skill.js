import React from "react";
import styles from "./Skill.module.scss";

export default function Skill({ skill }) {
  return <span className={styles.skill}>{skill.name}</span>;
}
