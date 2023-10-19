import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../../styles/MovieDetail.scss';

const TVDetail = () => {
  const { tvId } = useParams();
  const [show, setShow] = useState(null);
  const [usProviders, setUsProviders] = useState(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const endpoint = `https://api.themoviedb.org/3/tv/${tvId}?append_to_response=videos%2Ccredits%2Cimages`;
    window.scrollTo(0, 0);

    axios
      .get(endpoint, {
        params: {
          api_key: apiKey,
        },
      })
      .then((response) => {
        setShow(response.data);
        document.title = response.data.name;
      })
      .catch((error) => {
        console.error('Error fetching Show Details', error);
      });

    const providersEndpoint = `https://api.themoviedb.org/3/tv/${tvId}/watch/providers`;
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
  }, [tvId]);

  const findTrailers = () => {
    if (!show || !show.videos.results) return null;

    const trailerSort = show.videos.results.filter((video) =>
      video.type.toLowerCase().includes('trailer')
    );

    const trailerOne = trailerSort.filter(
      (trailer) =>
        trailer.name.toLowerCase().includes('main trailer') ||
        trailer.name.toLowerCase().includes('official trailer') ||
        trailer.name.toLowerCase().includes('official us trailer') ||
        trailer.name.toLowerCase().includes('official redband trailer')
    );

    return trailerOne.length > 0
      ? trailerOne[trailerOne.length - 1]
      : show.videos[show.videos.length - 1];
  };

  const trailerOne =
    findTrailers('main trailer') ||
    findTrailers('official trailer') ||
    findTrailers('official us trailer') ||
    findTrailers('official red band trailer');

  if (!show) {
    return <div>Loading...</div>;
  }

  // const percentage = Math.round(show.vote_average * 10);
  // function percentageColor(percentage) {
  //   if (percentage >= 70) {
  //     return 'green';
  //   } else if (percentage >= 50) {
  //     return 'yellow';
  //   } else {
  //     return 'red';
  //   }
  // }

  console.log(show);

  return (
    <div className="container">
      {/* {show.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/w1280${show.backdrop_path}`}
          alt={`${show.title} backdrop`}
        />
      )} */}
      {/* {show.images && show.images.backdrops.length > 0 && (
        <div className="backdrops">
          {show.images.backdrops.map((backdrop, index) => (
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
            <h1 className="title">{show.name}</h1>
            {show.status.toLowerCase() === 'returning series' && (
              <p className="returning-series">Ongoing Series</p>
            )}
            <p>
              {/* first air date year  */}
              {show.first_air_date && show.first_air_date.split('-')[0]}

              {show.status && (
                <>
                  {show.status.toLowerCase() === 'returning series' && (
                    <span> - ?</span>
                  )}
                  {show.status.toLowerCase() === 'ended' &&
                    show.last_air_date !== null &&
                    show.last_air_date.split('-')[0] !==
                      show.first_air_date.split('-')[0] && (
                      <span> - {show.last_air_date.split('-')[0]}</span>
                    )}
                </>
              )}
            </p>
            {trailerOne && (
              <div className="button-holder">
                <a
                  href={`https://www.youtube.com/watch?v=${trailerOne.key}`}
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
              </div>
            )}
          </div>
          <div className="right-mobile col-5 d-block d-sm-none">
            <img
              src={
                show.poster_path
                  ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                  : '/nope.png'
              }
              alt={show.name}
              className="img-fluid"
            />
          </div>
          <div className="left-side col-10 offset-1 col-md-5 offset-md-0 col-lg-3 offset-lg-1 d-none d-sm-block">
            <img
              src={
                show.poster_path
                  ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                  : '/nope.png'
              }
              alt={show.name}
              className="img-fluid"
            />
            {trailerOne && (
              <div className="button-holder">
                <a
                  href={`https://www.youtube.com/watch?v=${trailerOne.key}`}
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
            <h1 className="title d-none d-sm-block">{show.name}</h1>
            {show.status.toLowerCase() === 'returning series' && (
              <p className="returning-series d-none d-sm-inline-block">
                Ongoing Series
              </p>
            )}
            <p className="d-none d-sm-block">
              {/* first air date year  */}
              {show.first_air_date && show.first_air_date.split('-')[0]}

              {show.status && (
                <>
                  {show.status.toLowerCase() === 'returning series' && (
                    <span> - ?</span>
                  )}
                  {show.status.toLowerCase() === 'ended' &&
                    show.last_air_date !== null &&
                    show.last_air_date.split('-')[0] !==
                      show.first_air_date.split('-')[0] && (
                      <span> - {show.last_air_date.split('-')[0]}</span>
                    )}
                </>
              )}
            </p>
            <h4 className="tagline">{show.tagline}</h4>
            <p className="overview">{show.overview}</p>
            {/* <p>
            Created by{' '}
            {show.created_by.map((creator) => (
              <span key={creator.id}>{creator.name}</span>
            ))}
          </p> */}
            {/* <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                className={`circle ${percentageColor(percentage)}`}
                strokeDasharray={`${percentage}, 100`}
              />
              <text x="18" y="20.35" className="percentage">
                {percentage}%
              </text>
            </svg> */}
            {show.credits.cast.length > 0 && (
              <>
                <p>MAIN CAST</p>
                <ul className="cast-list">
                  {show.credits.cast.slice(0, 20).map((castMember) => (
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
              </>
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
            <p>
              <span className="divider">Seasons</span> {show.number_of_seasons}
            </p>
            <p>
              <span className="divider">Episodes</span>{' '}
              {show.number_of_episodes}
            </p>
            {show.genres.length > 0 && (
              <div className="genres shows">
                <p>Genre</p>
                <ul>
                  {show.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVDetail;
