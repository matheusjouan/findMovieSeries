import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body{
    color: #393d40;
  }

  body, input, button {
    font-family: 'Hind', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }

  button {
    cursor: pointer
  }

`;
