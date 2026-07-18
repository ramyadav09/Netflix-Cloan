import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import lang from "../utils/languageConstants";
import { buildOMDbURL } from "../utils/constants";
import { addSearchResults } from "../utils/gptSlice";
import { addMovieDetails } from "../utils/movieSlice";
import { transformOMDbSearchResult } from "../utils/omdbHelpers";

const GptSearchBar = () => {
  const lanKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const handleSearch = async () => {
    const searchQuery = searchText.current.value;
    if (!searchQuery) return;
    
    try {
      // OMDb search by title
      const url = buildOMDbURL({ s: searchQuery, type: "movie" });
      console.log("Searching OMDb:", url);
      const response = await fetch(url);
      const data = await response.json();
      console.log("OMDb Search Response:", data);
      
      if (data.Response === "True" && data.Search) {
        // Transform search results to match TMDB-like structure
        const transformedResults = data.Search.map(transformOMDbSearchResult);
        console.log("Transformed Results:", transformedResults);
        
        // Fetch full details for each movie to get complete information
        const detailedMovies = await Promise.all(
          transformedResults.slice(0, 10).map(async (movie) => {
            try {
              const detailUrl = buildOMDbURL({ i: movie.imdbID, plot: "short" });
              const detailResponse = await fetch(detailUrl);
              const detailData = await detailResponse.json();
              
              if (detailData.Response === "True") {
                dispatch(addMovieDetails(detailData));
                return {
                  ...movie,
                  overview: detailData.Plot !== "N/A" ? detailData.Plot : "",
                  vote_average: detailData.imdbRating !== "N/A" ? parseFloat(detailData.imdbRating) : 0,
                  release_date: detailData.Released !== "N/A" ? detailData.Released : detailData.Year,
                };
              }
              return movie;
            } catch (error) {
              console.error("Error fetching movie details:", error);
              return movie;
            }
          })
        );
        
        console.log("Detailed Movies:", detailedMovies);
        dispatch(addSearchResults(detailedMovies));
      } else {
        // No results found
        console.log("No results found or error:", data.Error);
        dispatch(addSearchResults([]));
      }
    } catch (error) {
      console.error("Search error:", error);
      dispatch(addSearchResults([]));
    }
  };

  return (
    <div className="pt-[10%] pb-8 flex justify-center px-4">
      <form
        className="w-full max-w-4xl flex flex-col md:flex-row gap-3 xs:gap-4 bg-black/80 backdrop-blur-md rounded-2xl p-4 xs:p-5 sm:p-6 shadow-2xl border border-gray-700/50"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="flex-1 bg-gray-900 text-white placeholder-gray-400 p-3 xs:p-3.5 sm:p-4 rounded-xl border border-gray-600 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-300"
          type="text"
          placeholder={lang[lanKey].gptPlaceHolder}
        />
        <button
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 xs:py-3.5 sm:py-4 px-5 xs:px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/25 min-w-[100px] xs:min-w-[120px]"
          onClick={handleSearch}
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4 xs:w-5 xs:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {lang[lanKey].search}
          </span>
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
