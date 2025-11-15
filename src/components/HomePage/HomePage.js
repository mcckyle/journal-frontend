//Filename: src/components/HomePage/HomePage.js

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <MainContainer> 
	  <HeroSection>
		<Overlay />
			<Content>
			  <h1>Welcome to Your Gratitude Journal 🌸</h1>
			  <p>
				Reflect on your day, cherish small victories, and nurture a spirit of gratitude
				- one mindful moment at a time!
			  </p>
			  <StartButton to="/calendar">Begin Your Journey</StartButton>
			</Content>
	  </HeroSection>
	  
	  <InfoPanel>
	    <PanelContent>
		  <h2>Why Gratitude?</h2>
		  <p>
		    Gratitude transforms ordinary moments into blessings. Take a few seconds daily to
			recognize what's good - it nurtures calm, focus, and perspective.
		  </p>
		</PanelContent>
	  </InfoPanel>
  </MainContainer>
);

export default HomePage;

/* --- Styled Components --- */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
    position: relative;
	height: 100vh;
    display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	background: linear-gradient(135deg, #fafafc, #eef3f6);
	overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.5), transparent 60%),
              radial-gradient(circle at bottom right, rgba(173, 216, 230, 0.3), transparent 70%);
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 900px;
  padding: 3rem;
  animation: ${fadeIn} 1.1s ease both;
  
  h1 {
	  font-size: clamp(2.5rem, 5vw, 3.5rem);
	  font-weight: 700;
	  color: #1e293b;
	  margin-bottom: 1rem;
  }
  
  p {
	  font-size: 1.2rem;
	  color: #475569;
	  margin-bottom: 2.5rem;
	  line-height: 1.8;
	  max-width: 700px;
	  margin-inline: auto;
  }
  
  @media (max-width: 768px)
  {
	  h1 {
		font-size: 2.1rem;
	  }
	  
	  p {
		font-size: 1rem;
		margin-bottom: 1.8rem;
	  }
`;

const StartButton = styled(Link)`
  background: var(--color-primary);
  color: #fff;
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  letter-spacing: 0.4px;
  box-shadow: 0 6px 18px rgba(0, 119, 182, 0.25);
  
  &:hover {
	  background: var(--color-primary-dark);
	  transform: translateY(-3px);
  }
`;

const InfoPanel = styled.section`
  width: 100%;
  background: linear-gradient(120deg, #ffffff, #f8fafc);
  padding: 4rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PanelContent = styled.div`
  max-width: 1100px;
  text-align: center;
  
  h2 {
	  font-size: 2rem;
	  color: #1e293b;
	  margin-bottom: 1rem;
  }
  
  p {
	  color: #475569;
	  font-size: 1.1rem;
	  line-height: 1.8;
  }
`;