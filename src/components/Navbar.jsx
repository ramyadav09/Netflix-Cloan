import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useSelector } from "react-redux";
import { NET_LOGO } from "../utils/constants";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  
  return (
    <div className="absolute flex justify-between items-center bg-gradient-to-b w-full z-50 px-8 py-4 from-black via-black/80 to-transparent backdrop-blur-sm">
      <img className="w-44 h-auto transition-transform hover:scale-105" src={NET_LOGO} alt="Logo" />
      {user && (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-black/30 rounded-full px-4 py-2 backdrop-blur-md border border-gray-700/50 hover:bg-black/50 transition-all duration-300">
            <img
              className="w-8 h-8 rounded-full ring-2 ring-red-500/50 hover:ring-red-500 transition-all duration-300"
              src={user?.photoURL || "https://avatars.githubusercontent.com/u/145370048?s=48&v=4"}
              alt="Profile"
            />
            <span className="text-white text-sm font-medium hidden sm:block">{user?.displayName || 'User'}</span>
          </div>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/25"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
