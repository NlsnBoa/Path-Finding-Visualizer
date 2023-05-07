import { useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Nav from "./components/Nav";

// Here I am using the App component as an intermediary between
// the other components and main.tsx
function App() {
  const [runAlgorithm, setRunAlgorithm] = useState(false);
  const [clearState, setClearState] = useState(false);
  const [genMaze, setGenMaze] = useState(false);

  const toggleRunAlgorithm = () => {
    setRunAlgorithm(!runAlgorithm);
  };
  const toggleClearState = () => {
    setClearState(!clearState);
  };
  const toggleGenerateMaze = () => {
    setGenMaze(!genMaze);
  }

  return (
    <>
      <div className="app">
        <Nav
          toggleGenerateMaze={toggleGenerateMaze}
          toggleRunAlgorithm={toggleRunAlgorithm}
          toggleClearState={toggleClearState}
        ></Nav>
        <div className="container">
          <Grid
            target={"node-5-35"}
            start={"node-9-15"}
            numCols={50}
            numRows={20}
            genMaze={genMaze}
            clearState={clearState}
            runAlgorithm={runAlgorithm}
            toggleGenerateMaze={toggleGenerateMaze}
            toggleRunAlgorithm={toggleRunAlgorithm}
            toggleClearState={toggleClearState}
          ></Grid>
        </div>
      </div>
    </>
  );
}

export default App;
