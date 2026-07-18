import { useDispatch, useSelector } from "react-redux";
import { addImdbMovieDetails } from "../utils/imdbSlice";
import { useEffect } from "react";
import { buildOMDbURL } from "../utils/constants";

const useImdbMovieDetails = (imdbId) => {
  const dispatch = useDispatch();
  const imdbDetails = useSelector((store) => store.imdb.movieDetails);

  useEffect(() => {
    if (!imdbId) return;

    // Check if we already have the data for this movie
    if (imdbDetails && imdbDetails.imdbID === imdbId) return;

    const fetchImdbDetails = async () => {
      try {
        // Fetch full movie details from OMDb using IMDb ID
        const url = buildOMDbURL({ i: imdbId, plot: "full" });
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.Response === "True") {
          // Transform OMDb data to match the expected structure
          const transformedData = {
            id: data.imdbID,
            imdbID: data.imdbID,
            title: data.Title,
            plot: data.Plot,
            rating: {
              aggregateRating: data.imdbRating !== "N/A" ? parseFloat(data.imdbRating) : null,
              voteCount: data.imdbVotes !== "N/A" ? parseInt(data.imdbVotes.replace(/,/g, "")) : 0,
            },
            metacritic: data.Metascore !== "N/A" ? {
              score: parseInt(data.Metascore),
              reviewCount: 0, // OMDb doesn't provide review count
            } : null,
            runtimeSeconds: data.Runtime !== "N/A" ? parseInt(data.Runtime) * 60 : null,
            genres: data.Genre !== "N/A" ? data.Genre.split(", ") : [],
            directors: data.Director !== "N/A" ? data.Director.split(", ").map((name, index) => ({
              id: `dir-${index}`,
              displayName: name,
              primaryProfessions: ["Director"],
            })) : [],
            stars: data.Actors !== "N/A" ? data.Actors.split(", ").map((name, index) => ({
              id: `actor-${index}`,
              displayName: name,
              primaryProfessions: ["Actor"],
            })) : [],
            spokenLanguages: data.Language !== "N/A" ? data.Language.split(", ").map((lang) => ({
              name: lang,
            })) : [],
            originCountries: data.Country !== "N/A" ? data.Country.split(", ").map((country) => ({
              name: country,
            })) : [],
            type: data.Type,
            startYear: data.Year,
            rated: data.Rated,
            released: data.Released,
            writer: data.Writer,
            awards: data.Awards,
            poster: data.Poster,
            boxOffice: data.BoxOffice,
          };
          
          dispatch(addImdbMovieDetails(transformedData));
        } else {
          console.error("Movie not found in OMDb:", data.Error);
        }
      } catch (error) {
        console.error("Failed to fetch OMDb movie details:", error);
      }
    };

    fetchImdbDetails();
  }, [imdbId, dispatch]);
};

export default useImdbMovieDetails;
