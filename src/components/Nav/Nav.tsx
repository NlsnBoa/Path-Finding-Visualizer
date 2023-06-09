import styles from "./Nav.module.css";
import DropdownButton from "../DropdownButton";
import DropdownMenu from "../DropdownMenu";
import { useState } from "react";

interface Props {
  toggleGenerateMaze: () => void;
  toggleRunAlgorithm: () => void;
  toggleClearState: () => void;
}

const Nav = ({
  toggleGenerateMaze,
  toggleRunAlgorithm,
  toggleClearState,
}: Props) => {
  const [open, setOpen] = useState("false");
  const algorithms = ["Dikstras", "Breadth First", "Depth First"];
  const legendValues = ["Arrow", "Target", "Wall", "Path"];
  const legendSecondaryValues = [
    "ArrowPage",
    "TargetPage",
    "WallPage",
    "PathPage",
  ];
  const speedValues = ["Fast", "Medium", "Slow"];

  const toggleOpen = (button: string) => {
    if (button === open) {
      setOpen("");
    } else {
      setOpen(button);
    }
  };

  return (
    <div className={styles.container}>
      <div className={[styles.conatiner, styles.titleContainer].join(' ')}>
        {/* <img className={styles.logo} src="./images/pathfindingvisualizerlogo.svg" alt="Logo" ></img>  */}
        <div className={styles.logo} ></div>
        <h1 className={styles.h1}>Pathfinding Visualizer</h1>
      </div>
      <div className={styles.menu}>
        <DropdownButton open={open} toggleOpen={toggleOpen} name="Legend">
          <DropdownMenu
            primaryValues={legendValues}
            secondaryValues={legendSecondaryValues}
          ></DropdownMenu>
        </DropdownButton>
        <button
          type="button"
          className={styles.buttonMain}
          onClick={toggleRunAlgorithm}
        >
          Visualize
        </button>
        <DropdownButton open={open} toggleOpen={toggleOpen} name="Algorithm">
          <DropdownMenu primaryValues={algorithms}></DropdownMenu>
        </DropdownButton>
        {/* <button className={styles.buttonSubset} onClick={toggleGenerateMaze}>
            Generate Maze
        </button> */}
        <DropdownButton open={open} toggleOpen={toggleOpen} name="Speed">
          <DropdownMenu primaryValues={speedValues}></DropdownMenu>
        </DropdownButton>
        <button className={styles.buttonSubset} onClick={toggleClearState}>
          Clear Board
        </button>
      </div>
    </div>
  );
};

export default Nav;
