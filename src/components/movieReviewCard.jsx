import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useMovieReview from "../hooks/useMovieReview";
import { IMG_CDN_URL } from "../utils/constants";

const MovieReviewCard = () => {
  const { resId } = useParams();
  useMovieReview(resId);

  const { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies } =
    useSelector((store) => store.movie);
  const searchResults = useSelector((store) => store.gpt.searchResults);
  const reviewResults = useSelector((store) => store.review.reviewId);
  console.log(reviewResults);
  // merge all movie arrays (filter out nulls first)
  const allMovies = [
    ...(nowPlayingMovies || []),
    ...(popularMovies || []),
    ...(topRatedMovies || []),
    ...(upcomingMovies || []),
    ...(searchResults || []),
  ];

  // find movie by id
  const selectedMovie = allMovies.find((m) => String(m.id) === String(resId));

  if (!selectedMovie) {
    return <p className="text-white">No movie found with id: {resId}</p>;
  }

  const { vote_average, poster_path, release_date, title, overview } =
    selectedMovie;
  console.log(reviewResults?.results[0]);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: poster_path
            ? `url(${IMG_CDN_URL + poster_path})`
            : "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        }}
      >
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50"></div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            {/* Movie Poster */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <img
                  className="w-64 sm:w-72 md:w-80 lg:w-96 h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 border-4 border-white/10"
                  src={IMG_CDN_URL + poster_path}
                  alt={title}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Movie Details */}
            <div className="flex-1 max-w-3xl text-center lg:text-left">
              <div className="space-y-6">
                {/* Title and Year */}
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-2">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
                      {title}
                    </span>
                  </h1>
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <span className="text-xl sm:text-2xl text-gray-300 font-light">
                      ({release_date?.slice(0, 4)})
                    </span>
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-lg text-gray-400 font-medium">
                      Movie
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className="text-xxl sm:text-2xl font-semibold text-white">
                    Rating : {vote_average}
                  </h2>
                </div>
                {/* Overview Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <div className="w-12 h-0.5 bg-red-600 rounded-full"></div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      Overview
                    </h2>
                  </div>
                  <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-light max-w-2xl">
                    {overview}
                  </p>
                </div>
                <div className="text-white">
                  {reviewResults?.results[0]?.author && (
                    <div>
                      <h3 className="text-xl font-semibold ">
                        {reviewResults?.results[0]?.author}
                      </h3>
                      <p>Author</p>
                    </div>
                  )}

                  <div>
                    <h3></h3>
                  </div>
                  {/* <div><h3></h3></div> */}
                </div>
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button className="group flex items-center justify-center gap-3 bg-white text-black font-bold text-lg px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Watch Trailer</span>
                  </button>

                  <button className="group flex items-center justify-center gap-3 bg-gray-800/80 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-105 backdrop-blur-md border border-white/20">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span>Add to List</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieReviewCard;
