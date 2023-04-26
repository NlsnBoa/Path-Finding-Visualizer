import React, { useEffect, useRef, useState } from "react";
import styles from "./DropdownMenu.module.css";
import DropdownItem from "../DropdownItem";
import { CSSTransition } from "react-transition-group";

interface Props {
  primaryValues: string[];
  secondaryValues?: string[];
}

const DropdownMenu = ({ primaryValues, secondaryValues = [] }: Props) => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(0);
  const mainMenuRef = useRef<HTMLDivElement>(null);
  const arrowPageMenuRef = useRef<HTMLDivElement>(null);
  const targetPageMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainMenuRef.current) setMenuHeight(mainMenuRef.current.offsetHeight);
  }, []);

  // We use this to calculate the rest of the tabs
  // Pretty sure this is causing the warning
  const calcHeight = (el: { offsetHeight: any }) => {
    const height = el.offsetHeight;
    console.log(height);

    setMenuHeight(height);
  };

  const generateDropdownItems = (primaryValues: string[]) => {
    const DropdownItemsArray = [];
    for (let i = 0; i < primaryValues.length; i++) {
      if (secondaryValues.length === 0) {
        DropdownItemsArray.push(
          <DropdownItem
            handleMenuSwitch={handleMenuSwitch}
            key={primaryValues[i]}
            icon={secondaryValues[i]}
          >
            {primaryValues[i]}
          </DropdownItem>
        );
      } else {
        DropdownItemsArray.push(
          <DropdownItem
            goToMenu={secondaryValues[i]}
            handleMenuSwitch={handleMenuSwitch}
            key={primaryValues[i]}
            icon={secondaryValues[i]}
          >
            {primaryValues[i]}
          </DropdownItem>
        );
      }
    }

    return DropdownItemsArray;
  };

  const handleMenuSwitch = (value: string) => {
    setActiveMenu(value);
  };

  const DropdownItemsArray = generateDropdownItems(primaryValues);

  return (
    <div style={{ height: menuHeight }} className={styles.dropDownMenu}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames={{
          enter: styles.menuPrimaryEnter,
          enterActive: styles.menuPrimaryEnterActive,
          exit: styles.menuPrimaryExit,
          exitActive: styles.menuPrimaryExitActive,
        }}
        onEnter={() => calcHeight(mainMenuRef.current!)}
        nodeRef={mainMenuRef}
      >
        <div className="menu" ref={mainMenuRef} >
          {DropdownItemsArray}
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "ArrowPage"}
        unmountOnExit
        timeout={500}
        classNames={{
          enter: styles.menuSecondaryEnter,
          enterActive: styles.menuSecondaryEnterActive,
          exit: styles.menuSecondaryExit,
          exitActive: styles.menuSecondaryExitActive,
        }}
        onEnter={() => calcHeight(arrowPageMenuRef.current!)}
        nodeRef={arrowPageMenuRef}
      >
        <div className="menu" ref={arrowPageMenuRef}>
          <DropdownItem goToMenu={"main"} handleMenuSwitch={handleMenuSwitch}>
            {"Back"}
          </DropdownItem>
          <DropdownItem handleMenuSwitch={handleMenuSwitch}>
            {"The Arrow is where you're starting from!"}
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "TargetPage"}
        unmountOnExit
        timeout={500}
        classNames={{
          enter: styles.menuThirdEnter,
          enterActive: styles.menuThirdEnterActive,
          exit: styles.menuThirdExit,
          exitActive: styles.menuThirdExitActive,
        }}
        onEnter={() => calcHeight(targetPageMenuRef.current!)}
        nodeRef={targetPageMenuRef}
      >
        <div className="menu" ref={targetPageMenuRef}>
        <DropdownItem goToMenu={"main"} handleMenuSwitch={handleMenuSwitch}>
            {"Back"}
          </DropdownItem>
          <DropdownItem handleMenuSwitch={handleMenuSwitch}>
            {"The Target is what you are trying to get to!"}
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
