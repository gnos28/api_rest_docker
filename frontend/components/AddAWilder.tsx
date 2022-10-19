import React, {
  useState,
  Dispatch,
  SetStateAction,
  BaseSyntheticEvent,
  KeyboardEvent,
} from "react";
import Image from "next/image";
import wilderStyles from "./Wilder.module.scss";
import skillUpdateStyles from "./SkillUpdateModal.module.scss";
import styles from "./AddAWilder.module.scss";
import { convertLineBreakToBr } from "../services/convert";
import { wilderAPI } from "../api/wilder";
import { IWilder } from "../interfaces/IWilder";

type Setter<Type> = Dispatch<SetStateAction<Type>>;

type AddAWilderProps = {
  wilders: IWilder[];
  setWilders: Setter<IWilder[]>;
};

export default function AddAWilder({ wilders, setWilders }: AddAWilderProps) {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [nameAsInput, setNameAsInput] = useState<boolean>(false);
  const [descriptionAsInput, setDescriptionAsInput] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const activateInput = (setter: Setter<any>): void => {
    setter(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") handleNameUpdate();
  };

  const handleChange = (e: BaseSyntheticEvent, setter: Setter<any>): void => {
    setter(e.target.value);
  };

  const handleNameUpdate = async (): Promise<void> => {
    setNameAsInput(false);
  };

  const handleDescriptionUpdate = async (): Promise<void> => {
    setDescriptionAsInput(false);
  };

  const handleCancel = (): void => {
    setName("");
    setDescription("");
    setShowAddForm(false);
  };

  const handleConfirm = async (): Promise<void> => {
    // add wilder to database
    if (name.length) {
      const result: IWilder = await wilderAPI.create("csr", {
        name,
        description,
      });

      const newWilder: IWilder = {
        id: result.id,
        name,
        description,
        skills: [],
      };
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
              onKeyDown={(e) => handleKeyDown(e)}
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
