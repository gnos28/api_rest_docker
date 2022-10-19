import React, { useState, BaseSyntheticEvent, KeyboardEvent } from "react";
import { convertLineBreakToBr } from "../services/convert";
import { IWilder } from "../interfaces/IWilder";
import styles from "./InteractiveText.module.scss";
import { wilderAPI } from "../api/wilder";

type InteractiveTextProps = {
  wilder: IWilder;
  type: "h3" | "p";
};

export default function InteractiveText({
  wilder,
  type,
}: InteractiveTextProps) {
  const [textAsInput, setTextAsInput] = useState<boolean>(false);
  const [text, setText] = useState<string>(
    type === "h3" ? wilder.name : wilder.description
  );

  const activateInput = (): void => {
    setTextAsInput(true);
  };

  const handleChange = (e: BaseSyntheticEvent): void => {
    setText(e.target.value);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (type === "h3" && (e.key === "Enter" || e.key === "Escape"))
      handleUpdate();
    if (type === "p" && e.key === "Escape") handleUpdate();
  };

  const handleUpdate = async (): Promise<void> => {
    console.log("wilder", wilder);

    if (type === "h3") await wilderAPI.updateName("csr", wilder.id, text);
    if (type === "p") await wilderAPI.updateDescription("csr", wilder.id, text);

    setTextAsInput(false);
  };

  return (
    <>
      {type === "h3" && (
        <>
          {textAsInput ? (
            <input
              className={styles.nameInput}
              type="text"
              autoFocus
              onBlur={handleUpdate}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(e)
              }
              onChange={handleChange}
              value={text}
            />
          ) : (
            <h3 className={styles.overInteraction} onClick={activateInput}>
              {text}
            </h3>
          )}
        </>
      )}
      {type === "p" && (
        <>
          {textAsInput ? (
            <textarea
              className={styles.descriptionInput}
              autoFocus
              rows={Math.max(text?.split("\n").length || 2, 2)}
              onBlur={handleUpdate}
              onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) =>
                handleKeyDown(e)
              }
              onChange={handleChange}
              value={text || ""}
            />
          ) : (
            <p className={styles.pOverInteraction} onClick={activateInput}>
              {text && text.length
                ? convertLineBreakToBr(text)
                : "pas de description"}
            </p>
          )}
        </>
      )}
    </>
  );
}
