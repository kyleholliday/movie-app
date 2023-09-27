// src/SearchResults.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../../styles/SearchResults.scss';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let query = searchParams.get('query');

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const endPoint = 'https://api.themoviedb.org/3/search/multi';

    axios
      .get(endPoint, {
        params: {
          api_key: apiKey,
          language: 'en-US',
          query: query,
          include_adult: false,
        },
      })
      .then((response) => {
        setSearchResults(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  }, [query]);

  const getReleaseYear = (dateString) => {
    if (dateString) {
      const dateParts = dateString.split('-');
      if (dateParts.length === 3) {
        return dateParts[0];
      }
    }
    return 'Release TBD';
  };

  return (
    <div className="container">
      <div className="search-results">
        <p className="search-results-for col-md-7 offset-md-2">
          {searchResults.length < 1 ? (
            <>No search results for "{query}"</>
          ) : (
            <>Search results for "{query}"</>
          )}
        </p>
        <div className="row">
          <ul>
            {searchResults.map((movie) => (
              <li key={movie.id}>
                <div className="col-3 col-md-2 offset-md-2 image-holder">
                  {movie.title && (
                    <a href={`/movie/${movie.id}`}>
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : '/nope.png'
                        }
                        alt={movie.title}
                        className="img-fluid"
                      />
                    </a>
                  )}
                  {movie.name && (
                    <a href={`/show/${movie.id}`}>
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : '/nope.png'
                        }
                        alt={movie.title}
                        className="img-fluid"
                      />
                    </a>
                  )}
                </div>
                <div className="col-8 col-md-5">
                  <h3>
                    {movie.title && (
                      <a className="card-title" href={`/movie/${movie.id}`}>
                        {movie.title}
                      </a>
                    )}
                    {movie.name && (
                      <a className="card-title" href={`/show/${movie.id}`}>
                        {movie.name}
                      </a>
                    )}
                  </h3>
                  <p className="release-and-type">
                    {movie.title && <>Movie </>}
                    {movie.release_date && (
                      <span className="release-and-type">
                        - {getReleaseYear(movie.release_date)}
                      </span>
                    )}
                    {movie.name && <>TV Show </>}
                    {movie.first_air_date && (
                      <span className="release-and-type">
                        - {getReleaseYear(movie.first_air_date)}
                      </span>
                    )}
                  </p>
                  {/* <p className="release-year">
                  {movie.release_date && (
                    <span>{getReleaseYear(movie.release_date)}</span>
                  )}
                  {movie.name && (
                    <span>{movie.first_air_date.split('-')[0]} </span>
                  )}
                </p> */}
                  <p className="overview d-none d-sm-block">{movie.overview}</p>
                  {/* Add more details or links as needed */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
