import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import js from "@eslint/js";
import { useDispatch } from "react-redux";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div className="overflow-y-scroll scrollbar-hide">
      <Header />
      <MainContainer />
      <div className="relative z-10 bg-black mt-[100vh]">
        <SecondaryContainer />
      </div>
    </div>
  );
};

export default Browse;
