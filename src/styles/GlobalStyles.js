// src/styles/GlobalStyles.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
   :root {
	   --color-primary: #0077b6;
	   --color-primary-dark: #005f8a;
	   --color-accent: #22a745;
	   --color-bg: #f9fafc;
	   --color-surface: #ffffff;
	   --color-text: #2d2d2d;
	   --color-muted: #6b7280;
	   
	   --radius: 12px;
	   --shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
	   --transition: all 0.25s ease;
   }
   
   *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body, #root {
	  height: 100%;
  }

  body {
	background: var(--color-bg);
	color: var(--color-text);
    font-family: 'Inter', system-ui, -applie-system, BlinkMacSystenFont, 'Segoe UI', 'Roboto', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	line-height: 1.6;
	overflow-x: hidden;
    
  }

  h1, h2, h3, h4 {
	font-weight: 600;
    color: #1e293b;
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
	  opacity; 0.6;
	  cursor: not-allowed;
  }
`;

export default GlobalStyles;