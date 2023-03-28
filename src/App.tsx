import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Board from "./components/Board";
import Nav from "./components/Nav";

// Here I am using the App component as an intermediary between
// the other components and main.tsx
function App() {
  return (
    <>
      <div className="container">
        <Nav></Nav>
        <Board></Board>
      </div>
    </>
  );
}

export default App;
