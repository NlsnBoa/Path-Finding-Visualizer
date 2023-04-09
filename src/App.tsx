import { useState } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Nav from "./components/Nav";

// Here I am using the App component as an intermediary between
// the other components and main.tsx
function App() {
  const [runAlgorithm, setRunAlgorithm] = useState(false);

  const toggleRunAlgorithm = () => {
    setRunAlgorithm(!runAlgorithm);
  };

  return (
    <>
      <div className="app">
        <Nav
          runAlgorithm={runAlgorithm}
          toggleRunAlgorithm={toggleRunAlgorithm}
        ></Nav>
        <div className="container">
          <Grid
            target={"node-5-35"}
            start={"node-9-15"}
            numCols={50}
            numRows={20}
            runAlgorithm={runAlgorithm}
            toggleRunAlgorithm={toggleRunAlgorithm}
          ></Grid>
        </div>
      </div>
    </>
  );
}

export default App;
