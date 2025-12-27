import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ColorModuleDemo from "./color/ColorModuleDemo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ColorModuleDemo />
    </>
  );
}

export default App;
