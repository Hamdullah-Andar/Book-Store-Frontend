import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-4xl mx-auto px-4 py-6 font-primary">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default App;
