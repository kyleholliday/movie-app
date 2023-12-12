import React from 'react';
import '../styles/Footer.scss';

const Footer = () => {
  const fullYear = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        <p>
          Created by Kyle Holliday {fullYear} - Hosted with{' '}
          <a href="https://www.netlify.com/" target="_blank" rel="noreferrer">
            Netlify
          </a>{' '}
          - Code is on{' '}
          <a
            href="https://github.com/kyleholliday/movie-app"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>{' '}
          - API provided by{' '}
          <a
            href="https://www.themoviedb.org/?language=en-US"
            target="_blank"
            rel="noreferrer"
          >
            TMDB
          </a>{' '}
          and streaming information provided by{' '}
          <a href="https://www.justwatch.com/" target="_blank" rel="noreferrer">
            JustWatch
          </a>
        </p>
        {/* <ul>
          <li>
            <a href="https://www.github.com/kyleholliday">GitHub</a>
          </li>
        </ul> */}
      </div>
    </footer>
  );
};

export default Footer;
