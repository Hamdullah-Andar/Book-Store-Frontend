import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-4xl mx-auto px-4 py-6 font-primary">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
