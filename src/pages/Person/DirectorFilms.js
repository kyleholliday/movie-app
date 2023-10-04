import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/SecondaryPages.scss';
import '../../styles/Person.scss';

const DirectorFilms = () => {
  const { directorId } = useParams();
  const [movieCredits, setMovieCredits] = useState([]);
  const [directorDetails, setDirectorDetails] = useState([]);
  const [showFullBiography, setShowFullBiography] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const movieCreditsEndpoint = `https://api.themoviedb.org/3/person/${directorId}/movie_credits`;
    const directorDetailsEndpoint = `https://api.themoviedb.org/3/person/${directorId}`;
    window.scrollTo(0, 0);

    // Fetch movies they have directed
    axios
      .get(movieCreditsEndpoint, {
        params: {
          api_key: apiKey,
          language: 'en-US',
        },
      })
      .then((response) => {
        // Filter movies where the director has the "Director" job
        const directedMovies = response.data.crew.filter(
          (movie) => movie.job.toLowerCase() === 'director'
        );

        directedMovies.sort((a, b) => b.popularity - a.popularity);

        setMovieCredits(directedMovies);
      })
      .catch((error) => {
        console.error('Error fetching Director Films:', error);
      });

    axios
      .get(directorDetailsEndpoint, {
        params: {
          api_key: apiKey,
          language: 'en-US',
        },
      })
      .then((response) => {
        setDirectorDetails(response.data);
        document.title = `${response.data.name} as Director`;
      })
      .catch((error) => {
        console.error('Error fetching Director Details:', error);
      });
    function handleResize() {
      setIsSmallScreen(window.innerWidth < 768); // Adjust the threshold as needed
    }

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [directorId]); // Add directorId as a dependency

  // Show full biography toggle
  const toggleBio = () => {
    setShowFullBiography(!showFullBiography);
  };

  const getReleaseYear = (dateString) => {
    if (dateString) {
      const dateParts = dateString.split('-');
      if (dateParts.length === 3) {
        return dateParts[0];
      }
    }
    return 'Release TBD';
  };

  // Function to handle sorting
  const handleSort = (selectedOption) => {
    setSortBy(selectedOption);
    const sortedMovies = [...movieCredits];

    if (selectedOption === 'mostRecent') {
      sortedMovies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    } else if (selectedOption === 'earliest') {
      sortedMovies.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      );
    } else if (selectedOption === 'popularity') {
      sortedMovies.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
    }

    setMovieCredits(sortedMovies);
  };

  return (
    <div className="container">
      <div className="person-info row">
        <div className="full-list order-2 order-sm-1 col-sm-9 left-side">
          {movieCredits.length > 0 && (
            <>
              <h1 className="d-none d-sm-block">
                <span>Films Directed by</span> {directorDetails.name}
              </h1>
              <div className="films-and-sort">
                <p>{movieCredits.length} Films</p>
                <div className="sorting-dropdown">
                  <label htmlFor="sort-select">Sort by: </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                  >
                    <option value="popularity">Popularity</option>
                    <option value="mostRecent">Newest First</option>
                    <option value="earliest">Earliest First</option>
                  </select>
                </div>
              </div>
              <ul className="movie-list crew">
                {movieCredits.map((movie) => (
                  <li key={movie.id} className="movie">
                    <a href={`/movie/${movie.id}`}>
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : '/nope.png'
                        }
                        alt={movie.title}
                      />
                      <div className="overlay">
                        <p className="overlay-text">{movie.title}</p>
                        <p className="overlay-text">
                          {getReleaseYear(movie.release_date)}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="col-sm-3 order-1 order-sm-2 right-side">
          {/* <h1>{directorDetails.name}</h1> */}
          <div className="row">
            <h1 className="d-block d-sm-none">
              {directorDetails.name}{' '}
              <span className="as-director">as director</span>
            </h1>
            <div className="col-4 col-sm-12">
              <img
                src={
                  directorDetails.profile_path
                    ? `https://image.tmdb.org/t/p/w500${directorDetails.profile_path}`
                    : '/nope.png'
                }
                alt={directorDetails.name}
                className="img-fluid"
              />
            </div>
            <div className="col-8 col-sm-12">
              <p>
                {directorDetails.biography &&
                  isSmallScreen === false &&
                  (showFullBiography
                    ? directorDetails.biography // Show full biography if toggled
                    : directorDetails.biography.length > 1000
                    ? directorDetails.biography.substring(0, 1000) + '...' // Show truncated biography
                    : directorDetails.biography)}
                {directorDetails.biography &&
                  isSmallScreen &&
                  (showFullBiography
                    ? directorDetails.biography // Show full biography if toggled
                    : directorDetails.biography.length > 140
                    ? directorDetails.biography.substring(0, 140) + '...' // Show truncated biography
                    : directorDetails.biography)}
                {directorDetails.biography &&
                  directorDetails.biography.length > 1000 &&
                  isSmallScreen === false && (
                    <button className="view-more" onClick={toggleBio}>
                      {showFullBiography ? 'View Less' : 'View More'}
                    </button>
                  )}
                {directorDetails.biography &&
                  directorDetails.biography.length > 140 &&
                  isSmallScreen && (
                    <button className="view-more" onClick={toggleBio}>
                      {showFullBiography ? 'View Less' : 'View More'}
                    </button>
                  )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorFilms;
