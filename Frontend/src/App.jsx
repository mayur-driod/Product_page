import "./App.css";
import { Route, Routes } from "react-router-dom";
import Buy from "./buy";
import Navbar from "./components/Navbar";
import Track from "./Track";
import Contact from "./Contact";
import Home from "./Home";
import Dev from "./Dev";
import DevPrivateRoute from "./components/DevPrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/track" element={<Track />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/devs"
          element={
            <DevPrivateRoute>
              <Dev />
            </DevPrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
