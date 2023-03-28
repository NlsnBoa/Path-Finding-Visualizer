import React from "react";
import styles from "./Grid.module.css";
import Node from "../Node";

interface Props {
  numRows: number;
  numCols: number;
}

const Grid = ({ numRows, numCols }: Props) => {
  const createGrid = () => {
    const grid = [];

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        grid.push(<Node key={`node-${row}-${col}`} />);
      }
    }

    return grid;
  };

  return <div className={styles.grid}>{createGrid()}</div>;
};

export default Grid;
