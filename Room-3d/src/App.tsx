import { OrbitControls } from "@react-three/drei";
import { Model } from "./components/Model";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 2, 5] }}>
        <OrbitControls />
        <ambientLight intensity={1} />
        <Model />
      </Canvas>
    </>
  );
}

export default App;
