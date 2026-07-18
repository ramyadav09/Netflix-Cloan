export const NET_LOGO =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";
export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/0b0dad79-ad4d-42b7-b779-8518da389976/web/IN-en-20250908-TRIFECTA-perspective_0647b106-80e1-4d25-9649-63099752b49a_large.jpg";

// OMDb API Configuration
export const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || "your_omdb_api_key_here";
export const OMDB_BASE_URL = "https://www.omdbapi.com/";

// Helper function to build OMDb URL
export const buildOMDbURL = (params) => {
  const urlParams = new URLSearchParams({
    apikey: OMDB_API_KEY,
    ...params,
  });
  return `${OMDB_BASE_URL}?${urlParams.toString()}`;
};

export const SUPPORTED_LANG = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "nepali", name: "Nepali" },
];

// Now Playing - Recent blockbusters, trending movies & series (2023-2025)
export const NOW_PLAYING_TITLES = [
  // Recent Movies
  "Oppenheimer", "Barbie", "Dune Part Two", "Deadpool 3", "Inside Out 2",
  "Guardians of the Galaxy Vol. 3", "Spider-Man Across the Spider-Verse",
  "The Batman", "Top Gun Maverick", "Avatar The Way of Water",
  "John Wick Chapter 4", "Mission Impossible Dead Reckoning",
  "Fast X", "Aquaman and the Lost Kingdom", "The Flash",
  "Ant-Man and the Wasp Quantumania", "Creed III", "Scream VI",
  // Popular Series
  "Breaking Bad", "Game of Thrones", "Stranger Things", "The Last of Us",
  "Wednesday", "The Mandalorian", "House of the Dragon", "The Witcher",
  "The Boys", "Succession", "The Crown", "Peaky Blinders"
];

// Popular Movies & Series - All-time popular and trending
export const POPULAR_MOVIE_TITLES = [
  // Marvel & DC
  "Avengers Endgame", "The Dark Knight", "Infinity War", "Spider-Man No Way Home",
  "Black Panther", "Iron Man", "Captain America Civil War", "The Avengers",
  "Thor Ragnarok", "Doctor Strange", "Shang-Chi", "Eternals",
  "Black Widow", "The Suicide Squad", "Wonder Woman", "Aquaman",
  "Joker", "Man of Steel", "Batman Begins", "Justice League",
  // Popular Series
  "Money Heist", "Squid Game", "Dark", "Narcos", "The Office",
  "Friends", "How I Met Your Mother", "Brooklyn Nine-Nine",
  "Sherlock", "The Walking Dead", "Vikings", "Prison Break",
  // Anime
  "Attack on Titan", "Death Note", "Demon Slayer", "One Punch Man",
  "My Hero Academia", "Naruto", "One Piece", "Dragon Ball Z"
];

// Top Rated - Classic and critically acclaimed movies & series
export const TOP_RATED_TITLES = [
  // Classic Movies
  "The Shawshank Redemption", "The Godfather", "The Dark Knight",
  "12 Angry Men", "Schindler's List", "The Lord of the Rings The Return of the King",
  "Pulp Fiction", "Forrest Gump", "Fight Club", "Inception",
  "The Matrix", "Goodfellas", "The Silence of the Lambs",
  "Saving Private Ryan", "The Green Mile", "Life is Beautiful",
  "Se7en", "The Usual Suspects", "Léon The Professional", "Interstellar",
  // Top Rated Series
  "Breaking Bad", "Band of Brothers", "Chernobyl", "The Wire",
  "True Detective", "Fargo", "Better Call Saul", "The Sopranos",
  "Mad Men", "Mindhunter", "Ozark", "Westworld"
];

// Upcoming - Recent releases and anticipated movies & series
export const UPCOMING_TITLES = [
  // Upcoming Movies
  "Dune Part Three", "Avengers Secret Wars", "Fantastic Four",
  "Blade", "Captain America Brave New World", "Thunderbolts",
  "The Marvels", "Deadpool and Wolverine", "Venom 3",
  "Kraven the Hunter", "Madame Web", "Joker Folie à Deux",
  "Beetlejuice 2", "Gladiator 2", "Wicked", "Moana 2",
  "Snow White", "The Little Mermaid", "Peter Pan and Wendy",
  // Recent Series
  "The Last of Us", "House of the Dragon", "The Rings of Power",
  "Andor", "Ahsoka", "Loki", "Secret Invasion", "Echo"
];

// Action - Action-packed movies & series
export const ACTION_TITLES = [
  // Action Movies
  "John Wick", "Mad Max Fury Road", "The Raid", "Die Hard",
  "Terminator 2", "The Bourne Identity", "Mission Impossible",
  "Casino Royale", "Skyfall", "No Time to Die", "Extraction",
  "The Equalizer", "Atomic Blonde", "Baby Driver", "Kingsman",
  // Action Series
  "Jack Ryan", "Reacher", "24", "Strike Back", "Banshee"
];

