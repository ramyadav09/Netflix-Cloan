const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute bottom-8 xs:bottom-16 sm:bottom-24 md:bottom-32 left-4 xs:left-6 sm:left-8 md:left-12 z-20 max-w-[85vw] xs:max-w-lg sm:max-w-xl md:max-w-lg">
      <div className="p-3 xs:p-4 sm:p-5 md:p-6">
        <div className="space-y-2 xs:space-y-3 sm:space-y-4">
          <div className="space-y-1 xs:space-y-2">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-2xl">
              {title}
            </h1>
            <div className="w-8 xs:w-10 sm:w-12 h-0.5 bg-red-600 rounded-full shadow-lg shadow-red-500/50"></div>
          </div>
          
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-100 leading-relaxed line-clamp-2 xs:line-clamp-3 font-light drop-shadow-lg">
            {overview}
          </p>
          
          <div className="flex gap-2 xs:gap-3 pt-1 xs:pt-2">
            <button className="group flex items-center gap-1 xs:gap-2 bg-white text-black font-bold text-xs xs:text-sm sm:text-base px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>Play</span>
            </button>
            
            <button className="group flex items-center gap-1 xs:gap-2 bg-gray-700/80 text-white font-semibold text-xs xs:text-sm sm:text-base px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 rounded-lg hover:bg-gray-600/80 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20">
              <svg className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <span>Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
