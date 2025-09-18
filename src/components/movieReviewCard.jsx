import React, { useState } from "react";
import MovieReviewDetails from "./movieReviewDetails";
import VideoPlayer from "./VideoPlayer";
import { Link, useParams } from "react-router-dom";
import useMovieReview from "../hooks/useMovieReview";
const MovieReviewCard = () => {
  const { resId } = useParams();
  useMovieReview(resId);
  const [isTrailer, setIsTrailer] = useState(false);

  const handleTrailerPlaying = () => {
    setIsTrailer(!isTrailer);
  };

  return (
    <div className="relative ">
      <MovieReviewDetails resId={resId} handleTrailer={handleTrailerPlaying} />
      {isTrailer && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-96 z-10">
          <VideoPlayer 
            movieId={resId} 
            isFullScreen={false} 
            onClose={() => setIsTrailer(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MovieReviewCard;
