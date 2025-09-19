import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearList } from "../utils/listSlice";
import Header from "./Header";
import ListCard from "./ListCard";

const List = () => {
  const dispatch = useDispatch();
  const listItems = useSelector((store) => store.list.list);

  const handleClearAll = () => {
    dispatch(clearList());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="pt-5 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  My List
                </span>
              </h1>
              <p className="text-gray-400 text-lg">
                {listItems.length} {listItems.length === 1 ? "movie" : "movies"}{" "}
                saved
              </p>
            </div>
            <Link to={"/browse"}>
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                Back
              </button>
            </Link>
          </div>
          {listItems.length === 0 ? (
            <div className="text-center py-24">
              <div className="mb-8">
                <svg
                  className="w-24 h-24 mx-auto text-gray-600 mb-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Your list is empty
                </h2>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                  Start building your personal collection by adding movies you
                  love
                </p>
              </div>
              <Link
                to="/browse"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Movies
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
              {listItems.map((movie, index) => (
                <ListCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}{" "}
          {listItems.length > 0 && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleClearAll}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
                  Clear All
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
