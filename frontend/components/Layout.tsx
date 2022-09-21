import React from "react";
import styles from "./Layout.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div>
            <h1>Wilders Book</h1>
          </div>
        </div>
      </header>
      <div className={styles.container}>
        <div>{children}</div>
      </div>
    </>
  );
}
