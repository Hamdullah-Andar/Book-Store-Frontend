import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orders",
        element: <home />,
      },
      {
        path: "/about",
        element: <h1 className="color-[primary]">About</h1>,
      }
    ],
  },
]);

export default router;
