import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
          console.log(randomNum);
        }
      })
      .catch((error) => {
        console.error('Error fetching the Popular movies:', error);
        setFirstMovieBackdropPath('4HodYYKEIsGOdinkGi2Ucz6X9i0'); // Provide a default image path
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
      dir: 'Joaquim Dos Santos, Justin K. Thompson, Kemp Powers, 2023',
    },
    // Alien
    2: {
      id: 'AmR3JG1VQVxU8TfAvljUhfSFUOx',
      text: 'Alien',
      dir: 'Ridley Scott, 1979',
    },
    // North by Northwest
    3: {
      id: 'OR8oloCZ3klJtB7Y0i8pSqWw5a',
      text: 'North by Northwest',
      dir: 'Alfred Hitchcock, 1959',
    },
    // Fight Club
    4: {
      id: 'hZkgoQYus5vegHoetLkCJzb17zJ',
      text: 'Fight Club',
      dir: 'David Fincher, 1999',
    },
    // Dr. Strangelove
    5: {
      id: 'sTp8K0SfcC2RQef1Tu160z3niHO',
      text: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      dir: 'Stanley Kubrick, 1964',
    },
    // Blade Runner 2049
    6: {
      id: 'uKbX1ha7KWyTecvpPpRCB3iFfj3',
      text: 'Blade Runner 2049',
      dir: 'Denis Villeneuve, 2017',
    },
    // Oppenheimer
    7: {
      id: '2W9HjAYWNug5RwyrEtrneXeL94Z',
      text: 'Casino',
      dir: 'Martin Scorsese, 1995',
    },
    // Reservoir Dogs
    8: {
      id: 'jqFjgNnxpXIXWuPsyfqmcLXRo9p',
      text: 'Reservoir Dogs',
      dir: 'Quentin Tarantino, 1992',
    },
    // Dark Knight
    9: {
      id: 'nMKdUUepR0i5zn0y1T4CsSB5chy',
      text: 'The Dark Knight',
      dir: 'Christopher Nolan, 2008',
    },
    // 2001
    10: {
      id: 'w5IDXtifKntw0ajv2co7jFlTQDM',
      text: '2001: A Space Odyssey',
      dir: 'Stanley Kubrick, 1968',
    },
    // Silence of the Lambs
    11: {
      id: 'mfwq2nMBzArzQ7Y9RKE8SKeeTkg',
      text: 'The Silence of the Lambs',
      dir: 'Jonathan Demme, 1991',
    },
    // Jurassic Park
    12: {
      id: '79bJL9ydAMYVltuNTt4VhxORqIz',
      text: 'Jurassic Park',
      dir: 'Steven Spielberg, 1993',
    },
    // Princess Mononoke
    13: {
      id: 'gl0jzn4BupSbL2qMVeqrjKkF9Js',
      text: 'Princess Mononoke',
      dir: 'Hayao Miyazaki, 1997',
    },
    // Fletch
    14: {
      id: 'lviuNQGRNFDng0iJlkc34w9q86Q',
      text: 'Fletch',
      dir: 'Michael Ritchie, 1985',
    },
    // Under the Skin
    15: {
      id: 'sfqnvsK7sG0id3MLNg0FQIgyogu',
      text: 'Under the Skin',
      dir: 'Jonathan Glazer, 2013',
    },
    // Cuckoo's Nest
    16: {
      id: 'qUq3QTr2KLvGIcN0GaaaYx9bbyH',
      text: "One Flew Over the Cuckoo's Next",
      dir: 'Miloš Forman, 1975',
    },
    // Worst Person in the World
    17: {
      id: 'iTPTdfEGYGwbELLLvNnmgKZpVZj',
      text: 'The Worst Person in the World',
      dir: 'Joachim Trier, 2021',
    },
    // Talk to Me
    18: {
      id: 'mabuNsGJgRuCTuGqjFkWe1xdu19',
      text: 'Incredibles 2',
      dir: 'Brad Bird, 2018',
    },
    // Hail Caesar
    19: {
      id: 'zIUigIht3f9osNGyleF6B3jBbl7',
      text: 'Hail, Caesar!',
      dir: 'Joel Coen, Ethan Coen, 2016',
    },
    // Persona
    20: {
      id: 'sj2aZDetPE8RoOCAm5QJitCNfLr',
      text: 'Persona',
      dir: 'Ingmar Bergman, 1966',
    },
    21: {
      id: '4y9mFnyDZLfLVqUvcQUuzVejrok',
      text: 'School of Rock',
      dir: 'Richard Linklater, 2003',
    },
    22: {
      id: 'tdcb0RHusaQxScWORevtKQ0u9NG',
      text: 'Scream',
      dir: 'Wes Craven, 1996',
    },
    23: {
      id: 'mXLVA0YL6tcXi6SJSuAh9ONXFj5',
      text: 'E.T. the Extra-Terrestrial',
      dir: 'Steven Spielberg, 1982',
    },
    24: {
      id: 'b87OHKmn3kxXO1b20WzcZVJ8PRR',
      text: 'Star Wars: The Last Jedi',
      dir: 'Rian Johnson, 2017',
    },
  };

  const backdropStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieBackdropPath}.jpg)`,
  };

  return (
    <>
      <div className="mobile-only-box">
        <img
          src={`mobile-only-${randomNumber}.jpeg`}
          className="img-fluid"
          alt=""
        />
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
              <p>Dir. {randomImageTextDir}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Backdrop;
