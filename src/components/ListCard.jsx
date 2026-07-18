import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromList } from "../utils/listSlice";

const ListCard = ({ movie }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromList(movie.id));
  };

  // Handle poster URL (could be OMDb full URL or TMDB path)
  const posterUrl = movie.poster_path?.startsWith('http') 
    ? movie.poster_path 
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="relative group bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <Link to={`/browse/${movie.id}`}>
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-48 xs:h-56 sm:h-64 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster';
          }}
        />
      </Link>
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        ×
      </button>
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm truncate">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-xs">
          {movie.release_date?.slice(0, 4) || movie.release_date}
        </p>
      </div>
    </div>
  );
};

export default ListCard;
