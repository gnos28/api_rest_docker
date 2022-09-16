import React from "react";
import wilderStyles from "./Wilder.module.scss";
import styles from "./AddAWilder.module.scss";

export default function AddAWilder() {
  return <div className={[wilderStyles.wilderContainer, styles.dottedContainer].join(" ")}>AddAWilder</div>;
}
