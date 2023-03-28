import React from "react";
import styles from "./Board.module.css";
import Grid from "../Grid";
const Board = () => {
  return (
    <div className={styles.board}>
      <Grid numCols={45} numRows={30}></Grid>
    </div>
  );
};

export default Board;
