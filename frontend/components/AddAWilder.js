import React, { useState } from "react";
import Image from "next/image";
import wilderStyles from "./Wilder.module.scss";
import skillUpdateStyles from "./SkillUpdateModal.module.scss";
import styles from "./AddAWilder.module.scss";
import { convertLineBreakToBr } from "../services/convert";
import { createWilder } from "../services/wilderPost";

export default function AddAWilder({ wilders, setWilders }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [nameAsInput, setNameAsInput] = useState(false);
  const [descriptionAsInput, setDescriptionAsInput] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const activateInput = (setter) => {
    setter(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleNameUpdate();
  };

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleNameUpdate = async () => {
    setNameAsInput(false);
  };

  const handleDescriptionUpdate = async () => {
    setDescriptionAsInput(false);
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setShowAddForm(false);
  };

  const handleConfirm = async () => {
    // add wilder to database
    if (name.length) {
      const result = await createWilder({ name, description });
      const newWilder = { id: result.id, name, description, skills: [] };
      setWilders([...wilders, newWilder]);
      setName("");
      setDescription("");
      setShowAddForm(false);
    }
  };

  return (
    <div
      className={[wilderStyles.wilderContainer, styles.dottedContainer].join(
        " "
      )}
      style={{ border: "none", boxShadow: "none" }}
    >
      {showAddForm ? (
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
              className={wilderStyles.nameInput}
              type="text"
              autoFocus
              onBlur={handleNameUpdate}
              onKeyDown={(e) => handleKeyDown(e, handleNameUpdate)}
              onChange={(e) => handleChange(e, setName)}
              value={name}
            />
          ) : (
            <h3 onClick={() => activateInput(setNameAsInput)}>
              {name || "New wilder"}
            </h3>
          )}
          {descriptionAsInput ? (
            <textarea
              className={wilderStyles.descriptionInput}
              type="text"
              autoFocus
              onBlur={handleDescriptionUpdate}
              onChange={(e) => handleChange(e, setDescription)}
              value={description || ""}
            />
          ) : (
            <p onClick={() => activateInput(setDescriptionAsInput)}>
              {description && description.length
                ? convertLineBreakToBr(description)
                : "Description du nouveau wilder"}
            </p>
          )}
          <div
            className={[
              skillUpdateStyles.actions,
              styles.actionsContainerOverride,
            ].join(" ")}
          >
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
        </>
      ) : (
        <div className={styles.addContainer}>
          <button
            className={styles.addButton}
            onClick={() => setShowAddForm(true)}
          >
            <Image
              src="/add.svg"
              height={221}
              width={200}
              alt="add a new wilder"
              draggable={false}
            />
          </button>
        </div>
      )}
    </div>
  );
}
