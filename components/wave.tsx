import React from 'react';

const Wave: React.FC = () => (
  <svg
    className="water"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 24 150 28"
    preserveAspectRatio="none"
  >
    <defs>
      <path
        id="foot-wave"
        d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
      ></path>
    </defs>
    <g className="parallax">
      <use xlinkHref="#foot-wave" x="50" y="0" fill="rgb(3 7 18 / var(--tw-bg-opacity))"></use>
    </g>
  </svg>
);

export default Wave;
