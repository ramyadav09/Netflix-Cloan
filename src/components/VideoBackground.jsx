import { useSelector } from "react-redux";
import { useState } from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((Store) => Store.movie?.trailerVideo);
  const [isMuted, setIsMuted] = useState(true);
  useMovieTrailer(movieId);

  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-hidden -z-10">
      <div className="relative w-full h-full">
        {trailerVideo?.key ? (
          <iframe
            key={`${trailerVideo.key}-${isMuted}`}
            className="absolute top-0 left-0 w-full h-full scale-125 object-cover"
            src={
              "https://www.youtube.com/embed/" +
              trailerVideo.key +
              `?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&loop=1&playlist=` +
              trailerVideo.key
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-red-900 flex items-center justify-center">
            <div className="animate-spin">
              <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full"></div>
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent pointer-events-none"></div>
        
        <div className="absolute bottom-8 right-8 z-30">
          {trailerVideo?.key && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="group bg-black/70 hover:bg-black/90 text-white p-5 rounded-full transition-all duration-500 backdrop-blur-xl border-2 border-white/20 hover:border-white/50 hover:scale-110 active:scale-95 shadow-2xl"
            >
              {isMuted ? (
                <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;
