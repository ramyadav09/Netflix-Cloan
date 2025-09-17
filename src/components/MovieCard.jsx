import React, { useEffect } from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ title, poster_path }) => {
  if (!poster_path) return null;
  return (
    <div className="w-52 xs:w-36 sm:w-40 md:w-44 lg:w-48 flex-shrink-0">
      {" "}
      <img
        src={IMG_CDN_URL + poster_path}
        alt={title}
        className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default MovieCard;
