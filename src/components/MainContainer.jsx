import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoPlayer from "./VideoPlayer";

const MainContainer = () => {
  const movie = useSelector((store) => store.movie?.nowPlayingMovies);
  if (!movie) return;
  const mainMovie = movie[5];
  const { title, overview, id } = mainMovie;
  return (
    <div className="">
      <VideoTitle title={title} overview={overview} />
      <VideoPlayer movieId={id} isFullScreen={true} />
    </div>
  );
};

export default MainContainer;
