import React, { ReactNode } from "react";
import styles from "./DropdownItem.module.css";
import { BiBullseye } from "react-icons/bi";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
interface Props {
  children: ReactNode;
  goToMenu?: string;
  icon?: string;
  handleMenuSwitch: (goToMenu: string) => void;
}

const DropdownItem = ({
  children,
  goToMenu = "",
  icon = "",
  handleMenuSwitch,
}: Props) => {
  const generateIcon = (icon: string) => {
    if (icon === "ArrowPage")
      return (
        <MdOutlineKeyboardDoubleArrowRight
          className={styles.arrowStatic}
        ></MdOutlineKeyboardDoubleArrowRight>
      );
    else if (icon === "TargetPage")
      return <BiBullseye className={styles.bullsEyeStatic}></BiBullseye>;
    else if (icon === "WallPage") return <div className={styles.wall}></div>;
    else if (icon === "PathPage") return <div className={styles.path}></div>;
  };

  return (
    <div
      className={styles.menuItem}
      onClick={() => goToMenu !== "" && handleMenuSwitch(goToMenu)}
    >
      {icon !== "" && generateIcon(icon)}
      {children}
      {icon !== "" && (
        <span className="iconButton">
          {
            <MdKeyboardArrowRight
              className={styles.keyBoardArrow}
            ></MdKeyboardArrowRight>
          }
        </span>
      )}
    </div>
  );
};

export default DropdownItem;
