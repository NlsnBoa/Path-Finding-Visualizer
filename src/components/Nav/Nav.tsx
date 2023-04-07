import styles from "./Nav.module.css";
import DropdownButton from "../DropdownButton";
import DropdownMenu from "../DropdownMenu";

const Nav = () => {
  const algorithms = ["Dikstras", "Breadth First", "Depth First"];
  const legendValues = ["Arrow", "Target", "Wall", "Path"];
  const legendSecondaryValues = [
    "ArrowPage",
    "TargetPage",
    "WallPage",
    "PathPage",
  ];
  const speedValues = ["Fast", "Medium", "Slow"];
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Pathfinding Visualizer</h1>
      <div className={styles.menu}>
        <DropdownButton name="Legend">
          <DropdownMenu
            primaryValues={legendValues}
            secondaryValues={legendSecondaryValues}
          ></DropdownMenu>
        </DropdownButton>
        <button type="button" className={styles.buttonMain}>
          Visualize
        </button>
        <DropdownButton name="Algorthms">
          <DropdownMenu primaryValues={algorithms}></DropdownMenu>
        </DropdownButton>
        <DropdownButton name="Speed">
          <DropdownMenu primaryValues={speedValues}></DropdownMenu>
        </DropdownButton>
        <button className={styles.buttonSubset}>Clear Board</button>
      </div>
    </div>
  );
};

export default Nav;
