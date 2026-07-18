import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const GptMovieSuggestions = () => {
  const searchResults = useSelector((store) => store.gpt.searchResults);

  if (!searchResults || searchResults.length === 0) return null;

  return (
    <div className="px-2 xs:px-4 pb-8">
      <div className="mx-auto">
        <h2 className="text-xl xs:text-2xl md:text-3xl font-bold text-white mb-4 xs:mb-6">
          Search Results
        </h2>
        <div className="flex overflow-x-scroll scrollbar-hide">
          <div className="flex space-x-3 xs:space-x-4 sm:space-x-6">
            {searchResults.map((movie) => (
              <Link to={"/browse/" + movie.id} key={movie.id}>
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
