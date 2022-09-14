import React from "react";
import styles from "./Layout.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Wilders Book</h1>
      </header>
      {children}
    </>
  );
}
