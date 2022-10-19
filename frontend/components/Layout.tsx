import React, { ReactNode } from "react";
import styles from "./Layout.module.scss";
type LayoutType = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutType) {
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
