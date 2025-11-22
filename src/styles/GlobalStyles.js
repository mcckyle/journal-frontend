// Filename: src/styles/GlobalStyles.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
   :root {
	   --color-primary: #0077b6;
	   --color-primary-dark: #005f8a;
	   --color-accent: #22a745;

	   --color-bg: #f9fafc;
	   --color-surface: #ffffff;
	   --color-text: #1f2937;
	   --color-muted: #6b7280;
	   
	   --space-xs: 0.5rem;
	   --space-sm: 1rem;
	   --space-md: 1.5rem;
	   --space-lg: 2.5rem;
	   --space-xl: 4rem;
	   
	   --shadow-sm: 0 2px 12px rgba(0, 0, 0, 0.04);
	   --shadow-md: 0 6px 20px rgba(0, 0, 0, 0.08);
	   --shadow-lg: 0 14px 40px rgba(0, 0, 0, 0.12);
	   
	   --radius: 16px;
	   --transition: all 0.25s ease;
   }
   
   :root[data-theme="dark"] {
	   --color-bg: #0f1116;
	   --color-surface: #1a1d24;
	   --color-text: #f2f2f2;
	   --color-text-light: #b8b8b8;
	   
	   --color-primary: #6d8bff;
	   --color-primary-dark: #5472ff;
	   
	   --shadow-sm: 0 4px 14px rgba(0, 0, 0, 0.4);
	   
	   background: var(--color-bg);
   }
   
   /* Global Font Size System */
   :root[data-fontsize="small"] {
	   --font-size-base: 14px;
	   --font-size-large: 16px;
	   --font-size-title: 20px;
	   --font-size-hero: 28px;
   }
   
    :root[data-fontsize="medium"] {
	   --font-size-base: 16px;
	   --font-size-large: 18px;
	   --font-size-title: 22px;
	   --font-size-hero: 32px;
   }
   
    :root[data-fontsize="large"] {
	   --font-size-base: 18px;
	   --font-size-large: 20px;
	   --font-size-title: 26px;
	   --font-size-hero: 38px;
   }

   h1 {
	   font-size: var(--font-size-hero);
   }
   
   h2 {
	   font-size: var(--font-size-title);
   }
   
   h3 {
	   font-size: var(--font-size-large);
   }
	   
   
   *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
	font-family: 'Inter', system-ui, sans-serif;
	font-size: var(--font-size-base);
	line-height: 1.65;
	background: var(--color-bg);
	color: var(--color-text);
  }

  h1, h2, h3, h4 {
	letter-spacing: 0.3px;
	margin-bottom: var(--space-sm);
	font-weight: 600;
  }
  
  a {
	color: var(--color-primary);
	text-decoration: none;
	
	transition: var(--transition);
  }
  
  a:hover {
	  color: var(--color-primary-dark);
  }
  
  button {
	  font-family: inherit;
	  cursor: pointer;
	  border: none;
	  
	  transition: var(--transition);
  }
  
  button:disabled {
	  opacity: 0.6;
	  cursor: not-allowed;
  }
`;

export default GlobalStyles;