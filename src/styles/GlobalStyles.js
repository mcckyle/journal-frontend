// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
	background-color: #fafafa;
	color: #333;
    font-family: 'Inter', 'Helvetica Neue', 'Arial', sans-serif;
	line-height: 1.6;
	overflow-x: hidden;
    
  }

  h1, h2, h3, h4 {
	font-weight: 600;
    color: #222;
  }
  
  a {
	color: #0077b6;
	text-decoration: none;
	transition: color 0.2s ease;
  }
  
  a:hover {
	  color: #005f8a;
  }
  
  button {
	  font-family: inherit;
	  border: none;
	  outline: none;
	  cursor: pointer;
	  transition: all 0.2s ease;
  }
  
  button:disabled {
	  opacity; 0.6;
	  cursor: not-allowed;
  }
`;

export default GlobalStyles;