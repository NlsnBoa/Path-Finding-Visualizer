import React, { ReactNode } from "react";
import styles from "./Dropdown.module.css";
import { IoMdArrowDropdown } from "react-icons/io";

interface Props {
  children: ReactNode;
}

const Dropdown = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <button className={[styles.button, styles.dropDown].join(" ")}>
        {children}
        {<IoMdArrowDropdown></IoMdArrowDropdown>}
      </button>
    </div>
  );
};

export default Dropdown;
