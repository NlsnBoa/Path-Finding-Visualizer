import "./App.css";
import Grid from "./components/Grid";
import Nav from "./components/Nav";

// Here I am using the App component as an intermediary between
// the other components and main.tsx
function App() {
  return (
    <>
      <div className="app">
        <Nav></Nav>
        <div className="container">
          <Grid
            target={"node-5-35"}
            start={"node-9-15"}
            numCols={50}
            numRows={20}
          ></Grid>
        </div>
      </div>
    </>
  );
}

export default App;
