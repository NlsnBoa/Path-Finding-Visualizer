import React, { useEffect, useState } from "react";
import styles from "./Grid.module.css";
import Node from "../Node";
import { PriorityQueue } from "./PriorityQueue";

interface Props {
  clearState: boolean;
  numRows: number;
  numCols: number;
  target: string;
  start: string;
  runAlgorithm: boolean;
  toggleRunAlgorithm: () => void;
  toggleClearState: () => void;
}

// Notes: I have come up with two ways of keeping track of the nodes positions
// the first can be found within this react component where
// as I am loading each node to the screen I am mapping them and checking
// for their key and event values
// The other way is found within the Node component where I am passing their coordinate
// as an argument during their creation.
const Grid = ({
  clearState,
  numRows,
  numCols,
  target,
  start,
  runAlgorithm,
  toggleRunAlgorithm,
  toggleClearState,
}: Props) => {
  const [isMouseHover, setIsMouseHover] = useState(false);
  const [bullsEye, setBullsEye] = useState(target);
  const [arrow, setArrow] = useState(start);
  const [bullsEyeStyling, setBullsEyeStyling] = useState("bullsEyeStatic");
  const [arrowStyling, setArrowStyling] = useState("arrowStatic");
  const [objectInAction, setObjectInAction] = useState("none");
  const [currentGrid, setCurrentGrid] = useState<JSX.Element[]>([]);
  const [wallGrid, setWallGrid] = useState<string[]>([]);
  const [wallUpdated, setWallUpdate] = useState(0);
  const oo = 10000000;

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

  const updateWallGrid = (index: number) => {
    console.log("wall length", wallGrid.length);
    const newWallGrid = [...wallGrid]; // Create a shallow copy of the currentGrid array

    if (newWallGrid[index] == " ") newWallGrid[index] = "WALL!";
    else newWallGrid[index] = " ";
    setWallGrid(newWallGrid);
  };

  // create the list and give each node a coordinate value.
  const createNodeList = () => {
    const grid = [];
    console.log("creating a nodeList");

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
    updateWallGrid(key);
  };

  // Convert the list of JSX elements to a grid (2D array)
  const createWallGrid = () => {
    console.log("creating wallGrid");

    const grid = [];
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        grid.push(" ");
      }
    }
    console.log("length", grid.length);

    setWallGrid(grid);

    console.log("wallgridLength", wallGrid.length);
  };

  useEffect(() => {
    createWallGrid();
  }, []);

  //=====================================================================

  // Stores the newly created grid in a new variable so that we can
  // use .map to ensure we can catch a click event.
  // const grid = createGrid();
  useEffect(() => {
    createNodeList();
  }, [bullsEye, setBullsEye, arrow, setArrow, isMouseHover, setIsMouseHover]);
  // Create WallGrid no matter what

  // When runAlgorithm changes this useEffect should run the algorithm.
  useEffect(() => {
    if (runAlgorithm) {
      let numVerticies = numRows * numCols;
      runDikstras(numVerticies);
      // let path: Promise<string[][] | undefined> = runDikstras(
      //   grid,
      //   numVerticies
      // );
      // path.then((resolvedPath) => {
      //   if (resolvedPath !== undefined) {
      //     findShortestPath(resolvedPath);
      //   }
      // });
      // findShortestPath(path);
      toggleRunAlgorithm();
    }
  }, [runAlgorithm, toggleRunAlgorithm]);

  // When we want to clear the board of the path and algoritm fallout.
  useEffect(() => {
    if (clearState) {
      console.log("ineffect1");

      const newNodeList = [...currentGrid]; // Create a shallow copy of the currentGrid array

      for (let index = 0; index < currentGrid.length; index++) {
        let currentRow = Math.floor(index / numCols);
        let currentCol = index % numCols;

        newNodeList[index] = React.cloneElement(currentGrid[index], {
          visited: false,
          visitedPath: false,
        });
      }

      // Update the nodeList in state
      setCurrentGrid(newNodeList);
      createNodeList();
      toggleClearState();
    }
  }, [clearState, toggleClearState]);

  // This ensures that the visualization is slow enough for the user to see.
  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  //==============================================
  const runBreadthFirstSearch = async () => {
    // console.log("we've entered dikstras\n");
    // console.log("arrow is", arrow);
    let currentRow;
    let currentCol;
    // Create Start and End node objects.
    const partsStart = arrow.split("-");
    const rowStart = parseInt(partsStart[1], 10);
    const colStart = parseInt(partsStart[2], 10);
    const partsEnd = bullsEye.split("-");
    const rowEnd = parseInt(partsEnd[1], 10);
    const colEnd = parseInt(partsEnd[2], 10);
    // console.log("rowStart is", rowStart);
    // console.log("colStart is", colStart);

    const startNode = { row: 0, col: 0 };
    startNode.row = rowStart;
    startNode.col = colStart;
    const endNode = { row: 0, col: 0 };
    endNode.row = rowEnd;
    endNode.col = colEnd;
    // console.log("StartNode is", startNode.row, startNode.col);
    // console.log("EndNode is", endNode.row, endNode.col);

    const newNodeList = [...currentGrid]; // Create a shallow copy of the currentGrid array

    for (let index = 0; index < currentGrid.length; index++) {
      currentRow = Math.floor(index / numCols);
      currentCol = index % numCols;

      if (currentRow === startNode.row && currentCol === startNode.col) {
        // console.log("we just set node", currentRow, currentCol);
        // console.log("index", index);
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
          // console.log("node is match when row and col are", row, col);

          break;
        }

        const neighbors = [
          { row: row + 1, col },
          { row, col: col + 1 },
          { row: row - 1, col },
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

            const newNodeList = [...currentGrid]; // Create a shallow copy of the currentGrid array

            for (let index = 0; index < currentGrid.length; index++) {
              currentRow = Math.floor(index / numCols);
              currentCol = index % numCols;

              if (currentRow === row && currentCol === col) {
                // console.log("we just set node", currentRow, currentCol);
                // console.log("index", index);
                newNodeList[index] = React.cloneElement(currentGrid[index], {
                  visited: true,
                });
              }
            }

            // Update the nodeList in state
            setCurrentGrid(newNodeList);

            // Simulate a delay to visualize the algorithm
            await sleep(5);

            // If the node that we are on is the end node lets return out of this function.
            if (row === endNode.row && col == endNode.col) {
              // console.log("currentRow and col are", currentRow, currentCol);
              return;
            }
          }
        }
      }
    }
  };
  //==============================================

  const runDikstras = async (numVerticies: number) => {
    let currentRow;
    let currentCol;
    let numVisitedNodes = 0;
    let prev = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => "nothing")
    );
    // console.log("entered Dikstras", prev);

    // Create Start and End node objects.
    const partsStart = arrow.split("-");
    const rowStart = parseInt(partsStart[1], 10);
    const colStart = parseInt(partsStart[2], 10);
    const partsEnd = bullsEye.split("-");
    const rowEnd = parseInt(partsEnd[1], 10);
    const colEnd = parseInt(partsEnd[2], 10);
    // console.log("rowStart is", rowStart);
    // console.log("colStart is", colStart);

    const startNode = { row: 0, col: 0 };
    startNode.row = rowStart;
    startNode.col = colStart;
    const endNode = { row: 0, col: 0 };
    endNode.row = rowEnd;
    endNode.col = colEnd;
    // console.log("StartNode is", startNode.row, startNode.col);
    // console.log("EndNode is", endNode.row, endNode.col);

    // Set up Distance matrix and set all values to infinity and set up the Visited Matrix
    const dist = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => oo)
    );
    console.log("inf", oo);

    const visited = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => false)
    );

    //set the Dist of the start Node to 0 and set it to visited.
    dist[startNode.row][startNode.col] = 0;
    // visited[startNode.row][startNode.col] = true;
    prev[startNode.row][startNode.col] = "startNode";

    //Create Priority Queque
    const minHeap = new PriorityQueue<{ row: number; col: number }>();
    // Throw all of the verticies into a minheap with their,
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        // console.log("setting up minHeap", i, j);

        minHeap.enqueue({ row: i, col: j }, dist[i][j]);
      }
    }

    while (!minHeap.isEmpty() && numVisitedNodes < numVerticies) {
      let vertex = minHeap.dequeue();
      // console.log(" ");
      // console.log("entered while", numVisitedNodes);

      // Check that Vertex exists
      if (vertex !== undefined) {
        // console.log("entered vertex if when", numVisitedNodes);
        const { row, col } = vertex;
        let rowNow = row;
        let colNow = col;
        // console.log("rowNow colNow", rowNow, colNow);
        if (visited[row][col]) continue;

        // If vertice hasn't been visited, visit it.
        visited[row][col] = true;
        numVisitedNodes++;

        // We only ever need to look at the verticies around the current vertice
        // In an actual dijkstas, we wont know this, therefore we must visit each vertice and not just 4.
        const neighbors = [
          { row: row + 1, col },
          { row, col: col + 1 },
          { row: row - 1, col },
          { row, col: col - 1 },
        ];

        for (const neighbor of neighbors) {
          const { row, col } = neighbor;
          let rowNext = row;
          let colNext = col;
          // console.log("rowNext colNext", row, col);
          // Calculate vertice distance from startNode and that will be its weight.
          // Weight(rowNext, colNext) = |startrow - rowNext| + |startcol - colNext|
          let rowDistance = startNode.row - rowNext;
          let colDistance = startNode.col - colNext;

          if (rowDistance < 0) rowDistance = rowDistance * -1;
          if (colDistance < 0) colDistance = colDistance * -1;
          let weight = rowDistance + colDistance;
          // console.log("rowNext colNext, weight", row, col, weight); // Check some stuff.
          // console.log(" dist[rowNow][colNow]", dist[rowNow][colNow]);

          if (
            row >= 0 &&
            row < numRows &&
            col >= 0 &&
            col < numCols &&
            !visited[row][col] &&
            dist[rowNow][colNow] + weight < dist[rowNext][colNext]
          ) {
            // console.log("we got in", row, col);
            let stop = false;

            // Check if this is a wall
            for (let index = 0; index < wallGrid.length; index++) {
              let wallRow = Math.floor(index / numCols);
              let wallCol = index % numCols;

              if (
                wallRow === rowNext &&
                wallCol === colNext &&
                wallGrid[index] == "WALL!"
              ) {
                stop = true;
              }
            }
            // if, wall skip
            if (stop) continue;

            prev[rowNext][colNext] = `node-${rowNow}-${colNow}`;
            dist[rowNext][colNext] = dist[rowNow][colNow] + weight;
            minHeap.enqueue(
              { row: rowNext, col: colNext },
              dist[rowNext][colNext]
            );

            const newNodeList = [...currentGrid]; // Create a shallow copy of the currentGrid array

            for (let index = 0; index < currentGrid.length; index++) {
              currentRow = Math.floor(index / numCols);
              currentCol = index % numCols;

              if (currentRow === rowNext && currentCol === colNext) {
                // console.log("we just set node", currentRow, currentCol);
                // console.log("index", index);
                newNodeList[index] = React.cloneElement(currentGrid[index], {
                  visited: true,
                });
              }
            }

            // Update the nodeList in state
            setCurrentGrid(newNodeList);

            // Simulate a delay to visualize the algorithm
            await sleep(5);

            // If the node that we are on is the end node lets return out of this function.
            if (rowNext === endNode.row && colNext == endNode.col) {
              console.log("this is prev at the top", prev);
              await sleep(2000);
              findShortestPath(prev);
              return prev;
            }
          }
        }
      }
    }
    console.log("this is prev at the bottom", prev);
    findShortestPath(prev);
    return;
  };

  const findShortestPath = async (prev: string[][]) => {
    // console.log("entered shortestPath");

    //let path = Array.from({ length: numCols * numRows }, () => -1);//
    let path = [];
    let rowNow;
    let colNow;
    let previousVertice;

    // Create Start and End node objects.
    const partsStart = arrow.split("-");
    const rowStart = parseInt(partsStart[1], 10);
    const colStart = parseInt(partsStart[2], 10);
    const partsEnd = bullsEye.split("-");
    const rowEnd = parseInt(partsEnd[1], 10);
    const colEnd = parseInt(partsEnd[2], 10);
    // console.log("rowStart is", rowStart);
    // console.log("colStart is", colStart);

    const startNode = { row: 0, col: 0 };
    startNode.row = rowStart;
    startNode.col = colStart;
    const endNode = { row: 0, col: 0 };
    endNode.row = rowEnd;
    endNode.col = colEnd;
    // console.log("StartNode is", startNode.row, startNode.col);
    // console.log("EndNode is", endNode.row, endNode.col);

    rowNow = endNode.row;
    colNow = endNode.col;

    // Convert Prev Matrix into path array
    while (1) {
      for (let index = 0; index < currentGrid.length; index++) {
        let currentRow = Math.floor(index / numCols);
        let currentCol = index % numCols;

        if (currentRow === rowNow && currentCol === colNow) {
          console.log("pushing", index);
          path.push(index);
        }
      }

      previousVertice = prev[rowNow][colNow];
      if (previousVertice === "startNode") {
        console.log("reached break");

        break;
      }

      let partsStart = previousVertice.split("-");
      rowNow = parseInt(partsStart[1], 10);
      colNow = parseInt(partsStart[2], 10);
    }

    // Display path
    for (let i = path.length - 1; i >= 0; i--) {
      const newNodeList = [...currentGrid]; // Create a shallow copy of the currentGrid array

      newNodeList[path[i]] = React.cloneElement(currentGrid[path[i]], {
        visitedPath: true,
        // arrowPath: "arrowPathDropUp",
      });

      // Update the nodeList in state
      setCurrentGrid(newNodeList);

      // Simulate a delay to visualize the algorithm
      await sleep(5);
    }
  };

  return (
    <div className={styles.grid}>
      {currentGrid.map((element, key) => (
        <div onClick={(event) => handleClick(event, key)} key={key}>
          {element}
        </div>
      ))}
    </div>
  );
};

export default Grid;
