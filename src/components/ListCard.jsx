import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromList } from "../utils/listSlice";
import { IMG_CDN_URL } from "../utils/constants";

const ListCard = ({ movie }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromList(movie.id));
  };

  return (
    <div className="relative group bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      <Link to={`/browse/${movie.id}`}>
        <img
          src={IMG_CDN_URL + movie.poster_path}
          alt={movie.title}
          className="w-full h-64 object-cover"
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
          {movie.release_date?.slice(0, 4)}
        </p>
      </div>
    </div>
  );
};

export default ListCard;
