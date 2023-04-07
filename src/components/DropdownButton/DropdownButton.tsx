import React, { ReactNode, useState } from "react";
import styles from "./DropdownButton.module.css";
import { IoMdArrowDropdown } from "react-icons/io";

interface Props {
  children: ReactNode;
  name: string;
  open: string;

  toggleOpen: (button: string) => void;
}

const DropdownButton = ({ children, name, toggleOpen, open }: Props) => {
  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          // handleOpenStyle();
          toggleOpen(name);
        }}
        className={[
          styles.button,
          styles.dropDownButton,
          styles[open === name ? "opened" : "noStyle"],
        ].join(" ")}
      >
        {name}
        {<IoMdArrowDropdown></IoMdArrowDropdown>}
      </button>

      {open === name && children}
      {open === name && (
        <div
          onClick={() => toggleOpen(name)}
          className={styles.menuOffScreen}
        ></div>
      )}
    </div>
  );
};

export default DropdownButton;
