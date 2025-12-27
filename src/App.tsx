import "./App.css";
import ColorModuleDemo from "./color/ColorModuleDemo";
import RainbowBackground from "./color/RainbowBackground";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        padding: "20px",
      }}
    >
      <RainbowBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <ColorModuleDemo />
      </div>
    </div>
  );
}

export default App;
