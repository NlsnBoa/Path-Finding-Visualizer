import React, { useEffect, useState } from "react";
import { BiBullseye } from "react-icons/bi";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import styles from "./Node.module.css";
interface Props {
  arrow?: string;
  arrowStyling?: string;
  bullsEye?: string;
  bullsEyeStyling?: string;
  coordinate: string;
  mouseHover: boolean;
  visited?: boolean;
  handleIsMouseUp: (newCoordinate: string) => void;
  handleIsMouseDown: (newCoordinate: string) => void;
  handleIsMouseHover: (newCoordinate: string) => void;
}

const Node = ({
  arrow = "notArrow",
  arrowStyling = "noStyling",
  coordinate,
  bullsEye = "notBullsEye",
  bullsEyeStyling = "noStyling",
  mouseHover,
  visited = false,
  handleIsMouseUp,
  handleIsMouseDown,
  handleIsMouseHover,
}: Props) => {
  const [wall, setWall] = useState("off");
  const [visitedState, setVisitedState] = useState(false);

  useEffect(() => {
    if (visited) {
      setVisitedState(true);
    }
  }, [visited]);

  const visitedClassName = visitedState ? "visited" : "";

  const handleWallChangeClick = () => {
    console.log("coordinate updated", coordinate);
    if (wall === "on") {
      setWall("off");
    } else {
      setWall("on");
    }
  };

  return (
    <div
      onClick={handleWallChangeClick}
      onMouseUp={() => {
        if (mouseHover) {
          handleIsMouseUp(coordinate);
          setWall("off");
        }
      }}
      onMouseOver={() =>
        bullsEye == "notBullsEye" &&
        mouseHover &&
        handleIsMouseHover(coordinate)
      }
      className={[styles.node, styles[wall], styles[visitedClassName]].join(
        " "
      )}
    >
      {bullsEye === coordinate && (
        <BiBullseye
          onMouseDown={() => handleIsMouseDown("notBullsEye")}
          className={styles[bullsEyeStyling]}
        ></BiBullseye>
      )}

      {arrow === coordinate && (
        <MdOutlineKeyboardDoubleArrowRight
          onMouseDown={() => handleIsMouseDown("notArrow")}
          className={styles[arrowStyling]}
        ></MdOutlineKeyboardDoubleArrowRight>
      )}
    </div>
  );
};

export default Node;
