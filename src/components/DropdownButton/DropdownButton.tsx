import React, { ReactNode, useState } from "react";
import styles from "./DropdownButton.module.css";
import { IoMdArrowDropdown } from "react-icons/io";

interface Props {
  children: ReactNode;
  name: string;
}

const DropdownButton = ({ children, name }: Props) => {
  const [open, setOpen] = useState(false);
  const [openStyle, setOpenStyle] = useState("noStyle");

  const handleOpenStyle = () => {
    if (openStyle === "opened") {
      setOpenStyle("noStyle");
    } else {
      setOpenStyle("opened");
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          setOpen(!open);
          handleOpenStyle();
        }}
        className={[
          styles.button,
          styles.dropDownButton,
          styles[openStyle],
        ].join(" ")}
      >
        {name}
        {<IoMdArrowDropdown></IoMdArrowDropdown>}
      </button>

      {open && children}
    </div>
  );
};

export default DropdownButton;
