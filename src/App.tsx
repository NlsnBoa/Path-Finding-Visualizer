import "./App.css";
import Grid from "./components/Grid";
import Nav from "./components/Nav";

// Here I am using the App component as an intermediary between
// the other components and main.tsx
function App() {
  return (
    <>
      <div className="container">
        <Nav></Nav>
        <Grid numCols={30} numRows={30}></Grid>
      </div>
    </>
  );
}

export default App;
