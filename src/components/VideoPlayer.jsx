import { useSelector } from "react-redux";
import { useState } from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoPlayer = ({ movieId, isFullScreen = true, onClose }) => {
  const trailerVideo = useSelector((Store) => Store.movie?.trailerVideo);
  const [isMuted, setIsMuted] = useState(true);
  useMovieTrailer(movieId);

  const containerClasses = isFullScreen
    ? "absolute top-0 left-0 w-full h-screen overflow-hidden -z-10"
    : "flex justify-center items-center h-96";

  const iframeClasses = isFullScreen
    ? "absolute top-0 left-0 w-full h-full scale-125 object-cover"
    : "w-full h-full rounded-xl";

  return (
    <div className={containerClasses}>
      <div
        className={
          isFullScreen ? "relative w-full h-full" : "w-3/5 h-96 relative"
        }
      >
        {trailerVideo?.key ? (
          <iframe
            className={iframeClasses}
            src={
              "https://www.youtube.com/embed/" +
              trailerVideo.key +
              (isFullScreen
                ? "?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&loop=1&playlist=" +
                  trailerVideo.key
                : "?autoplay=1&mute=1&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1")
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full bg-gray-800 rounded-xl flex items-center justify-center">
            <span className="text-white">Loading trailer...</span>
          </div>
        )}

        {isFullScreen && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent pointer-events-none"></div>
          </>
        )}
        
        {!isFullScreen && onClose && (
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 z-30 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
