import React from "react";
import Browse from "./Browse";
import MovieReviewCard from "./movieReviewCard";
import List from "./List";
import Header from "./Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Browse />,
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
