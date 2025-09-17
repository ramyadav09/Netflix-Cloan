import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { NET_LOGO, SUPPORTED_LANG } from "../utils/constants";
import { addSearchResults, toggleGptSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleGptSearch = () => {
    if (showGptSearch) {
      dispatch(addSearchResults(null));
    }
    dispatch(toggleGptSearch());
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="fixed flex justify-between items-center bg-gradient-to-b w-full z-50 px-2 sm:px-4 md:px-6 lg:px-8 py-1 sm:py-2 md:py-3 lg:py-4 from-black via-black/80 to-transparent backdrop-blur-sm top-0">
      <img
        className="w-24 xs:w-28 sm:w-32 md:w-36 lg:w-44 h-auto transition-transform hover:scale-105"
        src={NET_LOGO}
        alt="Logo"
      />
      {user && (
        <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-3 md:space-x-4">
          {showGptSearch && (
            <select
              onChange={handleLanguageChange}
              className="bg-black/60 text-white border border-gray-600 rounded-lg px-1 xs:px-2 sm:px-2 md:px-3 py-0.5 xs:py-1 sm:py-1 md:py-2 text-xs sm:text-xs md:text-sm font-medium hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 cursor-pointer backdrop-blur-md"
            >
              {SUPPORTED_LANG.map((lan) => (
                <option
                  key={lan.identifier}
                  value={lan.identifier}
                  className="bg-black text-white"
                >
                  {lan.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearch}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium px-1 xs:px-2 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/25 backdrop-blur-md border border-purple-500/30"
          >
            <span className="flex items-center gap-0.5 xs:gap-1 sm:gap-1.5 md:gap-2">
              <svg
                className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span className="text-xs xs:text-xs sm:text-sm md:text-sm hidden xs:inline">
                {showGptSearch ? "Home" : "GPT"}
              </span>
              <span className="text-xs xs:text-xs sm:text-sm md:text-sm hidden sm:inline">
                {showGptSearch ? "HomePage" : "GPT Search"}
              </span>
            </span>
          </button>
          <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-2 md:space-x-3 bg-black/30 rounded-full px-1 xs:px-2 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 backdrop-blur-md border border-gray-700/50 hover:bg-black/50 transition-all duration-300">
            <img
              className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full ring-1 xs:ring-2 ring-red-500/50 hover:ring-red-500 transition-all duration-300"
              src={
                user?.photoURL ||
                "https://avatars.githubusercontent.com/u/145370048?s=48&v=4"
              }
              alt="Profile"
            />
            <span className="text-white text-xs xs:text-xs sm:text-sm md:text-sm font-medium hidden sm:block">
              {user?.displayName || "User"}
            </span>
          </div>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-1 xs:px-2 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 text-xs xs:text-xs sm:text-sm md:text-sm rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/25"
            onClick={handleSignOut}
          >
            <span className=" xs:inline">Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
