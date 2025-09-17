import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import js from "@eslint/js";
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GPTSearch from "./GPTSearch";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div className="overflow-y-scroll scrollbar-hide">
      <Header />
      {showGptSearch ? (
        <GPTSearch />
      ) : (
        <>
          <MainContainer />
          <div className="relative z-10 bg-transparent mt-[100vh]">
            <SecondaryContainer />
          </div>
        </>
      )}
    </div>
  );
};

export default Browse;
