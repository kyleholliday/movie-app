import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NowPlayingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    // const currentDate = new Date();
    // const endDate = currentDate.toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format

    // currentDate.setDate(currentDate.getDate() - 28);
    // Subtract however many days
    // const startDate = currentDate.toISOString().split('T')[0];
    // Get the date four weeks ago in "YYYY-MM-DD" format

    const endpoint = `https://api.themoviedb.org/3/movie/now_playing`;

    axios
      .get(endpoint, {
        params: {
          api_key: apiKey,
          language: 'en-US',
          region: 'US',
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching the Now Playing movies:', error);
      });
  }, []);

  const firstTwelve = movies.slice(0, 12);

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
    <div className="container top-home-container">
      <div className="heading-container">
        <h3 className="heading">Now Playing</h3>
      </div>

      <ul className="movie-list">
        {firstTwelve.map((movie) => (
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
      <a href="/now-playing" className="see-more">
        See More
      </a>
      <div className="border-bottom-mobile"></div>
    </div>
  );
};

export default NowPlayingMovies;
