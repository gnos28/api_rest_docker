import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Skill.module.scss";
import { updateSkillRating } from "../services/wilderUpdate";

const EMPTY_STAR_URL = "/star_empty.svg";
const FULL_STAR_URL = "/star_full.svg";

export default function Skill({ skill, wilderId }) {
  const [rating, setRating] = useState(0);
  const [stars, setStars] = useState([]);

  const handleStarClick = async () => {
    const currentRating = rating;
    const newRating = currentRating > 4 ? 0 : currentRating + 1;

    await updateSkillRating(wilderId, skill.id, newRating);
    setRating(newRating);
  };

  useEffect(() => {
    setStars(
      Array(5)
        .fill(EMPTY_STAR_URL)
        .map((star, starIndex) => {
          if (starIndex + 1 > rating) return EMPTY_STAR_URL;
          return FULL_STAR_URL;
        })
    );
  }, [rating]);

  useEffect(() => {
    setRating(skill.rating);
  }, [skill]);

  return (
    <div className={styles.skill}>
      <span>{skill.name}</span>
      <div className={styles.starsContainer} onClick={handleStarClick}>
        {stars.map((star, starIndex) => (
          <Image
            key={starIndex}
            src={star}
            height={15}
            width={15}
            alt="rating"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
