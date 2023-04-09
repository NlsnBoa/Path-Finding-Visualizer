import React, { useEffect, useState } from "react";
import styles from "./Grid.module.css";
import Node from "../Node";

interface Props {
  numRows: number;
  numCols: number;
  target: string;
  start: string;
  runAlgorithm: boolean;
  toggleRunAlgorithm: () => void;
}

// Notes: I have come up with two ways of keeping track of the nodes positions
// the first can be found within this react component where
// as I am loading each node to the screen I am mapping them and checking
// for their key and event values
// The other way is found within the Node component where I am passing their coordinate
// as an argument during their creation.
const Grid = ({
  numRows,
  numCols,
  target,
  start,
  runAlgorithm,
  toggleRunAlgorithm,
}: Props) => {
  const [isMouseHover, setIsMouseHover] = useState(false);
  const [bullsEye, setBullsEye] = useState(target);
  const [arrow, setArrow] = useState(start);
  const [bullsEyeStyling, setBullsEyeStyling] = useState("bullsEyeStatic");
  const [arrowStyling, setArrowStyling] = useState("arrowStatic");
  const [objectInAction, setObjectInAction] = useState("none");
  const [currentGrid, setCurrentGrid] = useState<JSX.Element[]>([]);

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

  // create the list and give each node a coordinate value.
  const createNodeList = () => {
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

    setCurrentGrid(grid);
  };

  // This was used for testing and should honestly be deleted.
  const handleClick = (event: React.MouseEvent, key: number) => {
    console.log("key index", key);
  };

  // Convert the list of JSX elements to a grid (2D array)
  const createGrid = (nodeList: React.ReactNode[]) => {
    const grid = [];
    for (let row = 0; row < numRows; row++) {
      const rowData = [];
      for (let col = 0; col < numCols; col++) {
        rowData.push(nodeList[row * numCols + col]);
      }
      grid.push(rowData);
    }
    return grid;
  };

  //=====================================================================

  // Stores the newly created grid in a new variable so that we can
  // use .map to ensure we can catch a click event.
  // const grid = createGrid();
  useEffect(() => {
    createNodeList();
  }, [bullsEye, setBullsEye, arrow, setArrow, isMouseHover, setIsMouseHover]);

  // When runAlgorithm changes this useEffect should run the algorithm.
  useEffect(() => {
    if (runAlgorithm) {
      // const grid = createGrid(currentGrid);
      const shortestPath = dijkstra();

      toggleRunAlgorithm();
    }
  }, [runAlgorithm, toggleRunAlgorithm]);

  // This ensures that the visualization is slow enough for the user to see.
  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // const dijkstra = (
  //   grid: React.ReactNode[],
  //   startNode: string,
  //   endNode: string
  // ) => {
  //   const unvisitedNodes = getAllNodes(grid);
  //   console.log("StartNode is", startNode);
  //   console.log("endNode is", endNode);

  //   unvisitedNodes.map((element, key) => {
  //     console.log(element, key);
  //   });

  //   return [];
  // };

  const dijkstra = async () => {
    console.log("we've entered dikstras\n");
    console.log("arrow is", arrow);
    let currentRow;
    let currentCol;
    // Create Start and End node objects.
    const partsStart = arrow.split("-");
    const rowStart = parseInt(partsStart[1], 10);
    const colStart = parseInt(partsStart[2], 10);
    const partsEnd = bullsEye.split("-");
    const rowEnd = parseInt(partsEnd[1], 10);
    const colEnd = parseInt(partsEnd[2], 10);
    console.log("rowStart is", rowStart);
    console.log("colStart is", colStart);

    const startNode = { row: 0, col: 0 };
    startNode.row = rowStart;
    startNode.col = colStart;
    const endNode = { row: 0, col: 0 };
    endNode.row = rowEnd;
    endNode.col = colEnd;
    console.log("StartNode is", startNode.row, startNode.col);
    console.log("EndNode is", endNode.row, endNode.col);

    const newNodeList = [...currentGrid]; // Create a shallow copy of the currentGrid array

    for (let index = 0; index < currentGrid.length; index++) {
      currentRow = Math.floor(index / numCols);
      currentCol = index % numCols;

      if (currentRow === startNode.row && currentCol === startNode.col) {
        console.log("we just set node", currentRow, currentCol);
        console.log("index", index);
        newNodeList[index] = React.cloneElement(currentGrid[index], {
          visited: true,
        });
      }
    }

    // Update the nodeList in state
    setCurrentGrid(newNodeList);

    // Simulate a delay to visualize the algorithm
    await sleep(5);

    // Create an Visited matrix
    const visited = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => false)
    );

    const queue = [startNode];

    // Simulate recursion using a queue and a while loop.
    while (queue.length) {
      const currentNode = queue.shift();
      if (currentNode) {
        const { row, col } = currentNode;
        visited[row][col] = true;

        if (row === endNode.row && col === endNode.col) {
          console.log("node is match when row and col are", row, col);

          break;
        }

        const neighbors = [
          { row: row + 1, col },
          { row: row - 1, col },
          { row, col: col + 1 },
          { row, col: col - 1 },
        ];

        for (const neighbor of neighbors) {
          const { row, col } = neighbor;

          if (
            row >= 0 &&
            row < numRows &&
            col >= 0 &&
            col < numCols &&
            !visited[row][col]
          ) {
            queue.push(neighbor);
            visited[row][col] = true;

            // Update the nodeList for visualization
            // const newNodeList = currentGrid.map((node, index) => {
            //   const currentRow = Math.floor(index / numCols);
            //   const currentCol = index % numCols;

            //   if (currentRow === row && currentCol === col) {
            //     console.log("we just set node", currentRow, currentCol);
            //     console.log("index", index);
            //     return React.cloneElement(node, { visited: true });
            //   }
            //   return node;
            // });

            const newNodeList = [...currentGrid]; // Create a shallow copy of the currentGrid array

            for (let index = 0; index < currentGrid.length; index++) {
              currentRow = Math.floor(index / numCols);
              currentCol = index % numCols;

              if (currentRow === row && currentCol === col) {
                console.log("we just set node", currentRow, currentCol);
                console.log("index", index);
                newNodeList[index] = React.cloneElement(currentGrid[index], {
                  visited: true,
                });
              }
            }

            // Update the nodeList in state
            setCurrentGrid(newNodeList);

            // Simulate a delay to visualize the algorithm
            await sleep(5);
            if (row === endNode.row && col == endNode.col) {
              console.log("2currentRow and col are", currentRow, currentCol);
              return;
            }
          }
        }
      }
    }
  };

  // // This function Essentially copies over the grid into a new list.
  // const getAllNodes = (grid: React.ReactNode[]) => {
  //   const nodes: React.ReactNode[] = [];
  //   grid.map((element, key) => {
  //     nodes.push(<div key={key}>{key}</div>);
  //   });

  //   return nodes;
  // };

  return (
    <div className={styles.grid}>
      {/* {currentGrid.map((element, key) => (
        <div onClick={(event) => handleClick(event, key)} key={key}>
          {element}
        </div>
      ))} */}
      {currentGrid}
    </div>
  );
};

export default Grid;