// Thriller - Suspense and thriller content
export const THRILLER_TITLES = [
  // Thriller Movies
  "Gone Girl", "Shutter Island", "Prisoners", "Zodiac",
  "The Departed", "No Country for Old Men", "The Prestige",
  "Memento", "The Sixth Sense", "The Others", "Parasite",
  "Get Out", "Us", "A Quiet Place", "Don't Breathe",
  // Thriller Series
  "Mindhunter", "True Detective", "Hannibal", "Dexter", "You"
];

// Comedy - Comedy movies & series
export const COMEDY_TITLES = [
  // Comedy Movies
  "The Hangover", "Superbad", "Step Brothers", "Anchorman",
  "Bridesmaids", "21 Jump Street", "Tropic Thunder",
  "Borat", "The Grand Budapest Hotel", "Knives Out",
  "Deadpool", "Thor Ragnarok", "Guardians of the Galaxy",
  // Comedy Series
  "The Office", "Parks and Recreation", "Brooklyn Nine-Nine",
  "Community", "Arrested Development", "It's Always Sunny in Philadelphia",
  "Modern Family", "Schitt's Creek", "Ted Lasso"
];

// Sci-Fi - Science Fiction content
export const SCI_FI_TITLES = [
  // Sci-Fi Movies
  "Blade Runner 2049", "Arrival", "Ex Machina", "The Martian",
  "Gravity", "Interstellar", "Tenet", "Edge of Tomorrow",
  "District 9", "Children of Men", "Inception", "The Matrix",
  "Dune", "Avatar", "Star Wars", "Star Trek",
  // Sci-Fi Series
  "Black Mirror", "Westworld", "The Expanse", "Altered Carbon",
  "Foundation", "Raised by Wolves", "Severance"
];

// Horror - Horror movies & series
export const HORROR_TITLES = [
  "The Conjuring", "Hereditary", "Get Out", "A Quiet Place",
  "It", "The Shining", "The Exorcist", "Sinister",
  "Insidious", "The Ring", "Paranormal Activity", "Saw",
  "The Haunting of Hill House", "American Horror Story", "The Walking Dead"
];

// Drama - Drama content
export const DRAMA_TITLES = [
  "The Shawshank Redemption", "Forrest Gump", "The Green Mile",
  "A Beautiful Mind", "Good Will Hunting", "The Pursuit of Happyness",
  "12 Years a Slave", "Moonlight", "Manchester by the Sea",
  "Breaking Bad", "Mad Men", "The Crown", "This Is Us"
];

// Romance - Romantic movies & series
export const ROMANCE_TITLES = [
  "The Notebook", "Titanic", "La La Land", "Pride and Prejudice",
  "Before Sunrise", "Eternal Sunshine of the Spotless Mind",
  "500 Days of Summer", "Crazy Rich Asians", "To All the Boys",
  "Bridgerton", "Outlander", "Emily in Paris", "Virgin River"
];

// Animation - Animated movies & series
export const ANIMATION_TITLES = [
  "Toy Story", "Finding Nemo", "The Lion King", "Up", "WALL-E",
  "Inside Out", "Coco", "Moana", "Frozen", "Zootopia",
  "Spider-Man Into the Spider-Verse", "How to Train Your Dragon",
  "Arcane", "Invincible", "Love Death and Robots", "BoJack Horseman"
];

// Documentary - Documentaries
export const DOCUMENTARY_TITLES = [
  "Planet Earth", "Blue Planet", "Our Planet", "Cosmos",
  "The Social Dilemma", "Making a Murderer", "Tiger King",
  "Free Solo", "Won't You Be My Neighbor", "13th"
];

// Indian/Bollywood Content
export const INDIAN_TITLES = [
  "3 Idiots", "Dangal", "PK", "Bajrangi Bhaijaan", "Lagaan",
  "Taare Zameen Par", "Zindagi Na Milegi Dobara", "Dil Chahta Hai",
  "Rang De Basanti", "Swades", "Chak De India", "Queen",
  "Sacred Games", "Delhi Crime", "Mirzapur", "Paatal Lok",
  "Scam 1992", "Family Man", "Made in Heaven", "Panchayat"
];

// Korean Content
export const KOREAN_TITLES = [
  "Parasite", "Train to Busan", "Oldboy", "The Handmaiden",
  "Memories of Murder", "Burning", "The Wailing",
  "Squid Game", "Kingdom", "Crash Landing on You", "Vincenzo",
  "Itaewon Class", "My Name", "Hellbound", "All of Us Are Dead"
];

// For backward compatibility
export const POPULAR_MOVIE_TITLES_LEGACY = NOW_PLAYING_TITLES;
