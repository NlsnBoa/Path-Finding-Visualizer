import { useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Nav from "./components/Nav";

// Here I am using the App component as an intermediary between
// the other components and main.tsx
function App() {
  const [runAlgorithm, setRunAlgorithm] = useState(false);
  const [clearState, setClearState] = useState(false);

  const toggleRunAlgorithm = () => {
    setRunAlgorithm(!runAlgorithm);
  };
  const toggleClearState = () => {
    setClearState(!clearState);
  };

  return (
    <>
      <div className="app">
        <Nav
          runAlgorithm={runAlgorithm}
          clearState={clearState}
          toggleRunAlgorithm={toggleRunAlgorithm}
          toggleClearState={toggleClearState}
        ></Nav>
        <div className="container">
          <Grid
            clearState={clearState}
            target={"node-5-35"}
            start={"node-9-15"}
            numCols={50}
            numRows={20}
            runAlgorithm={runAlgorithm}
            toggleRunAlgorithm={toggleRunAlgorithm}
            toggleClearState={toggleClearState}
          ></Grid>
        </div>
      </div>
    </>
  );
}

export default App;
