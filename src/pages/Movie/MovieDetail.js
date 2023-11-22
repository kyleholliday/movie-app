import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../../styles/MovieDetail.scss';

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [usProviders, setUsProviders] = useState(null);
  const [collection, setCollection] = useState(null);
  const [displaySection, setDisplaySection] = useState('cast');

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const endpoint = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits%2Csimilar%2Cvideos%2Cimages`;
    const providersEndpoint = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`;
    window.scrollTo(0, 0);

    axios
      .get(endpoint, {
        params: {
          api_key: apiKey,
        },
      })
      .then((response) => {
        setMovie(response.data);
        document.title = response.data.title;
        if (response.data.belongs_to_collection) {
          const collectionId = response.data.belongs_to_collection.id;
          const collectionEndpoint = `https://api.themoviedb.org/3/collection/${collectionId}`;
          axios
            .get(collectionEndpoint, {
              params: { api_key: apiKey },
            })
            .then((collectionResponse) => {
              setCollection(collectionResponse.data);
            })
            .catch((error) => {
              console.error('Error fetching Collection Details:', error);
            });
        }
        // Check if cast exists and has elements
        if (response.data.credits && response.data.credits.cast.length > 0) {
          // Cast exists and has elements, set display section to 'cast'
          setDisplaySection('cast');
        } else {
          // Cast doesn't exist or is empty, set display section to 'crew'
          setDisplaySection('crew');
        }
      })
      .catch((error) => {
        console.error('Error fetching Movie Details:', error);
      });

    axios
      .get(providersEndpoint, {
        params: {
          api_key: apiKey,
        },
      })
      .then((response) => {
        const usData = response.data.results.US;
        setUsProviders(usData);
      })
      .catch((error) => {
        console.error('Error fetching Watch Providers', error);
      });
  }, [movieId]);

  // Getting the year of the movie
  const getReleaseYear = (dateString) => {
    if (dateString) {
      const dateParts = dateString.split('-');
      if (dateParts.length === 3) {
        return dateParts[0];
      }
    }
    return 'Release TBD';
  };

  // Getting the runtime in hours and minutes, not just minutes
  function timeConverter(minutesString) {
    const totalMinutes = parseInt(minutesString, 10);

    if (isNaN(totalMinutes)) {
      return 'Invalid input';
    }

    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    let formattedTime =
      hours > 0 ? `${hours} hour${hours === 1 ? '' : 's'}` : '';

    if (remainingMinutes > 0) {
      formattedTime +=
        hours > 0
          ? ` ${remainingMinutes} minute${remainingMinutes === 1 ? '' : 's'}`
          : `${remainingMinutes} minute${remainingMinutes === 1 ? '' : 's'}`;
    }

    return formattedTime;
  }

  const findLastTrailerByName = () => {
    if (!movie || !movie.videos.results) return null;

    const matchingVideos = movie.videos.results.filter(
      (video) =>
        video.name.toLowerCase().includes('main trailer') ||
        video.name.toLowerCase().includes('official trailer') ||
        video.name.toLowerCase().includes('official us trailer') ||
        video.name.toLowerCase().includes('original theatrical') ||
        video.name.toLowerCase().includes('theatrical trailer') ||
        video.name.toLowerCase().includes('trailer 1')
    );

    return matchingVideos.length > 0
      ? matchingVideos[matchingVideos.length - 1]
      : movie.videos[movie.videos.length - 1];
  };

  const trailerLink =
    findLastTrailerByName('main trailer') ||
    findLastTrailerByName('official trailer') ||
    findLastTrailerByName('official us trailer') ||
    findLastTrailerByName('original theatrical') ||
    findLastTrailerByName('theatrical trailer') ||
    findLastTrailerByName('trailer 1');

  if (!movie) {
    return <div>Loading...</div>;
  }

  // Function to filter crew members by job
  const filterCrewByJob = (job) =>
    movie.credits.crew.filter(
      (crewMember) => crewMember.job && crewMember.job.toLowerCase() === job
    );

  const handleSectionClick = (section) => {
    setDisplaySection(section);
  };

  console.log(movie);
  console.log(collection);

  return (
    <div className="container">
      {/* {movie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
        />
      )} */}
      {/* {movie.images && movie.images.backdrops.length > 0 && (
        <div className="backdrops">
          {movie.images.backdrops.map((backdrop, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w1280${backdrop.file_path}`}
              alt={`Backdrop ${index + 1}`}
            />
          ))}
        </div>
      )} */}
      <div className="full-movie-container">
        <div className="row mobile-container">
          <div className="left-mobile col-7 d-block d-sm-none">
            <h1 className="title">{movie.title}</h1>
            <p className="year">
              {getReleaseYear(movie.release_date)} &#8226; Directed by
            </p>
            {movie.credits.crew.some(
              (crewMember) => crewMember.job.toLowerCase() === 'director'
            ) ? (
              <p>
                {movie.credits.crew
                  .filter(
                    (crewMember) => crewMember.job.toLowerCase() === 'director'
                  )
                  .map((director, index, array) => (
                    <span key={director.id}>
                      <Link
                        to={`/director-films/${director.id}`}
                        className="director"
                      >
                        {director.name}
                      </Link>
                      {index < array.length - 1 ? ', ' : ''}
                    </span>
                  ))}
              </p>
            ) : (
              <p>Director information is unavailable</p>
            )}
            {trailerLink && (
              <div className="button-holder">
                <a
                  href={`https://www.youtube.com/watch?v=${trailerLink.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="main-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-play-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                  </svg>
                  Trailer
                </a>
                <p>{movie.runtime} mins</p>
              </div>
            )}
          </div>
          <div className="right-mobile col-5 d-block d-sm-none">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/nope.png'
              }
              alt={movie.title}
              className="img-fluid"
            />
          </div>
          <div className="left-side col-10 offset-1 col-md-5 offset-md-0 col-lg-3 offset-lg-1 d-none d-sm-block">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : '/nope.png'
              }
              alt={movie.title}
              className="img-fluid"
            />
            {trailerLink && (
              <div className="button-holder">
                <a
                  href={`https://www.youtube.com/watch?v=${trailerLink.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="main-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-play-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                  </svg>
                  Play Trailer
                </a>
              </div>
            )}
          </div>
          <div className="right-side col-12 col-md-6">
            <h1 className="title d-none d-sm-block">{movie.title}</h1>
            <p className="d-none d-sm-block">
              {getReleaseYear(movie.release_date)}
            </p>
            {movie.credits.crew.some(
              (crewMember) => crewMember.job.toLowerCase() === 'director'
            ) ? (
              <p className="d-none d-sm-block">
                Directed by{' '}
                {movie.credits.crew
                  .filter(
                    (crewMember) => crewMember.job.toLowerCase() === 'director'
                  )
                  .map((director, index, array) => (
                    <span key={director.id}>
                      <Link
                        to={`/director-films/${director.id}`}
                        className="director"
                      >
                        {director.name}
                      </Link>
                      {index < array.length - 1 ? ', ' : ''}
                    </span>
                  ))}
              </p>
            ) : (
              <p>Director information is unavailable</p>
            )}
            <h4 className="tagline">{movie.tagline}</h4>
            <p className="overview">{movie.overview}</p>
            <ul className="nav nav-tabs details-tabs">
              {movie.credits.cast.length > 0 && (
                <li className="nav-item">
                  <button
                    href="#"
                    onClick={() => handleSectionClick('cast')}
                    className={`${
                      displaySection === 'cast' ? 'active' : ''
                    } nav-link `}
                  >
                    Cast
                  </button>
                </li>
              )}

              <li className="nav-item">
                <button
                  onClick={() => handleSectionClick('crew')}
                  className={`${
                    displaySection === 'crew' ? 'active' : ''
                  } nav-link `}
                >
                  Crew
                </button>
              </li>
            </ul>
            {movie.credits.cast.length > 0 && displaySection === 'cast' && (
              <ul className="cast-list details-holder">
                {movie.credits.cast.slice(0, 20).map((castMember) => (
                  <li key={castMember.id}>
                    {castMember.character ? (
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-${castMember.id}`}>
                            {castMember.character}
                          </Tooltip>
                        }
                        delay={{ show: 300, hide: 0 }}
                      >
                        <Link to={`/actor/${castMember.id}`}>
                          {castMember.name}
                        </Link>
                      </OverlayTrigger>
                    ) : (
                      <Link to={`/actor/${castMember.id}`}>
                        {castMember.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {movie.credits.crew.length > 0 && displaySection === 'crew' && (
              <div className="crew-grid details-holder">
                {filterCrewByJob('director').length > 0 && (
                  <div className="crew-category">
                    <p className="job">
                      <span>
                        Director{filterCrewByJob('director').length > 1 && 's'}
                      </span>
                    </p>
                    <div className="name-container">
                      {filterCrewByJob('director').map((director) => (
                        <div key={director.id} className="crew-member">
                          {director.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {filterCrewByJob('screenplay').length > 0 && (
                  <div className="crew-category">
                    <p className="job">
                      <span>
                        Writer{filterCrewByJob('screenplay').length > 1 && 's'}
                      </span>
                    </p>
                    <div className="name-container">
                      {filterCrewByJob('screenplay').map((screenplay) => (
                        <div key={screenplay.id} className="crew-member">
                          {screenplay.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {filterCrewByJob('writer').length > 0 && (
                  <div className="crew-category">
                    <p className="job">
                      <span>
                        Writer{filterCrewByJob('writer').length > 1 && 's'}
                      </span>
                    </p>
                    <div className="name-container">
                      {filterCrewByJob('writer').map((screenplay) => (
                        <div key={screenplay.id} className="crew-member">
                          {screenplay.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {filterCrewByJob('executive producer').length > 0 && (
                  <div className="crew-category">
                    <p className="job">
                      <span>
                        Executive Producer
                        {filterCrewByJob('executive producer').length > 1 &&
                          's'}
                      </span>
                    </p>
                    <div className="name-container">
                      {filterCrewByJob('executive producer').map(
                        (executiveProducer) => (
                          <div
                            key={executiveProducer.id}
                            className="crew-member"
                          >
                            {executiveProducer.name}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
                {filterCrewByJob('producer').length > 0 && (
                  <div className="crew-category">
                    <p className="job">
                      <span>
                        Producer{filterCrewByJob('producer').length > 1 && 's'}
                      </span>
                    </p>
                    <div className="name-container">
                      {filterCrewByJob('producer').map((producer) => (
                        <div key={producer.id} className="crew-member">
                          {producer.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {filterCrewByJob('director of photography').length > 0 && (
                  <div className="crew-category">
                    <p className="job">
                      <span>Cinematography</span>
                    </p>
                    <div className="name-container">
                      {filterCrewByJob('director of photography').map(
                        (directorOfPhotography) => (
                          <div
                            key={directorOfPhotography.id}
                            className="crew-member"
                          >
                            {directorOfPhotography.name}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
                {filterCrewByJob('original music composer').length > 0 && (
                  <div className="crew-category">
                    <p className="job">
                      <span>
                        Composer
                        {filterCrewByJob('original music composer').length >
                          1 && 's'}
                      </span>
                    </p>
                    <div className="name-container">
                      {filterCrewByJob('original music composer').map(
                        (composer) => (
                          <div key={composer.id} className="crew-member">
                            {composer.name}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="us-providers">
              {usProviders && usProviders.flatrate && (
                <>
                  <p>Stream On:</p>
                  <ul>
                    {/* You can map through the flatrate providers and display them here */}
                    {usProviders.flatrate.map((provider) => (
                      <li key={provider.provider_id}>
                        <img
                          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                          alt={provider.provider_name}
                        />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <p>{timeConverter(movie.runtime)}</p>
            {movie.genres.length > 0 && (
              <div className="genres">
                <p>Genre</p>
                <ul>
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {collection && (
              <>
                <p>Related Films:</p>
                <ul className="collection">
                  {collection.parts.map((collectionMovie) => (
                    <li key={collectionMovie.id}>
                      <a href={`/movie/${collectionMovie.id}`}>
                        <img
                          src={
                            collectionMovie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${collectionMovie.poster_path}`
                              : '/nope.png'
                          }
                          alt={collectionMovie.title}
                        />
                        <div className="overlay">
                          <p className="overlay-text">
                            {collectionMovie.title}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
