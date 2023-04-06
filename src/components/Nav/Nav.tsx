import React from "react";
import styles from "./Nav.module.css";
import Dropdown from "../Dropdown";

const Nav = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Pathfinding Visualizer</h1>
      <div className={styles.menu}>
        <button type="button" className={styles.buttonMain}>
          Visualize
        </button>
        <Dropdown>Algorithms</Dropdown>
        <Dropdown>Mazes</Dropdown>
        <button className={styles.buttonSubset}>Clear Board</button>
      </div>
    </div>
  );
};

export default Nav;
