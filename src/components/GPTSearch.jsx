import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";
const GPTSearch = () => {
  return (
    <div className="min-h-screen">
      <div className="absolute -z-10 w-full h-full">
        <img className="w-full h-full object-cover" src={BG_URL} alt="Background" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GPTSearch;
