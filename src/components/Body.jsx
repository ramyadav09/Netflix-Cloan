import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import MovieReviewCard from "./MovieReviewCard";
import List from "./List";
import Header from "./Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/browse/:resId",
      element: <MovieReviewCard />,
    },
    {
      path: "/list",
      element: <List />,
    },
  ]);

  return (
    <div className="b-black">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
