import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movie = useSelector((store) => store.movie?.nowPlayingMovies);
  if (!movie) return;
  const mainMovie = movie[5];
  const { title, overview, id } = mainMovie;
  return (
    <div className="">
      <VideoTitle title={title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
