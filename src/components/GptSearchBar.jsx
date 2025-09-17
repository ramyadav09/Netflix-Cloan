import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTION } from "../utils/constants";
import { addSearchResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const lanKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const handleSearch = async () => {
    const searchQuery = searchText.current.value;
    if (!searchQuery) return;
    
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        searchQuery +
        "&include_adult=false&language=en-US&page=1",
      API_OPTION
    );
    const json = await data.json();
    dispatch(addSearchResults(json.results));
  };
  return (
    <div className="pt-[10%] pb-8 flex justify-center px-4">
      <form
        className="w-full max-w-4xl flex flex-col md:flex-row gap-4 bg-black/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-700/50"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="flex-1 bg-gray-900 text-white placeholder-gray-400 p-4 rounded-xl border border-gray-600 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-300"
          type="text"
          placeholder={lang[lanKey].gptPlaceHolder}
        />
        <button
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/25 min-w-[120px]"
          onClick={handleSearch}
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
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
