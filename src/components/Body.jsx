import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import MovieReviewCard from "./MovieReviewCard";
import Header from "./Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <div className="text-white p-8">Something went wrong. <a href="/" className="text-blue-500">Go back to home</a></div>
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <div className="text-white p-8">Login error. <a href="/" className="text-blue-500">Try again</a></div>
    },
    {
      path: "/browse",
      element: <Browse />,
      errorElement: <div className="text-white p-8">Browse error. <a href="/" className="text-blue-500">Go back</a></div>
    },
    {
      path: "/browse/:resId",
      element: <MovieReviewCard />,
      errorElement: <div className="text-white p-8">Movie not found. <a href="/browse" className="text-blue-500">Back to browse</a></div>
    },
    {
      path: "*",
      element: <Login />,
      errorElement: <div className="text-white p-8">Page not found. <a href="/" className="text-blue-500">Go home</a></div>
    }
  ], {
    basename: "/Netflix-Cloan"
  });

  return (
    <div className="b-black">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
