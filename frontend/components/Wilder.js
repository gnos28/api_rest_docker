import React from "react";
import Skill from "./Skill";

export default function Wilder({ wilder }) {
  return (
    <div>
      {wilder.name}
      {wilder.skills.length > 0 &&
        wilder.skills.map((skill) => <Skill skill={skill} />)}
    </div>
  );
}
