// Filename: src/styles/GlobalStyles.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
   :root {
	   --color-primary: #0077b6;
	   --color-primary-dark: #005f8a;
	   --color-accent: #22a745;

	   --color-bg: #f5f7fa;
	   --color-surface: #ffffff;
	   --color-text: #1f2937;
	   --color-muted: #6b7280;
	   
	   --radius: 12px;
	   --shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
	   --transition: all 0.25s ease;
   }
   
   *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
	font-family: 'Inter', system-ui, sans-serif;
	background: var(--color-bg);
	color: var(--color-text);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	line-height: 1.6;
	overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    color: var(--color-text);
	letter-spacing: 0.3px;
  }
  
  a {
	color: var(--color-primary);
	text-decoration: none;
	transition: color 0.2s ease;
  }
  
  a:hover {
	  color: var(--color-primary-dark);
  }
  
  button {
	  font-family: inherit;
	  border: none;
	  outline: none;
	  cursor: pointer;
	  
	  transition: var(--transition);
  }
  
  button:disabled {
	  opacity: 0.6;
	  cursor: not-allowed;
  }
`;

export default GlobalStyles;