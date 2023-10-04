import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/Backdrop.scss';

const Backdrop = () => {
  const [movieBackdropPath, setFirstMovieBackdropPath] = useState('');
  const [randomImageText, setRandomImageText] = useState('');
  const [randomImageTextDir, setRandomImageTextDir] = useState('');
  const [randomNumber, setRandomNumber] = useState(null);
  const mobileNumberArray = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const endpoint = `https://api.themoviedb.org/3/movie/popular`;

    axios
      .get(endpoint, {
        params: {
          api_key: apiKey,
          language: 'en-US',
          region: 'US',
        },
      })
      .then((response) => {
        const movieData = response.data.results;

        if (movieData.length > 0) {
          // Convert the object values into an array
          const imageIds = Object.values(imagesArray);

          // Generate a random index to select a random value
          const randomIndex = Math.floor(Math.random() * imageIds.length);

          // Get the random image ID from the array
          const randomImage = imageIds[randomIndex];

          // Construct the movieBackdropPath
          const randomBackdropPath = `${randomImage.id}`;

          // Update the state variable with the random backdrop path
          setFirstMovieBackdropPath(randomBackdropPath);
          setRandomImageText(randomImage.text);
          setRandomImageTextDir(randomImage.dir);

          // for mobile only
          const randomNum =
            Math.floor(Math.random() * mobileNumberArray.length) + 1;
          setRandomNumber(randomNum);
        }
        document.title = 'Bijou - Home';
      })
      .catch((error) => {
        console.error('Error fetching the Popular movies:', error);
        setFirstMovieBackdropPath('4HodYYKEIsGOdinkGi2Ucz6X9i0');
        setRandomImageText('Spider-Man: Across the Spider-Verse');
        setRandomImageTextDir(
          'Joaquim Dos Santos, Justin K. Thompson, Kemp Powers, 2023'
        );
        // for mobile only
        const randomNum =
          Math.floor(Math.random() * mobileNumberArray.length) + 1;
        setRandomNumber(randomNum);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imagesArray = {
    // Across the Spiderverse
    1: {
      id: '4HodYYKEIsGOdinkGi2Ucz6X9i0',
      text: 'Spider-Man: Across the Spider-Verse',
      dir: 'Dir. Joaquim Dos Santos, Justin K. Thompson, Kemp Powers, 2023',
    },
    // Alien
    2: {
      id: 'AmR3JG1VQVxU8TfAvljUhfSFUOx',
      text: 'Alien',
      dir: 'Dir. Ridley Scott, 1979',
    },
    // North by Northwest
    3: {
      id: 'OR8oloCZ3klJtB7Y0i8pSqWw5a',
      text: 'North by Northwest',
      dir: 'Dir. Alfred Hitchcock, 1959',
    },
    // Fight Club
    4: {
      id: 'hZkgoQYus5vegHoetLkCJzb17zJ',
      text: 'Fight Club',
      dir: 'Dir. David Fincher, 1999',
    },
    // Dr. Strangelove
    5: {
      id: 'sTp8K0SfcC2RQef1Tu160z3niHO',
      text: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      dir: 'Dir. Stanley Kubrick, 1964',
    },
    // Blade Runner 2049
    6: {
      id: 'uKbX1ha7KWyTecvpPpRCB3iFfj3',
      text: 'Blade Runner 2049',
      dir: 'Dir. Denis Villeneuve, 2017',
    },
    // Casino
    7: {
      id: '2W9HjAYWNug5RwyrEtrneXeL94Z',
      text: 'Casino',
      dir: 'Dir. Martin Scorsese, 1995',
    },
    // The Sopranos
    8: {
      id: '3ltpFyIfAtGjRMRJdECFoQQCfzx',
      text: 'The Sopranos',
      dir: 'Created by David Chase, 1999',
    },
    // Dark Knight
    9: {
      id: 'nMKdUUepR0i5zn0y1T4CsSB5chy',
      text: 'The Dark Knight',
      dir: 'Dir. Christopher Nolan, 2008',
    },
    // 2001
    10: {
      id: 'w5IDXtifKntw0ajv2co7jFlTQDM',
      text: '2001: A Space Odyssey',
      dir: 'Dir. Stanley Kubrick, 1968',
    },
    // Silence of the Lambs
    11: {
      id: 'mfwq2nMBzArzQ7Y9RKE8SKeeTkg',
      text: 'The Silence of the Lambs',
      dir: 'Dir. Jonathan Demme, 1991',
    },
    // Atlanta
    12: {
      id: 'vN84JlTvOZvZzxi0D2SJQNFvtjS',
      text: 'Atlanta',
      dir: 'Created by Donald Glover, 2016',
    },
    // Princess Mononoke
    13: {
      id: 'gl0jzn4BupSbL2qMVeqrjKkF9Js',
      text: 'Princess Mononoke',
      dir: 'Dir. Hayao Miyazaki, 1997',
    },
    // Fletch
    14: {
      id: 'lviuNQGRNFDng0iJlkc34w9q86Q',
      text: 'Fletch',
      dir: 'Dir. Michael Ritchie, 1985',
    },
    // Under the Skin
    15: {
      id: 'sfqnvsK7sG0id3MLNg0FQIgyogu',
      text: 'Under the Skin',
      dir: 'Dir. Jonathan Glazer, 2013',
    },
    // Cuckoo's Nest
    16: {
      id: 'qUq3QTr2KLvGIcN0GaaaYx9bbyH',
      text: "One Flew Over the Cuckoo's Next",
      dir: 'Dir. Miloš Forman, 1975',
    },
    // Worst Person in the World
    17: {
      id: 'iTPTdfEGYGwbELLLvNnmgKZpVZj',
      text: 'The Worst Person in the World',
      dir: 'Dir. Joachim Trier, 2021',
    },
    // Incredibles 2
    18: {
      id: 'mabuNsGJgRuCTuGqjFkWe1xdu19',
      text: 'Incredibles 2',
      dir: 'Dir. Brad Bird, 2018',
    },
    // Hail Caesar
    19: {
      id: 'zIUigIht3f9osNGyleF6B3jBbl7',
      text: 'Hail, Caesar!',
      dir: 'Dir. Joel Coen, Ethan Coen, 2016',
    },
    // Persona
    20: {
      id: 'sj2aZDetPE8RoOCAm5QJitCNfLr',
      text: 'Persona',
      dir: 'Dir. Ingmar Bergman, 1966',
    },
    // School of Rock
    21: {
      id: '4y9mFnyDZLfLVqUvcQUuzVejrok',
      text: 'School of Rock',
      dir: 'Dir. Richard Linklater, 2003',
    },
    // Scream
    22: {
      id: 'tdcb0RHusaQxScWORevtKQ0u9NG',
      text: 'Scream',
      dir: 'Dir. Wes Craven, 1996',
    },
    // ET
    23: {
      id: 'mXLVA0YL6tcXi6SJSuAh9ONXFj5',
      text: 'E.T. the Extra-Terrestrial',
      dir: 'Dir. Steven Spielberg, 1982',
    },
    //  The Last Jedi
    24: {
      id: 'b87OHKmn3kxXO1b20WzcZVJ8PRR',
      text: 'Star Wars: The Last Jedi',
      dir: 'Dir. Rian Johnson, 2017',
    },
    // Mad Men
    25: {
      id: 'gGRfablBSOc2k8bTaqjnfrYtLaT',
      text: 'Mad Men',
      dir: 'Created by Matthew Weiner, 2007',
    },
    // Breaking Bad
    26: {
      id: 'tsRy63Mu5cu8etL1X7ZLyf7UP1M',
      text: 'Breaking Bad',
      dir: 'Created by Vince Gilligan, 2008',
    },
  };

  const backdropStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieBackdropPath}.jpg)`,
  };

  return (
    <>
      <div className="mobile-only-box">
        <div className="container"></div>
        <div className="overlay">
          {/* <h1>BIJOU</h1> */}
          <p>
            Discover a world of entertainment with over a million movies and TV
            shows. From{' '}
            <Link className="top-hero-links" to="/now-playing">
              now playing
            </Link>{' '}
            and{' '}
            <Link className="top-hero-links" to="/upcoming">
              upcoming blockbusters
            </Link>{' '}
            to{' '}
            <Link className="top-hero-links" to="/tv-trending">
              trending TV
            </Link>
            , we've got your popcorn ready.
          </p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#050606"
            fillOpacity="1"
            d="M0,320L1440,160L1440,0L0,0Z"
          ></path>
        </svg>
        {/* <img
          src={`mobile-only-${randomNumber}.jpeg`}
          className="img-fluid"
          alt=""
        /> */}
      </div>
      {movieBackdropPath && (
        <>
          <div className="backdrop-container">
            <div className="backdrop-wrapper">
              <div className="backdropplaceholder"></div>
              <div className="backdropimage" style={backdropStyle}></div>
              <div className="backdropmask"></div>
            </div>
          </div>
          <div className="container top-text-container">
            <div>
              <h1>BIJOU</h1>
              <p>The movies and TV that you want to see.</p>
            </div>
            <div className="right-side">
              <p>{randomImageText}</p>
              <p>{randomImageTextDir}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Backdrop;
