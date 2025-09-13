import Navbar from "./components/Navbar";
import Browse from "./components/Browse";
import Body from "./components/Body";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
