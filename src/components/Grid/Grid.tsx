import React, { useState } from "react";
import styles from "./Grid.module.css";
import Node from "../Node";

interface Props {
  numRows: number;
  numCols: number;
  target: string;
  start: string;
}

// Notes: I have come up with two ways of keeping track of the nodes positions
// the first can be found within this react component where
// as I am loading each node to the screen I am mapping them and checking
// for their key and event values
// The other way is found within the Node component where I am passing their coordinate
// as an argument during their creation.
const Grid = ({ numRows, numCols, target, start }: Props) => {
  // create the grid and give each node a coordinate value.
  const [isMouseHover, setIsMouseHover] = useState(false);
  const [bullsEye, setBullsEye] = useState(target);
  const [arrow, setArrow] = useState(start);
  const [bullsEyeStyling, setBullsEyeStyling] = useState("bullsEyeStatic");
  const [arrowStyling, setArrowStyling] = useState("arrowStatic");
  const [objectInAction, setObjectInAction] = useState("none");

  const handleIsMouseUp = (newCoordinate: string) => {
    if (objectInAction === "bullsEyeInAction") {
      setBullsEye(newCoordinate);
      setBullsEyeStyling("bullsEyeStatic");
      setIsMouseHover(false);
    } else if (objectInAction === "arrowInAction") {
      setArrow(newCoordinate);
      setArrowStyling("arrowStatic");
      setIsMouseHover(false);
    }

    setObjectInAction("none");
  };

  const handleIsMouseHover = (newCoordinate: string) => {
    if (objectInAction === "bullsEyeInAction") {
      setBullsEye(newCoordinate);
      setBullsEyeStyling("bullsEyeDrop");
    } else if (objectInAction === "arrowInAction") {
      setArrow(newCoordinate);
      setArrowStyling("arrowDrop");
    }
  };

  const handleIsMouseDown = (newCoordinate: string) => {
    if (newCoordinate === "notBullsEye") {
      setBullsEye(newCoordinate);
      setIsMouseHover(true);
      setObjectInAction("bullsEyeInAction");
    } else if (newCoordinate === "notArrow") {
      setArrow(newCoordinate);
      setIsMouseHover(true);
      setObjectInAction("arrowInAction");
    }
  };

  const createGrid = () => {
    const grid = [];

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        // Here we set a given node as the target
        if (bullsEye === `node-${row}-${col}`) {
          grid.push(
            <Node
              bullsEye={bullsEye}
              bullsEyeStyling={bullsEyeStyling}
              mouseHover={isMouseHover}
              handleIsMouseHover={handleIsMouseHover}
              handleIsMouseDown={handleIsMouseDown}
              handleIsMouseUp={handleIsMouseUp}
              coordinate={`node-${row}-${col}`}
              key={`node-${row}-${col}`}
            />
          );
        } else if (arrow === `node-${row}-${col}`) {
          grid.push(
            <Node
              arrow={arrow}
              arrowStyling={arrowStyling}
              mouseHover={isMouseHover}
              handleIsMouseHover={handleIsMouseHover}
              handleIsMouseDown={handleIsMouseDown}
              handleIsMouseUp={handleIsMouseUp}
              coordinate={`node-${row}-${col}`}
              key={`node-${row}-${col}`}
            />
          );
        } else {
          grid.push(
            <Node
              mouseHover={isMouseHover}
              handleIsMouseHover={handleIsMouseHover}
              handleIsMouseDown={handleIsMouseDown}
              handleIsMouseUp={handleIsMouseUp}
              coordinate={`node-${row}-${col}`}
              key={`node-${row}-${col}`}
            />
          );
        }
      }
    }

    return grid;
  };

  const handleClick = (event: React.MouseEvent, key: number) => {
    console.log("key index", key);
  };

  // Stores the newly created grid in a new variable so that we can
  // use .map to ensure we can catch a click event.
  const grid = createGrid();
  return (
    <div className={styles.grid}>
      {grid.map((element, key) => (
        <div onClick={(event) => handleClick(event, key)} key={key}>
          {element}
        </div>
      ))}
    </div>
  );
};

export default Grid;
