import React, { useEffect } from 'react';
import '../../styles/Genres.scss';

const TopGenres = () => {
  // const [topGenres, setTopGenres] = useState([]);
  // const [genreNames, setGenreNames] = useState({});

  useEffect(() => {}, []);

  return (
    <div className="genres-bubbles container">
      {/* <h2>Top Three Current Genres</h2> */}
      {/* <div className="row">
        <ul>
          <li>
            <a href="/">
              <img src="/action.jpg" className="img-fluid" alt="" />
              <div className="overlay">
                <p>Action</p>
              </div>
            </a>
          </li>
          <li>
            <a href="/">
              <img src="/comedy.jpg" className="img-fluid" alt="" />
              <div className="overlay">
                <p>Comedy</p>
              </div>
            </a>
          </li>
          <li>
            <a href="/">
              <img src="/drama.jpg" className="img-fluid" alt="" />
              <div className="overlay">
                <p>Drama</p>
              </div>
            </a>
          </li>
          <li>
            <a href="/">
              <img src="/horror.jpg" className="img-fluid" alt="" />
              <div className="overlay">
                <p>Horror</p>
              </div>
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default TopGenres;
