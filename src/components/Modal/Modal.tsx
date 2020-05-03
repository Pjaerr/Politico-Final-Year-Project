import React, { FunctionComponent } from "react";

import styles from "./Modal.module.scss";

type Props = {
  title: string;
  onCloseFunc: () => void;
};

const Modal: FunctionComponent<Props> = ({ title, onCloseFunc, children }) => {
  return (
    <>
      <div className={styles.modalOverlay} />
      <section className={styles.container}>
        <div className={styles.modal}>
          <header className={styles.header}>
            <div className={styles.headerBackButton}>
              <button onClick={onCloseFunc}>
                <img src="back-arrow.svg" alt="Back Arrow Icon"></img>
              </button>
            </div>
            <div className={styles.headerTitle}>
              <h1>{title}</h1>
            </div>
          </header>
          <section className={styles.body}>{children}</section>
        </div>
      </section>
    </>
  );
};

export default Modal;
